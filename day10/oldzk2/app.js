#!/usr/bin/env node
const child_process=require("child_process")

const fs=require("fs")

const path=require("path")

let filename = path.join(__dirname,process.argv[2])
console.log(filename)

// 调用 函数 创建子进程
let childProcess=createChild()

function createChild(){

    if(fs.existsSync(filename)){
        // 创建子进程
        let child = child_process.spawn("node",[filename])

        // 打印标准输出流
        child.stdout.on("data",(data)=>{
            console.log(data.toString())
        })

        // 打印标准错误流
        child.stderr.on("data",(err)=>{
            console.log(err.toString())
        }) 
        return child;
    }else{
        console.log("此目录不存在")
    } 
}

let watcher = fs.watch(filename)

watcher.on("change",()=>{
    console.log("server.js 改变了")
    childProcess.kill()
    childProcess=createChild()
})