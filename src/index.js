const readlineSync = require('readline-sync');
const { gcs, speechtotext, youtubedl, langunderstanding, imagesearch } = require('../handlers/index')
const fs = require('fs')
const url = readlineSync.question('url do vídeo');

async function index() {
    try {
        console.log('starting...')
        const { filepath, filename } = await youtubedl(url)
        console.log('vídeo Downloaded and updating...')
        const gcsid = await gcs.uploadgcs(filepath)
        console.log('audio to txt..')
        const speechfilename = await speechtotext(gcsid, filename)
        const speecharray = await gcs.downloadJsonGcs(speechfilename)
        console.log('download txts files')
        const arrayOfKeyWords = await langunderstanding(speecharray, speechfilename, url)
        console.log('geting keywords')
        gcs.deleteGcs(filename)
        const imageFile = await imagesearch(arrayOfKeyWords)
        gcs.uploadgcs(imageFile).then(() => {
            fs.unlink(imageFile, (err) => console.log(err))
        })
    } catch (err) {
        console.log(err)
    }

}

index()