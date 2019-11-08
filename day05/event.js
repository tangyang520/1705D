// 引入内置模块 events
const EventEmitter = require("events").EventEmitter;

// 实例化对象
let event = new EventEmitter();

let callback=()=>{
    ()=>{
        console.log("event2")
    }
}

// 订阅事件  once:只触发一次事件
event.once("some_event",()=>{
    console.log("event1事件触发")
})

// 想要删除单个事件的话，就必须得将里面的回调函数写成有名函数，与被删除的事件名称一样
event.on("some_event",callback)

// 删除事件   
event.removeListener("some_event", callback)

// 删除全部事件
event.removeAllListeners("some_event")

// 发布事件
event.emit("some_event")
event.emit("some_event")
