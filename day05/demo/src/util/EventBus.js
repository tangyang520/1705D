class EventBus{
    
    constructor(){
        this.events={}
    }
    // 订阅
    $on(eventName,callback){
        if(!this.events[eventName]){
            this.events[eventName]=[callback]
        }else{
            this.events[eventName].push(callback)
        }
    }
    // 发布
    $emit(eventName,...arg){
        this.events[eventName].forEach(item=>{
            item(...arg)
        })
    }

}

export default EventBus;