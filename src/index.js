const readlineSync = require('readline-sync');
const { gcs, speechtotext, youtubedl, langunderstanding, imagesearch } = require('../handlers/index')

const url = readlineSync.question('url do vídeo');

async function index() {
    console.log('1')
    const { filepath, filename } = await youtubedl(url)
    console.log('2')
    const gcsid = await gcs.uploadgcs(filepath)
    console.log('3')
    const speechfilename = await speechtotext(gcsid, filename)
    console.log('4')
    const speecharray = await gcs.downloadJsonGcs(speechfilename)
    console.log('5')
    const arrayOfKeyWords = await langunderstanding(speecharray, speechfilename)
    console.log('6')
    await imagesearch(arrayOfKeyWords)
}

index()