const Koa = require("koa")

const app=new Koa();

const path=require("path")

// 处理静态资源的中间件
const static = require("koa-static")

// 处理前端 post 请求携带的参数
const bodyparser = require("koa-bodyparser")

// 处理路由 
const router = require("koa-router")()

let query=require("./db/query")

// 处理静态资源
app.use(static(path.join(process.cwd(),"./public")))

// 处理post请求携带的参数,一定要放在路由挂载之前
app.use(bodyparser())

// 路由
app.use(router.routes())

app.use(router.allowedMethods())

// get 请求   查
router.get("/api/userlist",async (ctx,next)=>{
    let data=await query("select * from userlist")
    ctx.body=data
})

// post 请求   增
router.post("/api/add",async (ctx,next)=>{
    // 将前端传来的参数解构出来
    let {username,password,address,phone,idcard} = ctx.request.body

    // 判断是否传递参数，如果传递了，就先去查找
    if(username && password && idcard){   //容错处理
        // 先查找添加的用户是否存在
        let user = await query("select * from userlist where idcard=?",[idcard])
        
        if(user.length){
            // 如果此用户已存在
            ctx.body={
                code:0,
                msg:"此用户已存在"
            }
        }else{
            // 此用户不存在
            let data=await query("insert into userlist (username,password,address,phone,idcard) values (?,?,?,?,?)",[username,password,address,phone,idcard])
            if(data==="error"){
                ctx.body=error
            }else{
                ctx.body={
                    code:1,
                    msg:"添加成功"
                }
            }
        }   
        // 如果不存在，就给前端一个提示，告诉前端没有传参数
    }else{
        ctx.body={
            code:2,
            msg:"参数不完整"
        }
    } 
})

// get 请求   删
router.get("/api/del",async ctx=>{
    let {id} = ctx.request.query
    if(id || id===0){
        try{
            await query("delete from userlist where id=?",[id])
            ctx.body={
                code:1,
                msg:"删除成功"
            }
        }catch(e){
            ctx.body={
                code:0,
                msg:e
            }    
        }
    }else{
        ctx.body={
            code:2,
            msg:"参数不完整"
        }
    }
})

// post 请求  修改
router.post("/api/edit",async ctx=>{
    let {username,password,address,phone,idcard,id} = ctx.request.body
    if(id && username && password && idcard){
        console.log("11111111111111")
        try{
            await query("update userlist set username=?,password=?,address=?,phone=?,idcard=? where id=?",[username,password,address,phone,idcard,id])
            ctx.body={
                code:1,
                msg:"修改成功"
            }
        }catch(e){
            ctx.body={
                code:0,
                msg:e
            }    
        }
    }else{
        ctx.body={
            code:2,
            msg:"参数不完整"
        }
    }
})

// 模糊搜索
router.get("/api/search",async ctx=>{
    let {key}=ctx.query
    let sql = ""

    if(!key){
        sql += "select * from userlist"
    }else{
        sql += `select * from userlist where username like '%${key}%'`
    }
    try{
        let list = await query(sql)
        ctx.body={
            code:1,
            data:list
        }
    }catch(e){
        ctx.body = {
            code:0,
            msg:e
        }
    }
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("服务启动成功")
})