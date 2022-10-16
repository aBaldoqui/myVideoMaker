const { google } = require('googleapis')
const customSearch = google.customsearch('v1')
const googleSearchCredentials = require('../keys/searchkey.json').key
const state = require('./state')
const gcs = require('./gcs')
const fs = require('fs')

let searchterms = []
let index = 0

function findImages(contentObj) {
    arrayOfPeriods = contentObj.continuista;

    return new Promise((res) => {
        let i = 0;
        arrayOfPeriods.forEach(period => {
            index++;
            let lim = 0
            Promise.all(period.keywords.map(async (word) => {
                lim++
                if(lim == Math.round(arrayOfPeriods.length/100)) return
                return await search(word.name, index)
            })).then(arr => {
                const linkOfImages = arr.map((obj) => {
                    if (obj) return obj.result
                })
                if (arr[0]) arrayOfPeriods[arr[0].ind - 1].images = linkOfImages
                state.save(contentObj, contentObj.vidName);

                i++
                if(arrayOfPeriods.length === i) res(`./tmp/${contentObj.vidName}.json`)
            })
        });
    })

}

async function search(keyword, ind) {
    const rand = Math.random()*100

    if(rand<=25) keyword = `${keyword} meme`

    if(rand<=75 && rand >25) keyword = `${keyword} ilustração`

    if(rand<=100 && rand>75) keyword = `${keyword}`

    const response = await customSearch.cse.list({
        auth: googleSearchCredentials,
        cx: '37bbf366cb6164f2a',
        q: `${keyword}`,
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