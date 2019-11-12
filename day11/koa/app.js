const Koa = require("koa")

const app=new Koa()

const path=require("path")

// 处理静态资源的中间件
const static = require("koa-static")

// 处理静态资源
app.use(static(path.join(process.cwd(),"public")))

// 洋圈模型
app.use(async(ctx,next)=>{
    console.log("第一层洋葱圈开始")
    let starttime = new Date().getTime()
    await next();
    console.log("第一层洋葱圈结束")
    let endtime = new Date().getTime()
    let timer = endtime - starttime
    ctx.body=timer
})

function lazy(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },3000)
    })
}

app.use(async(ctx,next)=>{
    console.log("第二层洋葱圈开始")
    await next();
    console.log("第二层洋葱圈结束")
})

app.use(async(ctx,next)=>{
    console.log("第三层洋葱圈开始")
    await lazy();
    await next();
    console.log("第三层洋葱圈结束")
})

// 监听端口
app.listen(process.env.PORT||3000,()=>{
    console.log("服务已启动")
})