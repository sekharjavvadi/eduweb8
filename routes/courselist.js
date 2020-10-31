const express = require('express')
const router = express.Router()
const { ensureAuth,ensureGuest,ensureAuth3 }=require('../middleware/auth')
const {design,filmmaking,development,itandsoftware,personaldevelopment,technology,marketing,business} = require('./courses')
const User=require('../models/user')

var coursetopics=new Array();

router.get('/:id',ensureAuth3,async (req,res)=>{
console.log(req.params.id)
if(req.params.id=="design"){
    coursetopics=design();
}
if(req.params.id=="filmmaking"){
    coursetopics=filmmaking();
}
if(req.params.id=="development"){
    coursetopics=development();
}
if(req.params.id=="marketing"){
    coursetopics=marketing();
}
if(req.params.id=="itandsoftware"){
    coursetopics=itandsoftware();
}
if(req.params.id=="personaldevelopment"){
    coursetopics=personaldevelopment();
}
if(req.params.id=="technology"){
    coursetopics=technology();
}
else if(req.params.id=="business"){
    coursetopics=business();
}

// var validd=true;
// res.render('coursetopics',{coursetopics:coursetopics,validd:validd,design:design()
// })
User.findOne({googleid:req.user.googleid})
.then(function(doc){
    if(!doc){ console.log("not founded user courses")}
    else{
        console.log("user courses founded");
        enrolledcourses=doc.courses;
        console.log(enrolledcourses);
      validd=true
    res.render('coursetopics',{
    validd:validd,
    displayname:req.user.displayname,coursetopics:coursetopics,
    profilepic:req.user.image,
    design:design(),enrolledcourses:enrolledcourses,coursetitle:req.params.id,
}
);
}
})
})
module.exports=router