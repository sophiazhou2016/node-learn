// const http = require('http')
// const server = http.createServer((req, res) => {
//     res.writeHead(200)
//     res.end('hi qianqian')
// })

// server.listen(3000, () => {
//     console.log('监听port 3000...')
// })

const KKB = require('./kkb')
const app = new KKB()

app.use((req, res) => {
    res.writeHead(200)
    res.end('hi qianqian 666')
})

app.listen(3000, () => {
    console.log('监听port 3000...')
})