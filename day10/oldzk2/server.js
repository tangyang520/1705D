const http=require("http")

const fs=require("fs")

http.createServer((req,res)=>{
    if(req.url==="/txt"){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World');
    }else if(req.url==="/json"){
        res.writeHead(200,{'Content-Type': 'application/json'})
        res.end(JSON.stringify({code:1,title:"这是hello world"}))
    }else if(req.url==="/jpg"){
        res.writeHead(200,{'Content-Type': 'image/jpeg'})
        let img=fs.readFileSync("./111.jpg")
        res.end(img)
    }else{
        res.end("OK")
    }
}).listen(3000,()=>{
    console.log("服务启动在3000端口")
})

