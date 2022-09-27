const fs = require('fs');
const ytdl = require('ytdl-core');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above
async function downloader(url) {
    try {
        ytdl(url)
            .pipe(fs.createWriteStream('./tmp/video.mp4'));
    } catch (err) {
        console.log(err)
    }

}

module.exports = downloader



