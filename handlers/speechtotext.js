const speech = require('@google-cloud/speech');
const fs = require('fs');

const outputfile = './tmp/'

async function speechconverter(gcsUri, filename) {
    const client = new speech.SpeechClient({
        keyFilename: './keys/gcskey.json'
    });
    //console.log(gcsUri)
    const audio = {
        uri: gcsUri
    }

    const config = {
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 48000,
        languageCode: 'pt-BR',
        audioChannelCount: 2,
        enableSeparateRecognitionPerChannel: false,
        LongRunningRecognize: true,
        enableWordTimeOffsets: true,
        model: 'latest_long'
    }

    const outputFileName = filename.replace('.mp3', '.json')

    const outputConfig = {
        "gcsUri": `gs://audios-videomaker/${outputFileName}`
    }

    const request = {
        audio: audio,
        config: config,
        outputConfig: outputConfig
    }


    try {
        return new Promise(async (resolve) => {
            const [operation] = await client.longRunningRecognize(request)
            operation.promise().then((a) => {
                
                resolve(outputFileName)
            });
        });
    } catch (err) {
        console.log(err)
    }


}

module.exports = speechconverter