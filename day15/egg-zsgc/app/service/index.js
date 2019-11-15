const { Service } = require("egg")

class userService extends Service{
    // 查看全部数据
    async list(){
        return await this.app.mysql.query("select * from userlist")
    }

    // 查某一个数据
    async selectUser(username){
        return await this.app.mysql.query("select * from userlist where username=?",[username])
    }

    // 删除
    async del(id){
        return await this.app.mysql.query("delete from userlist where id=?",[id])
    }

    // 添加
    async add(username,password,phone,address,idcard){
        return await this.app.mysql.query("insert into userlist (username,password,phone,address,idcard) values (?,?,?,?,?)",[username,password,phone,address,idcard])
    }
    
    // 修改
    async edit(username,password,phone,address,idcard,id){
        return await this.app.mysql.query("update userlist set username=?,password=?,phone=?,address=?,idcard=? where id=?",[username,password,phone,address,idcard,id])
    }
}
module.exports=userService

