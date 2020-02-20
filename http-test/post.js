const http = require('http')

const server = http.createServer((req, res) => {
    if(req.method === 'POST') {
        console.log('req -content=type:', req.headers['content-type'])
        // 接受数据
        let postdata = ''
        req.on('data', chunk => {
            postdata += chunk.toString() // chunk是二进制，所以需要转成string
        })
        req.on('end', () => {
            console.log('postdata:', postdata)
            res.end('hello world!')
        })
    }
})

server.listen('3000', () => {
    console.log('OK')
})