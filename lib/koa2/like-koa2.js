const http = require('http')

// 组合中间件
function compose(middlewareList) {
    return function(ctx) {
        function dispatch(i) {
            const fn = middlewareList[i]
            try {
                return Promise.resolve(
                    fn(ctx, dispatch.bind(null, i + 1))
                )
            } catch(err) {
                return Promise.reject(err)
            }
        }

        return dispatch(0)
    }
}

class Likekoa2 {
    constructor() {
        this.middleware = []
    }

    use(fn) {
        this.middleware.push(fn)
        return this
    }

    createContext(req, res) {
        const ctx = {
            req,
            res
        }
        ctx.query = req.query
        return ctx
    }

    handleRequest(ctx, fn) {
        return fn(ctx)
    }
    
    callback() {
        const fn = compose(this.middleware)

        return (req, res) => {
            const ctx = this.createContext(req, res)
            return this.handleRequest(ctx, fn)
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = Likekoa2