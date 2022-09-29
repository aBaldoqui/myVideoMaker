const readlineSync = require('readline-sync');
const {gcs,speechtotext,youtubedl} = require('../handlers/index')

const url = readlineSync.question('url do vídeo');

async function foo() {
    // const fileName = './tmp/video.mp3'
    const {filepath, filename} = await youtubedl(url)
    const gcsid = await gcs.uploadgcs(filepath)
    const speechFileName = await speechtotext(gcsid, filename)
    const speechobj = await gcs.downloadgcs(speechFileName)
    
}
foo()