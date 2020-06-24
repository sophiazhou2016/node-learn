const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    // console.log('request：', getPrototypeChain(req))
    // IncomingMessage
    // Stream 也是继承于流
    // console.log('response: ', getPrototypeChain(res))
    // ServerResponse
    // Stream 是一个流
    // EventEmitter

    const { url, method, headers } = req
    if (url === '/' && method === 'GET') {
        // 显示一个首页
        fs.readFile('index.html', (err, data) => {
            if(err) { 
                res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'})
                res.end('500,服务器发生错误')
                return
            }

            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end(data)
        })
    } else if (url === '/users' && method === 'GET'){
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify([{name: 'tom', age: 20}]))
    } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        // 图片文件服务
        fs.createReadStream('./' + url).pipe(res)
    } else {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain,charset=utf-8')
        res.end('404，页面没有找到')
    }
    // res.end('hello node')
})

server.listen(3000)

// 打印原型链
function getPrototypeChain(obj) {
    const protoChain = []
    while(obj = Object.getPrototypeOf(obj)) {
        // 返回给定对象的原型，如果没有继承属性，则返回null
        protoChain.push(obj)
    }
    return protoChain
}