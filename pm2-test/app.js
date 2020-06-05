const http = require('http')

const server = http.createServer((req, res) => {
    // 模拟日志
    console.log('cur time', Date.now())

    // 模拟错误
    console.error('假装出错', Date.now())
    
    // 模拟一个错误
    if (req.url === '/err') {
        throw new Error()
    }

    res.setHeader('Content-type', 'application/json')
    res.end(
        JSON.stringify({
            errno: 0,
            msg: 'pm2 test server 3'
        })
    )
})

server.listen('8000', () => {
    console.log('server is listeing on port 8000....')
})