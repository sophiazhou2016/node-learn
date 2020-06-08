const fs = require('fs')
const rs = fs.createReadStream('./01.jpg')
const ws = fs.createWriteStream('./02.jpg')

rs.pipe(ws)