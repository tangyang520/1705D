#!/usr/bin/env node
console.log("11111111111111")

const fs=require("fs")

const path=require("path")

let oldname = process.argv[2] && process.argv[2].slice(1)

let newname = process.argv[3] && process.argv[3].slice(1)

console.log(oldname,newname)

if(fs.existsSync(path.join(process.cwd(),oldname))){
    fs.renameSync(oldname,newname)
}

let i=0;

let list = fs.readdirSync(process.cwd())

list.forEach(item=>{
    if(/.js$/.test(item)){
        i++;
        fs.renameSync(item,`index(${i}).js`)
    }
})