#!/usr/bin/env node

// 引入内置模块 fs
const fs=require("fs")

// 引入内置模块 path
const path=require("path")

// 要修改的文件名
let oldname = process.argv[2] && process.argv[2].slice(1)

// 修改后的文件名
let newname =  process.argv[3] && process.argv[3].slice(1)

console.log(oldname,newname)

// if(fs.existsSync(path.join(process.cwd(),oldname))){
//    fs.renameSync(oldname,newname) 
// }

if(fs.existsSync(path.join(process.cwd(),oldname))){
    fs.renameSync(oldname,newname)
}

console.log(123456)