const http=require("http")

const fs=require("fs")

const server = http.createServer((req,res)=>{
    if(req.url==="/txt"){
        res.writeHead(200,{"Content-Type": "text/plain"})
        res.end("text")
    }else if(req.url==="/json"){
        res.writeHead(200,{"Content-Type": "application/json"})
        res.end(JSON.stringify({code:1,title:"这是练习"}))
    }else if(req.url==="/jpg"){
        let imgbuf=fs.readFileSync("./2.jpg")
        res.end(imgbuf)
    }else{
        res.end("Ok")
    }
})

server.listen(3000,()=>{
    console.log("服务已启动在3000端口")
})