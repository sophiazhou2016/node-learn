const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context')

class KKB {
    constructor() {
        this.middlewares = []
    }
    listen(...args) {
        const server = http.createServer(async (req, res) => {
            // 创建上下文
            const ctx = this.createContext(req, res)

            // 中间件合成
            const fn = this.compose(this.middlewares)
            // 执行中间件，传入上下文
            await fn(ctx)
            // console.log('ctx:', res.body, ctx.body)
            // this.callback(ctx)
            // 响应
            res.end(ctx.body)
        })
        
        server.listen(...args)
    }

    // use(callback) {
    //     this.callback = callback
    // }

    use(middlewares) {
        this.middlewares.push(middlewares)
    }
    createContext(req, res) {
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }

    // 合成函数
    compose(middlewares) {
        return function(ctx) {
            return dispatch(0);
            // 执行第0个
            function dispatch(i) {
                let fn = middlewares[i];
                if (!fn) {
                    return Promise.resolve();
                }
                return Promise.resolve(
                    fn(ctx, function next() { // 传入上下文
                        // promise完成后，再执行下一个
                        return dispatch(i + 1);
                    })
                );
            }
        };
    }
}

module.exports = KKB