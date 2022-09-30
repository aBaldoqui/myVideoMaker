const speechtotext = require('./speechtotext');
const youtubedl = require('./youtubedl');
const gcs = require('./gcs')
const langunderstanding = require('./langunderstanding')


module.exports = {
    gcs,
    speechtotext,
    youtubedl,
    langunderstanding
}
