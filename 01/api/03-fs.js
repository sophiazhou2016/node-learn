const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

// fs.readFile('./conf.js',(err, data) => {
//     if(err) {
//         console.log('err:', err)
//     }
//     console.log(data) // Buffer
//     console.log(data.toString())
// })

process.nextTick(async() => {
    const data = await readFile('./conf.js')
    console.log('data:', data.toString())
})