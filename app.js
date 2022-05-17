const express=require('express');
const mongoose=require("mongoose");

const app=express();

const movieRoute=require('./routes/movies');
const bodyParser=require('body-parser')

mongoose.connect("mongodb://localhost:27017/movie");

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo db");
});

mongoose.connection.on('error',err=>{
    console.log("error at mongo" + err);
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', movieRoute);






module.exports=app;
