# 一、Node.js 基础部分

## 1. nodejs 里面的异步I/O
例子1：
```js
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
	
```js
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
```js
const buf1 = Buffer.alloc(10)
const buf2 = Buffer.from('a')
const buf3 = Buffer.from('汉')
const buf4 = Buffer.concat([buf2, buf3])
console.log('buf4:', buf4, buf4.toString())
```
## 3、stream(使用 pipe 来连接两个stream，而 http 请求里面的 request 跟 response 都是继承于Stream，所以都是流)
```js
const fs = require('fs')
const rs = fs.createReadStream('./01.jpg')
const ws = fs.createWriteStream('./02.jpg')
rs.pipe(ws)
```
## 4、http 请求
```js
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
```js
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
```js
child_process.spawn(command[, args][, options])

// command： 要执行的指令
// args： 传递参数
// options： 配置项
```
```js
const { spawn } = require('child_process');
const child = spawn('pwd');
```
* pwd是shell的命令，用于获取当前的目录，上面的代码执行完控制台并没有任何的信息输出，这是为什么呢？控制台之所以不能看到输出信息的原因是由于子进程有自己的stdio流（stdin、stdout、stderr），控制台的输出是与当前进程的stdio绑定的，因此如果希望看到输出信息，可以通过在子进程的stdout 与当前进程的stdout之间建立管道实现 *
```js
child.stdout.pipe(process.stdout);
```
### 2) execSync
	```js
	const { execSync } = require('child_process')
	execSync('npm install && npm run build')
	```
## 6、fs的使用
	```js
	fs.readdirSync() // 读文件夹
	fs.readFileSync() // 读文件
	```

# 二、koa2 的原理
## 1、优雅api: 利用Object 的 get, set 方法 简化. Api
	```js
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
> https://juejin.im/post/5dbf9bdaf265da4d25054f91 *
## 3、高阶函数：
> 入参跟出参都是函数
# 三、网络编程
## 1、net 
```js
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

## 3、axios 作为一个很重要的请求框架，api 需要知道如：
### a) axios.defaults.baseURL = 'http://localhost:4000'
### b) axios.defaults.withCredentials = true;

## 4、preflight request(预检请求，会在浏览器里面看到两次请求)
> 参考资料：https://www.jianshu.com/p/b55086cbd9af
```js
res.writeHead(200, {
	"Access-Control-Allow-Origin": "http://localhost:3000",
	"Access-Control-Allow-Headers": "X-Token,Content-Type",
	"Access-Control-Allow-Methods": "PUT"
})
```
> 这里可以说是面试必考题了

## 5、如果要携带cookie信息，则请求变为credential请求
### axios.defaults.withCredentials = true; 跨域访问需要发送cookie时一定要加
### res.setHeader('Access-Control-Allow-Credentials', 'true');

## 6、bodyparser（post请求的时候用 data 事件监听数据流）
```js
const fis = fs.createWriteStream(outputFile)
```
#### a)两个流对接 pipe
```js
request.pipe(fis)
```
### b) Buffer connect
```js
let reqData = []
	let size = 0
	req.on('data', data => {
		console.log('>>> req on', data)
		reqData.push(data)
		size += data.length
	})
	req.on('end', () => {
		console.log('end')
		const data = Buffer.concat(reqData, size);
		console.log('data:', size, data.toString())
		res.end(`formdata:${data.toString()}`)
	})
```
### c) 流事件写入
```js
request.on('data', data => {
    console.log('data:',data)
    fis.write(data)
})
request.on('end', () => {
    fis.end()
   	response.end()
 })
```
## 7、爬虫
```js
	const originRequest = require('request')
	const cheerio = require('cheerio')
	const iconv = require('iconv-lite')

	function request (url, callback) {
		const options = {
			url,
			encoding: null
		}
		originRequest(url, options, callback)
	}

	for(let i = 100555; i < 100563; i++) {
		const url = `https://www.dy2018.com/i/${i}.html`
		request(url, function(err, res, body) {
			const html = iconv.decode(body, 'gb2312')
			const $ = cheerio.load(html)
			console.log($('.title_all h1').text())
		})
	}
```
## 8、即时通讯
### a) setInterval 轮询
### b) socket.io

## 9、实现一个终端

# 四、mysql
## 1、文件系统(readline 是一个很有意思的东西，node内置，可以读取命令行)
```js
const fs = require('fs')

function set(key, value) {
    fs.readFile('./db.json', (err, data) => {
        const json = data ? JSON.parse(data) : {}
        json[key] = value
        // 重新写入文件
        fs.writeFile('./db.json', JSON.stringify(json), err => {
            if(err) {
                console.log(err)
            }
            console.log('写入成功')
        })
    })
}

function get(key) {
    fs.readFile('./db.json', (err, data) =>{
        if(err) {
            console.log(err)
        }
        const json = JSON.parse(data)
        console.log(json[key])
    })
}

// 命令行接口
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    ouput: process.stdout
})

// set a 1
rl.on('line', input => {
    const [op, key, value] = input.split(' ')
    if(op === 'get') {
        get(key)
    } else if(op === 'set') {
        set(key, value)
    } else if(op === 'quit') {
        rl.close()
    } else {
        console.log('没有该操作')
    }
})

rl.on('close', () => {
    process.exit(0)
})
```