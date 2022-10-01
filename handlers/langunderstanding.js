const Language = require('@google-cloud/language')
const state = require('./state')
const language = new Language.LanguageServiceClient()


async function getKeyWords(arrayOfTxt) {

    let arrayOfEntities = []

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
        coontinuistaResolver(arrayOfEntities)
    })


    function coontinuistaResolver(entitiesArray) {
        let index = 0

        const continuísta = arrayOfTxt.map((item) => {
            const inputSpeech = item.alternatives[0].transcript
            const result = entitiesArray[index]
            index++

            const foo = result.map((item) => {
                return { name: item.name, type: item.type }
            });

            return {
                speech: inputSpeech,
                images: [],
                meta: item.resultEndTime,
                keywords:foo
            }

        })

        state.save(continuísta)
        // arrayOfTxt.forEach(element => {


        //     index++
        //     if (index > arrayOfTxt.length - 1) {
        //         console.log('foi')
        //         state.save(continuísta)
        //     }
        // });

    }


    // console.log(arrayOfTxt.length, (await entitiesArray).length)



    // .then(results => {
    //     const data = results.map((result) => {
    //         periods.speech = inputSpeech;
    //         periods.images = [];
    //         periods.meta = element.resultEndTime
    //         const entities = result.entities;
    //         periods.keywords = entities.map((ent) => { return ent.type });

    //         return periods
    //     })
    //     state.save(data)
    // })

}

module.exports = getKeyWords
