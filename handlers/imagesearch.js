const { google } = require('googleapis')
const customSearch = google.customsearch('v1')
const googleSearchCredentials = require('../keys/searchkey.json').key
const state = require('./state')


let searchterms = []

function findImages(arrayOfPeriods) {
    let index = 0
    arrayOfPeriods.forEach((periodObjects) => {
        Promise.all(periodObjects.keywords.map(async (word) => await search(word.name))).then((arrOfImages) => {
            arrayOfPeriods[index].images = arrOfImages
            index++
            if (index == arrayOfPeriods.length) {
                state.save(arrayOfPeriods)
            }
        }) //TODO, search devolve imagens guarde no objeto do .json

    })

}

async function search(keyword) {
    const response = await customSearch.cse.list({
        auth: googleSearchCredentials,
        cx: '37bbf366cb6164f2a',
        q: keyword,
        searchType: 'image',
        num: 1,
        safe: "active"
    })

    if(!response.data.items){
        console.log(keyword)
        return null
    }
    const imagesUrl = response.data.items.map((item) => {
        return `${keyword}, ${item.link}`
    })

    return imagesUrl


}

module.exports = findImages