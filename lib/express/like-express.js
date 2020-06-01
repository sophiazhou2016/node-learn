const https = require('http')
const slice = Array.prototype.slice

class LikeExpress {
    constructor() {
        // 存放中间件的列表
        this.routes = {
            all: [], // app.use(...)
            get: [], // app.get(...)
            post: [] // app.post(...)
        }
    }

    register(path) {
        const info = {}
        // 兼容写法
        if(typeof path === 'string') {
            info.path = path
            // 从第二个参数开始存入数组stack
            info.stack = slice.call(arguments, 1)
        }else {
            info.path = '/'
            // 从第1个参数开始存入数组stack
            info.stack = slice.call(arguments, 0)
        }
        return info
    }

    use() {
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }

    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)
    }

    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)
    }

    match(method, url) {
        let stack = []
        if(url === 'favicon.ico') {
            return stack
        }
        // 获取 routes
        let curRoutes = []
        curRoutes = curRoutes.concat(this.routes.all) // 找到use数组
        curRoutes = curRoutes.concat(this.routes[method]) // 找到对应method的数组

        // 再根据path找到stack数组
        curRoutes.forEach(routeInfo => {
            if(url.indexOf(routeInfo.path) === 0) {
                // url === '/api/get-cookie' 且 routeInfo.path === '/'
                // url === '/api/get-cookie' 且 routeInfo.path === '/api'
                // url === '/api/get-cookie' 且 routeInfo.path === '/api/get-cookie''
                stack = stack.concat(routeInfo.stack)
            }
        })
        return stack
    }

    // 核心的next机制
    handle(req, res, stack) {
        const next = () => {
            // 拿到第一个匹配的中间件
            const middleware = stack.shift()
            if(middleware) {
                // 执行中间件函数，把next 作为一个参数，继续执行
                middleware(req, res, next)
            } 
        }
        next()
    }

    calback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(
                    JSON.stringify(data)
                )
            }
            const url = req.url
            const method = req.method.toLowerCase()

            const resultList = this.match(method, url)
            this.handle(req, res, resultList)
        }
    }

    listen(...args) {
        const srever = http.createServer(this.calback())
        srever.listen(...args)
    }
}

// 工厂函数
module.exports = () => {
    return new LikeExpress()
}