const child_process=require("child_process")

const http = require("http")

let server = http.createServer((req,res)=>{
    if(req.url==="/count"){
        // 创建子进程
        let child=child_process.fork("./child.js")

        child.on("message",(timer)=>{
            res.end(timer)
        })

        child.send("这是主进程的数据")
    }

})

server.listen(3000,()=>{
    console.log("服务启动成功")
})