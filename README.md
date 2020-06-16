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
	
	```
	const fs = require('fs')
	const { promisify } = require('util')
	const readFile = promisify(fs.readFile)

	process.nextTick(async() => {
	    const data = await readFile('./conf.js')
	    console.log('data:', data.toString())
	})
	```
	*注意await紧跟着的是一个promise，promisify 是原生node 的 util 库里面支持的。*
## 2、Buffer
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


## 5、子进程 child_process 提供了几种创建子进程的方式
### 1) 首先介绍一下spawn方法
	```
	child_process.spawn(command[, args][, options])
	
	// command： 要执行的指令
	// args： 传递参数
	// options： 配置项
	```
	```
	const { spawn } = require('child_process');
	const child = spawn('pwd');
	```
	*pwd是shell的命令，用于获取当前的目录，上面的代码执行完控制台并没有任何的信息输出，这是为什么呢？
	控制台之所以不能看到输出信息的原因是由于子进程有自己的stdio流（stdin、stdout、stderr），控制台的输出是与当前进程的stdio绑定的，因此如果希望看到输出信息，可以通过在子进程的stdout 与当前进程的stdout之间建立管道实现*
	```
	child.stdout.pipe(process.stdout);
	```
### 2) execSync
	```
	const { execSync } = require('child_process')
	execSync('npm install && npm run build')
	```
## 6、fs的使用
	```
	fs.readdirSync() // 读文件夹
	fs.readFileSync() // 读文件
	```

# 二、koa2 的原理
## 1、优雅api: 利用Object 的 get, set 方法 简化. Api
	```
	const k = {
		info: {
			name: '我是名字'
		},
		get name() {
			return this.info.name
		},
		set name(val) {
			console.log('name is ' + val)
			this.info.name = val
		}
	}

	console.log('1x: ', k.name)
	k.name = 'Alsa'
	console.log('2x: ', k.name)
	```
## 2、从函数组合到中间件实现
	** https://juejin.im/post/5dbf9bdaf265da4d25054f91 **
## 3、高阶函数：
>> 入参跟出参都是函数
# 三、网络编程
## 1、net 
	```
	const net = require('net')
	const chatServer = net.createServer()

	const clientList = []
	chatServer.on('connection', client => {
		client.write('Hi!\n')
		clientList.push(client)
		client.on('data', data => {
			console.log('receive: ', data.toString(), clientList.length)
			clientList.forEach(v => {
				v.write(data)
			})
		})
	})

	chatServer.listen(9000)
	```
## 2、跨域解决方案
### a. JSONP
### b. 代理服务器
### c. CORS(Cross Origin Resource Share) res.setHeader(Access-Control-Allow-Origin, '可以跨域的网址')