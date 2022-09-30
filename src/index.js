const readlineSync = require('readline-sync');
const { gcs, speechtotext, youtubedl, langunderstanding} = require('../handlers/index')

const url = readlineSync.question('url do vídeo');

async function foo() {
    // const fileName = './tmp/video.mp3'
    console.log('1')
    const { filepath, filename } = await youtubedl(url)
    console.log('2')
    const gcsid = await gcs.uploadgcs(filepath)
    console.log('3')
    const speechfilename = await speechtotext(gcsid, filename)
    console.log('4')
    const speecharray = await gcs.downloadJsonGcs(speechfilename)
    console.log('5')
    const language = await langunderstanding(speecharray)
}
foo()