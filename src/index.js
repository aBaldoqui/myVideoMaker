const readlineSync = require('readline-sync');
const {gcs,speechtotext,youtubedl} = require('../handlers/index')

const url = readlineSync.question('url do vídeo');

async function foo() {
    // const fileName = './tmp/video.mp3'
    const {filepath} = await youtubedl(url)
    await gcs(filepath)
    // console.log(fileName)
    //await speech(fileName)
}
foo()