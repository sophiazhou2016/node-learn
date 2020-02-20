const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
    console.log('req.method::', req.method)
    const url = req.url
    const query = querystring.parse(url.split('?')[1])
    res.end(JSON.stringify(query))
})

server.listen('3000', () => {
    console.log('listening port 3000')
})