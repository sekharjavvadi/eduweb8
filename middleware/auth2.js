const passport = require("passport")
const mongoose=require('mongoose');
const Blogs=require('../models/schema')
const {design}=require('../routes/courses')

var arr1=new Array();//dummy
var arr2=new Array();//dummy
var arr3=new Array();
var vtopics=new Array();
var vlinks=new Array();
var vdescription=new Array();
// load config
const dotenv = require('dotenv')
dotenv.config({path:'./config/config.env'});

module.exports ={
    ensureAuth: function (req,res,next){
        if(req.isAuthenticated()){
            console.log('authenticatedd')
            return next()
        }
        else{
            console.log('unauthenicated')
            const validd=false;
            Blogs.findOne({coursename:req.params.id})
    .then(function(dott){
        if(!dott){
            console.log('no records')
            res.send('no records on database')
        }
        else{
    arr1=dott.links;
    arr2=dott.topics;
    arr3=dott.description;
    vlinks=[];
    vtopics=[];
    vdescription=[];
    vlinks=arr1;
    vtopics=arr2;
    vdescription=arr3;
    
    //
    res.render('topics',{vtopics,vlinks,vdescription,validd:validd,design:design(),coursetitle:req.params.id})
        }
    })
          
        }
    },
    ensureGuest:function(req,res,next){
        if(!req.isAuthenticated()){
            return next()
            
        }
        else
        {
            console.log('guest authenticated')
            res.redirect('/index')
           
        }
    },
}