const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
googleid:{
    type:String,
    required:true,
},
gmail:{
    type:String,
    required:true,
},

displayname:{
    type:String,
    required:true,
},
image:{
    type:String
},
createdat:{
    type:Date,
    default:Date.now
},
courses:{
    type:{String},
    required:false,
},

})

module.exports=mongoose.model('User',userschema)