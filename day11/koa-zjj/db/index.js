const connection = require('./db.js');

module.exports = (sql) => {
    return new Promise((resolve,reject) => {
        connection.query(sql,(error,data) => {
            if(error){
                reject(error)
            }else{
                resolve(data)
            }
        })
    })   
}