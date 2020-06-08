# 一、Node.js 基础部分

1. nodejs 里面的异步I/O
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
2、<Buffer>
	
