const mysql = require("mysql")

let connecttion = mysql.createConnection({
    user:"root",
    host:"localhost",
    port:"3306",
    pawwsord:"root",
    database:"1705-TY"
})

connecttion.connect((error)=>{
    if(error){
        console.log("连接失败")
    }else{
        console.log("连接成功")
    }
})

module.exports = connecttion