const {Storage} = require('@google-cloud/storage')

const storage = new Storage();

async function uploadgcs(filename, filepath) {
    const bucketName = "audios-videomaker";

    const file = storage.bucket(bucketName).file(filename);
  
    // Returns an authenticated endpoint to which
    // you can make requests without credentials.
    const [location] = await file.createResumableUpload(); //auth required
  
    const options = {
      uri: location,
      resumable: true,
      validation: false,
  
      // Optional:
      // Set a generation-match precondition to avoid potential race conditions
      // and data corruptions. The request to upload is aborted if the object's
      // generation number does not match your precondition. For a destination
      // object that does not yet exist, set the ifGenerationMatch precondition to 0
      // If the destination object already exists in your bucket, set instead a
      // generation-match precondition using its generation number.
      preconditionOpts: {ifGenerationMatch: generationMatchPrecondition},
    };
  
    // Passes the location to file.save so you don't need to
    // authenticate this call
    await file.save(contents, options);
  
    console.log(`${filename} uploaded to ${bucketName}`);
  }
  
  uploadWithoutAuthentication().catch(console.error);
  