const speechtotext = require('./speechtotext');
const youtubedl = require('./youtubedl');
const gcs = require('./gcs')
const watson = require('./watson')


module.exports = {
    gcs,
    speechtotext,
    youtubedl,
    watson
}
