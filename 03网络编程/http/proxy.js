 
// proxy.js
const express = require('express')
// const {createProxyMiddleware} = require('http-proxy-middleware')

// console.log('proxy:', proxy)
const app = express()
app.use(express.static(__dirname + '/'))
// app.use('/api', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: false }));

app.listen(3000, () => {
    console.log('proxy listen 3000...')
})
module.exports = app