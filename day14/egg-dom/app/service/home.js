const {Service} = require("egg")

class HomeService extends Service{
    async list(startIndex,limit){
        return await this.app.mysql.query(`select * from userlist limit ${startIndex},${limit}`)
    }
}

module.exports=HomeService