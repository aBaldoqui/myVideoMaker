const readlineSync = require('readline-sync');
const { gcs, speechtotext, youtubedl, langunderstanding, imagesearch } = require('../handlers/index')
const fs = require('fs')
const url = readlineSync.question('url do vídeo');

async function index() {
    try {
        const { filepath, filename } = await youtubedl(url)
        const gcsid = await gcs.uploadgcs(filepath)
        const speechfilename = await speechtotext(gcsid, filename)
        const speecharray = await gcs.downloadJsonGcs(speechfilename)
        const arrayOfKeyWords = await langunderstanding(speecharray, speechfilename, url)
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