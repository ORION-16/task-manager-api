const express = require("express");
const app = express();

//middleware
app.use(express.json());

//routes
app.get("/",(req,res)=>{
    res.end(JSON.stringify({
        message:"API running"
    }))
})
module.exports = app;