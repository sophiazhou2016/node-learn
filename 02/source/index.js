// const http = require('http')
// const server = http.createServer((req, res) => {
//     res.writeHead(200)
//     res.end('hi qianqian')
// })

// server.listen(3000, () => {
//     console.log('监听port 3000...')
// })

const KKB = require('./kkb')
const Router = require('./router')

// app.use((req, res) => {
//     res.writeHead(200)
//     res.end('hi qianqian 666')
// })
// app.use( ctx => {
//     ctx.body = 'hehe 888....'
// })

const app = new KKB()

const static = require('./static')
app.use(static(__dirname + '/public'));
const router = new Router();


router.get('/index', async ctx => {
  console.log('index,xx')
  ctx.body = 'index page';
});
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; }); // 路由实例输出父中间件 router.routes()
app.use(router.routes());

app.listen(3000, () => {
    console.log('监听port 3000...')
})