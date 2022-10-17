const { Storage } = require('@google-cloud/storage')
const fs = require('fs');
const { file } = require('googleapis/build/src/apis/file');
const bucketName = "audios-videomaker";

const storage = new Storage({
    keyFilename: './keys/gcskey.json'
});

async function uploadgcs(filepath) {
    const filed = storage.bucket(bucketName).upload(filepath)
    return new Promise((resolve) => {
        filed.then(async (res) => {
            fs.unlink(filepath, () => {
                resolve(`gs://${bucketName}/${res[1].name}`)
            })
        })
    })
}

async function downloadJsonGcs(filename) {
    //filename must be like: como___uma_casa_de_sw1ng___cortes_podcast.json
    const obj = await storage.bucket(bucketName).file(filename).download()
    const jsonobj = await JSON.parse(obj).results
    return jsonobj
}


async function deleteGcs(filename){
    console.log(filename)
    const obj = await storage.bucket(bucketName).file(filename).delete()
    const obj2 = await storage.bucket(bucketName).file(filename.replace('.mp3', '.json')).delete()
    return {obj, obj2}
}

module.exports = { uploadgcs, downloadJsonGcs, deleteGcs }
