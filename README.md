# 一、Node.js 基础部分

## 1. nodejs 里面的异步I/O
	例子1：
	

	```javascript
	const fs = require('fs')
	fs.readFile('./conf.js',(err, data) => {
	    if(err) {
	        console.log('err:', err)
	    }
	    console.log(data) // Buffer
	    console.log(data.toString())
	})
	```
	例子2，使用async/ await 解决异步函数的地狱回调：
	
	```javascript
	const fs = require('fs')
	const { promisify } = require('util')
	const readFile = promisify(fs.readFile)

	process.nextTick(async() => {
	    const data = await readFile('./conf.js')
	    console.log('data:', data.toString())
	})
	```
	*注意await紧跟着的是一个promise，promisify 是原生node 的 util 库里面支持的。*
## 2、<Buffer>
	```
	const buf1 = Buffer.alloc(10)
	const buf2 = Buffer.from('a')
	const buf3 = Buffer.from('汉')
	const buf4 = Buffer.concat([buf2, buf3])
	console.log('buf4:', buf4, buf4.toString())
	```
## 3、stream(使用 pipe 来连接两个stream，而 http 请求里面的 request 跟 response 都是继承于Stream，所以都是流)
	```
	const fs = require('fs')
	const rs = fs.createReadStream('./01.jpg')
	const ws = fs.createWriteStream('./02.jpg')
	rs.pipe(ws)
	```
## 4、http 请求
	```
		const http = require('http')

		const server = http.createServer((request, response) => {
			let { url, method, headers } = request
			if( url === '/' && method === 'GET') {
				fs.readFile('index.html', (err, data) => {
					if(err) {
						res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'})
						res.end('500,服务器发生错误')
						return
					}

				})
				res.statusCode = 200
				res.setHeader('Content-Type', 'text/html')
				res.end(data)
			}  else if (url === '/users' && method === 'GET'){
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
		})
		server.listen(3000)

	```
	*下面是获取对象的所有的原型方法*
	```
	// 打印原型链
	function getPrototypeChain(obj) {
		const protoChain = []
		while(obj = Object.getPrototypeOf(obj)) {
			// 返回给定对象的原型，如果没有继承属性，则返回null
			protoChain.push(obj)
		}
		return protoChain
	}
	```

