const mysql = require("mysql")

// 创建链接对象
const connection = mysql.createConnection({
    user:"root",
    port:"3306",
    host:"localhost",
    password:"root",
    database:"ty-day9",
})

// 判断连接状态
connection.connect((error)=>{
    if(error){
        console.log("连接失败")
    }else{
        console.log("连接成功")
    }
})

module.exports=connection;