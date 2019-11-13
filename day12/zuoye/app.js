const Koa =require("koa")

const app=new Koa()

const path=require('path')

// 引入中间件
const static = require("koa-static")

// 处理前端 post 请求携带的参数
const bodyparser = require("koa-bodyparser")

const router = require("./router/index")

let query = require("./db/index")

// 处理静态资源
app.use(static(path.join(process.cwd(),"./public")))

app.use(bodyparser())

// 处理路由
app.use(router.routes())

app.use(router.allowedMethods())



app.listen(process.env.PORT || 3000,()=>{
    console.log("服务已启动")
})