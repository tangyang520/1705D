#!/usr/bin/env node

// 引入内置模块 fs
const fs=require("fs")

// 引入内置模块 path
const path=require("path")

// 获取命令行参数
let params = process.argv[2].slice(1)

// 获取目标目录
let url = path.join(process.cwd(),params)

// 判断如果目标目录存在的话
if(fs.existsSync(url)){
    // 读取目标目录的详细信息，判断其是文件夹还是文件
    // 如果是文件夹的话
    if(fs.statSync(url).isDirectory()){
        // 读取此文件夹下的所有文件，生成一个数组
        let dirlist = fs.readdirSync(url)
        // 遍历得到的数组
        let list = dirlist.map(item=>{
            //返回文件的扩展名
            let extname = path.extname(item)
            // 获取文件的大小
            let size = fs.statSync(path.join(params,item)).size;

            return `${item}-${extname && extname.slice(1)}-${size ? size : ""}`
        })
        console.log(list)
    }else{
        console.log(params)
    }
}else{
    console.log("此目录不存在")
}

