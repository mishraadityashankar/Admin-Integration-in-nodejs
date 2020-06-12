const express = require("express");

const router = express.Router();
const mongoose=require('mongoose');
const Feed=require('../models/feed_model');


router.get("/", (req, res) => {
    res.render("home");
  });
  
  router.get("/addfeed", (req, res) => {
      res.render("feed_form");
    });
  
    router.post('/addfeed',(req,res) =>{
   
        const feed = new Feed({
            _id:new mongoose.Types.ObjectId(),
           
            Title: req.body.Title,
            Description: req.body.Description
           
        });
        feed.save().then(
            
            res.redirect('http://localhost:3500/getfeed')
        ).catch(err=>console.log('the error is' +err));
    
    
    });
  
  router.get('/getfeed',(req,res) =>{
      Feed.find({})
      .exec(function(err,feed){
        if(err){console.log("error in retrieving feeds");
        }
        else{
          
          res.render("feedlist", {feed: feed});
        }
         });
       
      
  });
module.exports = router;