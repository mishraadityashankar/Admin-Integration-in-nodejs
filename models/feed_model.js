const mongoose =require('mongoose');
const Schema=mongoose.Schema;



const feedSchema = new Schema({
       
      
       Title:{
           type:String, required:true
       },
     
       Description:{
           type:String,required:true
       }
});
module.exports=mongoose.model('Feed',feedSchema);