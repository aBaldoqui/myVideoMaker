const { Storage } = require('@google-cloud/storage')

const storage = new Storage({
   keyFilename : './keys/videomaker-363718-5493f7068694.json'
});

async function uploadgcs(filepath) {
    const bucketName = "audios-videomaker";

    storage.bucket(bucketName).upload(filepath)
}

module.exports = uploadgcs

