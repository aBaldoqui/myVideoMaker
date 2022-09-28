const readlineSync = require('readline-sync'); 
const downloader = require("./youtubedl")
const speech = require("./speechtotext")
const url = readlineSync.question('url do vídeo');

async function foo(){
    const fileName = await downloader(url)
   await speech(fileName)
}
foo()