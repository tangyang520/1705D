#!/usr/bin/env node

// 引入内置模块 fs
const fs=require("fs")

// 引入内置模块 path
const path=require("path")

// 要改变的文件名
let oldname = process.argv[2] && process.argv[2].slice(1)

// 改变后的新文件名
let newname = process.argv[3] && process.argv[3].slice(1)

console.log(oldname,newname)

if(fs.existsSync(path.join(process.cwd(),oldname))){
    fs.renameSync(oldname,newname)
}


// let i=0;

// let list=fs.readdirSync(process.cwd())

//     list.forEach(item=>{
//         if(/.js$/.test(item)){
//             i++;
//             fs.renameSync(item,`index(${i}).js`)
//         }
//     })