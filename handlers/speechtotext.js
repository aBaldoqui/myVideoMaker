const speech =  require('@google-cloud/speech');
const fs = require('fs');

async function speechconverter(filename){
    const client = new speech.SpeechClient();
    
    const file = fs.readFileSync(filename)
    const audioBytes = file.toString('base64')
    
    const audio = {
        content: audioBytes
    }

    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz:16000,
        languageCode: 'pr-BR'
    }

    const request = { 
        audio: audio,
        config:config
    }
    
    const [response] = await client.recognize(request)
}

module.exports = speechconverter