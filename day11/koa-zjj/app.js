const koa = require("koa")

const app = new koa();

// 处理前端 post 请求携带的参数
const bodyparser = require("koa-bodyparser")

// 处理路由
const router =require("koa-router")()

const query = require("./db/index")

app.use(bodyparser())    //bodyparser一定要放在路由挂载之前

app.use(async (ctx,next) => {
    console.log("ctx第一个中间")
    console.log(ctx.query) // {key:'羽绒服'}
    console.log(ctx.querystring);  //key=xxx&type=xxx
    console.log(ctx.request.body);
    await next()
})

app.use(router.routes())

app.use(router.allowedMethods())

router.get('/api/userlist',async (ctx,next) => {
    let data = await query('select * from userlist')
    ctx.body = data
})

app.listen(3000,()=>{
    console.log("服务已启动在3000端口")
})