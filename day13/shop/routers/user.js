const router = require("koa-router")()

// 查
router.get("/api/list",async ctx=>{
    try{
        // 总条数
        let total = await ctx.mysql.query("select count(*) from userlist")
        // 前端传来的参数，页码 与 每页显示的条数
        let { pagenum=1,limit=2 }=ctx.query
        // 查询到的所有数据
        // let data1 = await query("select * from userlist")
       
        // 起始下标
        let startIndex = (pagenum-1)*limit

        // 查询到的每一页显示的数据
        let data = await ctx.mysql.query(`select * from userlist limit ${startIndex},${limit}`)
       
        ctx.body={
            code:1,
            data,
            total:total[0]['count(*)']   //获取总条数
        }
    }catch(e){
        ctx.body={
            code:0,
            msg:e
        }
    }
})

// 增
router.post("/api/add",async ctx=>{
    let {username,password,phone,address,idcard} = ctx.request.body
    if(username && password && idcard){
        let user = await ctx.mysql.query("select * from userlist where username=?",[username])
        if(user.length){
            ctx.body={
                code:0,
                msg:"此用户已存在"
            }
        }else{
            let data=await ctx.mysql.query("insert into userlist (username,password,phone,address,idcard) values (?,?,?,?,?)",[username,password,phone,address,idcard])
            if(data==="err"){
                ctx.body=err
            }else{
                ctx.body={
                    code:1,
                    msg:"添加成功"
                }
            }
        }
    }else{
        ctx.body={
            code:2,
            msg:"参数不完整"
        }
    }
})

// 删除
router.get("/api/del",async ctx=>{
    let {id}=ctx.query
    if(id || id==0){
        try{
            await ctx.mysql.query("delete from userlist where id=?",[id])
            ctx.body={
                code:1,
                msg:"删除成功"
            }
        }catch(e){
            ctx.body={
                code:0,
                msg: e
            }
        }
    }else{
        ctx.body={
            code:2,
            msg:"参数不完整"
        }
    }
})

// 修改
router.post("/api/edit",async ctx=>{
    let {username,password,phone,address,idcard,id} = ctx.request.body
    console.log(username,password,phone,address,idcard,id)
    if(username &&　password && idcard && id){
        try{
            await ctx.mysql.query("update userlist set username=?,password=?,phone=?,address=?,idcard=? where id=?",[username,password,phone,address,idcard,id])
            ctx.body={
                code:1,
                msg:"修改成功"
            }
        }catch(e){
            ctx.body={
                code:0,
                msg: e
            }
        }
    }else{
        ctx.body={
            code:2,
            msg:"参数不完整"
        }
    }
})

module.exports=router;