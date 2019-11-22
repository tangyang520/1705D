'use strict';

const Service = require('egg').Service;

class IndexService extends Service {
    // 登录
    async login(username,password) {
        return await this.ctx.app.mysql.query("select * from users where username=? and password=?",[username,password])
    }

    // 请求权限
    async power(roleid){
        return await this.app.mysql.query(`select menuname,menuapi from menulist where power like '%${roleid}%' `)
    }
}
module.exports = IndexService;
