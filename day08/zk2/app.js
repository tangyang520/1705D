#!/usr/bin/env node
const child_process=require("child_process")

const fs=require("fs")

const path=require("path")

let filename = path.join(__dirname,process.argv[2])
console.log(process.argv,"1111111111111111")

let childProcess=createChild()

// 定义函数，用来创建子进程
function createChild(){

    if(fs.existsSync(filename)){
        let child=child_process.spawn("node",[filename])

        child.stdout.on("data",(data)=>{
            console.log(data.toString())
        })
    
        child.stderr.on("data",(err)=>{
            console.log(err.toString())
        })
        return child;
    }else{
        console.log("此目录不存在")
    }
}

let watcher=fs.watch(filename)

watcher.on("change",()=>{
    console.log("server改变")
    // 杀死子进程
    childProcess.kill()
    childProcess=createChild()
})
