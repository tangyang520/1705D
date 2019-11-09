#!/usr/bin/env node

const download=require("download-git-repo")

let type= process.argv[2] ? process.argv[2] : "vue"

let child_process = require("child_process")

download(`github:tangyang520/${type}-dome`,type,(err)=>{
    if(err){
        throw err
    }
    process.chdir(type)
    
    child_process.exec("npm install")
})