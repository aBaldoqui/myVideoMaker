const Language = require('@google-cloud/language')

const language = new Language.LanguageServiceClient()


async function getKeyWords(arrayOfTxt) {

    arrayOfTxt.forEach(async (element) => {
        const document = {
            content: element.alternatives[0].transcript,
            type: 'PLAIN_TEXT',
        };
        console.log(document.content)
        const [result] = await language.analyzeEntities({document: document})
        const entities = result.entities
        console.log(entities)
    });
}

module.exports = getKeyWords
