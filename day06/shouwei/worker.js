const http=require("http")

const childServer = http.createServer((req,res)=>{
    if(req.url==="/list"){
        res.end("list")
    }else if(req.url==="/error"){
        throw "error 错误信息"
    }else{
        res.end("ok")
    }
})

process.on("message",(flag,server)=>{
    if(flag==="server"){
        server.on("connection",socket=>{
            childServer.emit("connection",socket)
        })
    }
})

process.on("uncaughtException",()=>{
    process.send({msg:"error",pid:process.pid})
})