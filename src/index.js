const readlineSync = require('readline-sync'); 
const downloader = require("./youtubedl")

const url = readlineSync.question('url do vídeo');

async function foo(){
    await downloader(url)
}
foo()