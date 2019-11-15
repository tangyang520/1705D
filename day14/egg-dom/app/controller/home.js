'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async list(){
    const {ctx,service}=this
    console.log(ctx.params)
    let {pagenum=1,limit=2} = ctx.query
    let startIndex= (pagenum-1)*limit
    try{
      let data=await service.home.list(startIndex,limit)
      ctx.body={
        code:1,
        data:data
      }
    }catch(e){
      ctx.body={
        code:0,
        msg:e
      }
    }
  }
}

module.exports = HomeController;
