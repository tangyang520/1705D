console.log(process.argv[2])   //获取命令行参数

console.log(process.pid)    //获取命令行参数

console.log(process.cwd())   //获取当前进程的工作目录

console.log(process.platform)   //获取当前进程运行的操作系统平台
 
setTimeout(()=>{
    console.log(process.uptime())   //当前进程已运行时间
},3000)

console.log(process.title)    //指定进程名称