const router = require("koa-router")()

// 查看
router.get("/api/list",async ctx=>{
    try{
        let {pagenum=1,limit=2}=ctx.query
        let startIndex=(pagenum-1)*limit
        let data=await ctx.sql.query(`select * from userlist limit ${startIndex},${limit}`)
        let total=await ctx.sql.query("select count(*) from userlist")
        ctx.body={
            code:1,
            data,
            total:total[0]["count(*)"]
        }
    }catch(e){
        ctx.body={
            code:0,
            msg:e
        }
    }
})

// 增加
router.post("/api/add",async ctx=>{
    let {username,password,phone,address,idcard}=ctx.request.body
    if(username && password ){
        let user = await ctx.sql.query("select * from userlist where username=?",[username])
        console.log(user)
        if(user.length){
            ctx.body={
                code:0,
                msg:"此用户已存在"
            }
        }else{
            try{
                await ctx.sql.query('insert into userlist (username,password,phone,address,idcard) values (?,?,?,?,?)',[username,password,phone,address,idcard]);
                ctx.body = {
                    code:1,
                    msg:'添加成功'
                }
            }catch(e){
                ctx.body = {
                    code:0,
                    msg:e
                }
            }
        }
    }else{
        ctx.body={
            code:2,
            msg:"请输入正确的参数"
        }
    }
})

// 删除
router.get("/api/del",async ctx=>{
    let {id}=ctx.query
    if(id || id===0){
        try{
            await ctx.sql.query("delete from userlist where id=?",[id])
            ctx.body = {
                code:1,
                msg:'删除成功'
            }
        }catch(e){
            ctx.body = {
                code:0,
                msg:e
            }
        }
    }else{
        ctx.body={
            code:2,
            msg:"请输入正确的参数"
        }
    }
})

// 修改
router.post("/api/edit",async ctx=>{
    let {username,password,phone,address,idcard,id}=ctx.request.body
    if(username && password && id){
        try{
            await ctx.sql.query('update userlist set username=?,password=?,phone=?,address=?,idcard=? where id=?',[username,password,phone,address,idcard,id]);
            ctx.body = {
                code:1,
                msg:'修改成功'
            }
        }catch(e){
            ctx.body = {
                code:0,
                msg:e
            }
        }
    }else{
        ctx.body={
            code:2,
            msg:"请输入正确的参数"
        }
    }
})

module.exports = router;
