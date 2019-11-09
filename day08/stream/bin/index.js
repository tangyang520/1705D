#!/usr/bin/env node

const download=require("download-git-repo")

const childProcess=require("child_process")

let type=process.argv[2] ? process.argv[2] :"vue"

download(`github:cold26/${type}-demo`,type,(err)=>{
    if(err) throw err;
    process.chdir(type)
    childProcess.exec("npm install")
})