const { google } = require('googleapis')
const customSearch = google.customsearch('v1')
const googleSearchCredentials = require('../keys/searchkey.json').key
const state = require('./state')


let searchterms = []
let index = 0

function findImages(arrayOfPeriods) {
    arrayOfPeriods.forEach(period => {
        index++
        Promise.all(period.keywords.map(async (word) => {
            return await search(word.name, index)
        })).then(arr => {

            const linkOfImages = arr.map((obj)=>{
                if(obj) return obj.result
            })
            if(arr[0]) arrayOfPeriods[arr[0].ind-1].images = linkOfImages
            
            state.save(arrayOfPeriods)
        })
    });
}

async function search(keyword, ind) {
    const response = await customSearch.cse.list({
        auth: googleSearchCredentials,
        cx: '37bbf366cb6164f2a',
        q: keyword,
        searchType: 'image',
        num: 1,
        safe: "active"
    })

    if (!response.data.items) {
        //console.log(keyword)
        return null
    }

    const imagesUrl = response.data.items.map((item) => {
        return item.link
    })

    return ({ result: imagesUrl, ind: ind })
}

module.exports = findImages