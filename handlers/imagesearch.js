const { google } = require('googleapis')
const customSearch = google.customsearch('v1')
const googleSearchCredentials = require('../keys/searchkey.json').key

let searchterms = []

function findImages(arrayOfPeriods) {
    let index =0
    arrayOfPeriods.forEach((periodObjects) =>{
        periodObjects.keywords.forEach((word)=>search(word)) //TODO, search devolve imagens guarde no objeto do .json
    })

    searchterms.forEach(element => {
        console.log(element)
        customSearch.cse.list({
            auth: googleSearchCredentials,
            cx: '95c6f394584de4b00',
            q: element.name,
            searchType: 'image'
        })
    });

    const imageUrl = searchterms.map((item) => {
        return item.link
    })
    console.log(imageUrl)

}

function search(keyword){

}



module.exports = findImages