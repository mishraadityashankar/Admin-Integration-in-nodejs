const express = require("express");
const app = express();
const path = require("path");

const bodyParser=require('body-Parser');
const mongoose=require('mongoose');



const Feed_router = require('./routes/feed_api');
const Admin_router=require('./routes/admin_api');

const db= "mongodb://localhost:27017/Renderhtml";

app.use("/admin",Admin_router)
app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(bodyParser.json());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


app.use("/",Feed_router);


mongoose.Promise=global.Promise;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true },function(err){
  if(err){
  	console.error("error! "+err);
  }
  else
  console.log("connected to db");
});

app.listen(process.env.port || 3500,()=>{
  
    console.log('Running at Port 3500');
  
})