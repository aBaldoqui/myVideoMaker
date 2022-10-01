const Language = require('@google-cloud/language')
const state = require('./state')
const language = new Language.LanguageServiceClient()

const periods = {
    speech: '',
    keywords: [],
    images: []
}

async function getKeyWords(arrayOfTxt) {


    const entitiesArray = Promise.all(arrayOfTxt.map(async (element) => {
        const inputSpeech = element.alternatives[0].transcript

        const document = {
            content: inputSpeech,
            type: 'PLAIN_TEXT',
        };
        // console.log(document.content)
        return await language.analyzeEntities({ document: document })


    }))
    let index = 0
    arrayOfTxt.forEach(element => {
        const inputSpeech = element.alternatives[0].transcript
        const result = entitiesArray[index]

        periods.speech = inputSpeech;
        periods.images = [];
        periods.meta = element.resultEndTime
        const entities = result.entities;
        periods.keywords = entities.map((ent) => { return ent.type });
        index++
        if(index >= arrayOfTxt.length-1){
            state.save(periods)
        }        
    });

    console.log(arrayOfTxt.length, (await entitiesArray).length)

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
