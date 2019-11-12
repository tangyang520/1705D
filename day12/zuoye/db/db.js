// 链接数据库的代码

const mysql=require("mysql")

// 创建 链接对象
const connection = mysql.createConnection({
    username:"root",
    port:3306,
    password:"root",
    database:"ty-day9",
    host:"localhost"
})

connection.connect((err)=>{
    if(err){
        console.log("链接失败")
    }else{
        console.log("链接成功")
    }
})

module.exports = connection;

