const fs = require('fs')
// const { promisify } = require('util')

fs.readFile('./conf.js',(err, data) => {
    if(err) {
        console.log('err:', err)
    }
    console.log(data) // Buffer
    console.log(data.toString())
})

