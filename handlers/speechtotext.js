const speech = require('@google-cloud/speech');
const fs = require('fs');

const outputfile = './tmp/'

async function speechconverter(gcsUri, filename) {
    const client = new speech.SpeechClient({
        keyFilename: './keys/videomaker-363718-5493f7068694.json'
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
        enableSeparateRecognitionPerChannel: true,
        LongRunningRecognize: true
    }
    const outputConfig = {
        "gcsUri": `gs://audios-videomaker/${filename.replace('.mp3', '')}.json`
    }

    const request = {
        audio: audio,
        config: config,
        outputConfig:outputConfig
    }


    try {
        const [operation] = await client.longRunningRecognize(request);

     
        // const contentString = JSON.stringify(response.results)
        // return fs.writeFileSync(`${outputfile}${filename}stt.json`, { 'result': contentString })


        // const transcription = response.results
        //     .map(result => result.alternatives[0].transcript)
        //     .join('\n');

        //console.log(`Transcription: ${transcription}`);


    } catch (err) {
       console.log(err)
    }


}

module.exports = speechconverter