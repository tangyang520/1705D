#!/usr/bin/env node

let app=require("../server/index")

let port = process.argv[2] && process.argv[3] ? process.argv[3] :8080

let {version} = require("../package.json")

if(process.argv[2]=="-v"){
    console.log("版本号为" + version)
}else{
    app.listen(port,()=>{
        console.log("服务成功启动在" + port + "端口")
    })
}

