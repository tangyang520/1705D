const mysql=require("mysql")

const connection = mysql.createConnection({
    user:"root",
    password:"root",
    host:"localhost",
    port:"3306",
    database:"ty-day9"
})

connection.connect((err)=>{
    if(err){
        console.log("数据库连接失败")
    }else{
        console.log("数据库连接成功")
    }
})

module.exports=connection;