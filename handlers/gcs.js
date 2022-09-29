const { Storage } = require('@google-cloud/storage')
const bucketName = "audios-videomaker";

const storage = new Storage({
    keyFilename: './keys/videomaker-363718-5493f7068694.json'
});

async function uploadgcs(filepath) {
    const filed = storage.bucket(bucketName).upload(filepath)

    return new Promise((resolve) => {
        filed.then((res) => {
            resolve(`gs://${bucketName}/${res[1].name}`)
        })
    })
}

async function downloadgcs(filename) {
    const obj = await storage.bucket(bucketName).file(filename).download()
    return obj
}

module.exports = { uploadgcs, downloadgcs }
