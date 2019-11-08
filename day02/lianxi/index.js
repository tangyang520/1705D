#!/usr/bin/env node

console.log("今天是星期六，下午放假")

console.log(process.argv.slice(2))

if(process.argv.slice(0)=="version"){
    console.log("版本号是1.0.0")
}else if(process.argv.slice(0)=="create"){
    console.log("初始化一个项目")
}