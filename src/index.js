const readlineSync = require('readline-sync');
const { gcs, speechtotext, youtubedl, langunderstanding, imagesearch } = require('../handlers/index')

const url = readlineSync.question('url do vídeo');

async function index() {
    const { filepath, filename } = await youtubedl(url)
    const gcsid = await gcs.uploadgcs(filepath)
    const speechfilename = await speechtotext(gcsid, filename)
    const speecharray = await gcs.downloadJsonGcs(speechfilename)
    const arrayOfKeyWords = await langunderstanding(speecharray, speechfilename, url)
    await imagesearch(arrayOfKeyWords)
}

index()