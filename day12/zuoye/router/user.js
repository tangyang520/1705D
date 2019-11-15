const router=require("koa-router")()

// 查看
router.get("/api/list",async ctx=>{
    let data=await ctx.mysql.query("select * from shoplist")
    ctx.body=data
})

// 增加
router.post("/api/add",async ctx=>{
    let { shopname,desc,con }=ctx.request.body
    console.log(111)
    if(shopname && con){
        console.log(11)
        let shop = await ctx.mysql.query("select * from shoplist where shopname=?",[shopname])
        if(shop.length){
            console.log("11111")
            ctx.body={       
                code:0,
                msg:"此商品已存在"
            }
        }else{
            let data = await ctx.mysql.query("insert into shoplist (shopname,descs,con) values (?,?,?)",[shopname,desc,con])
            if(data==="error"){
                ctx.body=error
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
            msg:"参数不对"
        }
    }
})

// 删除
router.get("/api/del",async ctx=>{
    let {id}=ctx.query
    if(id || id===0){
        try{
            await ctx.mysql.query("delete from shoplist where id=?",[id])
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
            msg:"参数不对"
        }       
    }
})

// 修改
router.post("/api/edit",async ctx=>{
    let {shopname,desc,con,id}=ctx.request.body
    if(id && shopname && con){
        try{
            await ctx.mysql.query("update shoplist set shopname=?,descs=?,con=? where id=?",[shopname,desc,con,id])
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
            msg:"参数不对"
        }  
    }
})

module.exports=router;