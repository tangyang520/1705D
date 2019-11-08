let express = require("express");

let app=express();

app.use(express.static(process.cwd()))

module.exports=app;