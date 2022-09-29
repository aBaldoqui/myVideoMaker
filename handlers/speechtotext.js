const speech = require('@google-cloud/speech');
const fs = require('fs');

async function speechconverter(filename) {
    const client = new speech.SpeechClient();

    const file = fs.readFileSync(filename)
    const audioBytes = file.toString('base64')
    const audio = {
        content: audioBytes
    }

    const config = {
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 48000,
        languageCode: 'en-US',
        audioChannelCount: 2,
        enableSeparateRecognitionPerChannel: true,
        LongRunningRecognize: true
    }

    const request = {
        audio: audio,
        config: config
    }
    try {
        const [operation] = await client.longRunningRecognize(request)
        const [response] = await operation.promise()
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        console.log(`Transcription: ${transcription}`);


    } catch (err) {
        console.log(err)
    }


}

module.exports = speechconverter