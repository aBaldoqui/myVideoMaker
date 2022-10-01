const Language = require('@google-cloud/language')
const state = require('./state')
const language = new Language.LanguageServiceClient()


async function getKeyWords(arrayOfTxt) {

    let arrayOfEntities = []
    return new Promise(resolve => {
        Promise.all(arrayOfTxt.map(async (element) => {
            const inputSpeech = element.alternatives[0].transcript

            const document = {
                content: inputSpeech,
                type: 'PLAIN_TEXT',
            };
            // console.log(document.content)
            return await language.analyzeEntities({ document: document })


        })).then((resArray) => {
            arrayOfEntities = resArray.map((item) => {
                return item[0].entities
            })
            coontinuistaResolver(arrayOfEntities, resolve)

        })

    })


    function coontinuistaResolver(entitiesArray, resolve) {
        let index = 0

        const continuísta = arrayOfTxt.map((item) => {
            const inputSpeech = item.alternatives[0].transcript
            const result = entitiesArray[index]
            index++

            const foo = result.map((item) => {
                console.log(item.salience)
                if (item.type != 'NUMBER' && item.salience > 0.01) return { name: item.name, type: item.type }


            });

            return {
                speech: inputSpeech,
                images: [],
                meta: item.resultEndTime,
                keywords: foo
            }

        })
        state.save(continuísta)
        resolve(continuísta)
    }
}

module.exports = getKeyWords
