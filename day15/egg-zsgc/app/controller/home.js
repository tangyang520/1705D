'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  // 查
  async list() {
    const { ctx } = this;
    try{
      let data= await this.service.index.list()
      ctx.body={
        code:1,
        data:data
      }
    }catch(e){
      ctx.body={
        msg:e
      }
    }
  }
  // 删除
  async del() {
    const { ctx } = this;
    let {id} = ctx.query
    if(id || id===0){
      try{
        await this.service.index.del(id)
        ctx.body={
          code:1,
          msg:"删除成功"
        }
      }catch(e){
        ctx.body={
          code:0,
          msg:e
        }
      }
    }else{
      ctx.body={
        code:2,
        msg:"参数缺失"
      }
    }
  }
  // 添加
  async add(){
    const { ctx } = this;
    let {username,password,phone,address,idcard}=ctx.request.body
    if(!username || !password){
      ctx.body={
        code:2,
        msg:"参数输入不正确"
      }
    }else{
      // 查询用户是否存在
      let user=await this.service.index.selectUser(username)
      if(user.length){
        ctx.body={
          code:0,
          msg:"此人已存在"
        }
      }else{
        try{
          await this.service.index.add(username,password,phone,address,idcard)
          ctx.body={
            code:1,
            msg:"添加成功"
          }
        }catch(e){
          ctx.body={
            code:0,
            msg:e
          }
        }
      }  
    }
  }

  // 修改
  async edit(){
    const { ctx } = this;
    const {id,username,password,phone,address,idcard}=ctx.request.body
    console.log(id,"++++++++++++")
    if(!id || !username || !password ){
      ctx.body={
        code:2,
        msg:"参数输入不正确"
      }
    }else{
      try{
        await this.service.index.edit(username,password,phone,address,idcard,id)
        console.log("11111")
        ctx.body={
          code:1,
          msg:"修改成功"
        }
      }catch(e){
        ctx.body={
          code:0,
          msg:e
        }
      }
    }
  }
}

module.exports = HomeController;
