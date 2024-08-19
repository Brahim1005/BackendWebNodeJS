require("dotenv").config();
const express = require("express");
const app = express(); 
const userRouter = require("./api/users/user.router")
const newsRouter = require("./api/book/book.router");


app.use(express.json()); 

app.use("/api/users" , userRouter)
app.use("/api/book" , newsRouter)
app.listen(process.env.APP_PORT, ()=>{
    console.log("Server up and running on PORT :" , process.env.APP_PORT);
})