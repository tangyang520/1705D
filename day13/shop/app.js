const Koa = require("koa")
const app = new Koa()

// 引入中间件
const path=require("path")
const static = require("koa-static")
const bodyparser = require("koa-bodyparser")
const router = require("./routers/index")
const query = require("./middleware/query")

// 挂载
app.use(static(path.join(process.cwd(),"public")))
app.use(bodyparser())
app.use(query())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(9696,()=>{
    console.log("服务启动在9696端口")
})