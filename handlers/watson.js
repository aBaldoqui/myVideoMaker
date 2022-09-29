const sentenceBoundaryDetection = require('sbd')

async function getKeyWords(arrayOfText){

    arrayOfText.map((elem)=>{
        elem.alternatives[0].transcript.sentences()
    })
}

module.exports = getKeyWords
