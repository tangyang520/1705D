#!/usr/bin/env node

const fs=require("fs")

const path=require("path")

let params=process.argv[2].slice(1)

let url = path.join(process.cwd(),params)

if(fs.existsSync(url)){
    if(fs.statSync(url).isDirectory()){
        let dirlist = fs.readdirSync(url)
        let target=dirlist.map((item,index)=>{
            let extname = path.extname(item)

            let size = fs.statSync(path.join(params,item)).size;
            console.log(size)

            return `${item}-${extname && extname.slice(1)}-${size?size:""}`
        })
        console.log(target)
    }else{
        console.log(params)
    }
}else{
    console.log("此目录不存在")
}


