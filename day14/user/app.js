const Koa = require("koa")
const app=new Koa()

const path=require("path")
const static = require("koa-static")
const bodyparser = require("koa-bodyparser")
const router = require("./routers/index")
const query = require("./middleware/query")


app.use(static(path.join(process.cwd(),"public")))
app.use(bodyparser())
app.use(query())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3030,()=>[
    console.log("服务启动在3030端口")
])