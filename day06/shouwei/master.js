const http=require("http")

const child_process = require("child_process")

// 起服务
const server = http.createServer()

// 获取 cpu 数量
const cpus=require("os").cpus().length

// 监听端口
server.listen(3000)

let workers={}

// 定义一个函数，迎来创建子进程
function createProcess(){
    // 创建子进程
    let worker = child_process.fork("./worker.js")
    console.log("创建之间的",worker.pid)

    // 子进程 与 主进程通信
    worker.send("server",server)

    workers[worker.pid]=worker

    // 捕获异常重启
    worker.on("message",(msg)=>{
        console.log("error",msg.pid)
        delete workers[worker.pid]
        // // 杀死子进程
        // worker.kill();
        // 重新创建子进程
        createProcess()
    })

    // 结束进程，重启
    worker.on("exit",()=>{
        delete workers[worker.pid]
        createProcess()
    })
}

// 循环创建子进程
for(let i=0;i<cpus;i++){
    // 调用创建函数
    createProcess()
}