const express = require('express')
const router = express.Router()
const {design} = require('./courses')
const { ensureAuth,ensureAuth4 }=require('../middleware/auth')
const myfunc=require('./index')
const User=require('../models/user')
var enrolledcourses=new Array(); 
// load config
const dotenv = require('dotenv')
dotenv.config({path:'./config/config.env'});
var validd
router.get('/',ensureAuth4,(req,res)=>
{
    //
    User.findOne({googleid:req.user.googleid})
.then(function(doc){
    if(!doc){ console.log("not founded user courses")}
    else{
        console.log("user courses founded");
        enrolledcourses=doc.courses;
        console.log(enrolledcourses);
      validd=true
    res.render('index',{
    validd:validd,
    displayname:req.user.displayname,
    profilepic:req.user.image,
    design:design(),enrolledcourses:enrolledcourses,
}
);
}
})

console.log(req.user.displayname)
})

router.get('/:id',ensureAuth,async (req,res)=>
{
    //
    User.findOne({googleid:req.user.googleid})
.then(function(doc){
    if(!doc){ console.log("not founded user courses")}
    else{
        console.log("user courses founded");
        enrolledcourses=doc.courses;
        console.log(enrolledcourses);
      validd=true
    res.render(req.params.id,{
    validd:validd,
    displayname:req.user.displayname,
    profilepic:req.user.image,
    design:design(),enrolledcourses:enrolledcourses,
}
);
}
})

//console.log(req.user.displayname)
})

module.exports=router
