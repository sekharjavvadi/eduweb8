const express=require('express')
const router = express.Router()
const mongoose=require('mongoose');
const Blogs=require('../models/schema')
const User=require('../models/user')
const { ensureAuth,ensureGuest }=require('../middleware/auth2')
const {design}=require('./courses')
//const {checkcourses}=require('./dummy2')

// load config
const dotenv = require('dotenv')
dotenv.config({path:'./config/config.env'});

var arr1=new Array();//dummy
var arr2=new Array();//dummy
var arr3=new Array();
var vtopics=new Array();
var vlinks=new Array();
var vdescription=new Array();
var enrolledcourses=new Array(); 
var coursetitle;


router.get('/delete/:id',ensureAuth,(req,res)=>{
    User.updateOne(
        {googleid:req.user.googleid},
        {$pullAll:{courses:[req.params.id]}},function(err,result){if(err){console.log}else{console.log(result)}}
    )
    console.log(`deleting item is ${req.params.id}`)
    res.redirect(req.get('referer'));
})
router.get('/:id',ensureAuth, (req,res)=>
{
    Blogs.findOne({coursename:req.params.id})
    .then(function(doc){
        if(!doc){
            console.log('no records')
            res.send('no records on database')
        }
        else{
    vtopics=[];
    vlinks=[];
    vdescription=[];
    vlinks=doc.links;
    vtopics=doc.topics;
    vdescription=doc.description;
    coursetitle=req.params.id;
//
User.findOne({googleid:req.user.googleid})
.then(function(doc){
    if(!doc){ console.log("not founded user courses")}
    else{
        console.log("user courses founded");
        enrolledcourses=doc.courses;
        console.log(enrolledcourses);
        const search = what => enrolledcourses.find(element => element === what);
        if (search(req.params.id)) {
         console.log("value in array")
     } else {
         console.log('No result found');
         enrolledcourses.push(req.params.id);
         console.log(enrolledcourses);
         User.updateOne(
             {googleid:req.user.googleid},
             {$set:{courses:enrolledcourses}},
             function(err){ if(err){console.log(`error while updatind enrolled courses ${err}`)}}
         )
         
     }        
    }
    const validd=true;
    console.log(`enrolled courses before updating${enrolledcourses}`)
    res.render('topics',{vtopics,vlinks,vdescription,validd:validd,displayname:req.user.displayname,
    profilepic:req.user.image,design:design(),enrolledcourses:enrolledcourses,coursetitle:coursetitle,
    })
})
        }
    })
})

function enroll(){
    return enrolledcourses;
}
module.exports={router,enroll}

