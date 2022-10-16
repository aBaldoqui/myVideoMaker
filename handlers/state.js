const fs = require('fs')
const contentFilePath = './tmp/'

function save(content, videoname) {

  const contentString = JSON.stringify(content)
  if(!videoname) videoname = content.json
  console.log(videoname)
  return fs.writeFileSync(`${contentFilePath}${videoname}.json`, contentString)

}

module.exports = {
  save,
}