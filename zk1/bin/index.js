#!/usr/bin/env node

// 引入内置模块 fs
const fs=require("fs")

// 引入内置模块 path
const path=require("path")

// 获取到命令行参数
let params = process.argv[2].slice(1)

// 目标文件夹
const url=path.join(process.cwd(),params)

// 判断此目录是否存在
if(fs.existsSync(url)){   //fs.existsSync() 用来判断文件是否存在
    // 如果存在的话，就继续判断此目录是文件还是文件夹
    // 如果是文件夹的话
    if(fs.statSync(url).isDirectory()){   //fs.statSync() 读取文件的详细信息
        // 读取此目标文件夹目录下的所有文件
        let dirList = fs.readdirSync(url)  //[ 'css', 'index.html', 'index.js' ]
        // 遍历得到的数组
        let targetList=dirList.map(item=>{
            // path.extname() 方法返回 path 的扩展名
            let extname = path.extname(item)
            // 获取文件的大小，想要获取文件大小，必须得先获取到文件的详细信息
            let size = fs.statSync(path.join(params,item)).size;
            // 返回一个由模板字符串拼接的结果
            return `${item}-${extname && extname.slice(1)}-${size ? size : ""}`
        })
        console.log(targetList)
    }else{
        // 如果是文件的话，就把在命令行中获取到的参数打印出来
        console.log(params)
    }
}else{
    // 不存在的话就返回一个信息，告诉用户
    console.log("此目录不存在")
}