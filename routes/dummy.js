const express=require('express')
const router = express.Router()
const mongoose=require('mongoose');
const User=require('../models/user')
const { ensureAuth2,ensureGuest }=require('../middleware/auth')
var cour=["c"];
// load config
const dotenv = require('dotenv');
const courses = require('./courses');
const { route } = require('.');
dotenv.config({path:'./config/config.env'});

router.get('/',ensureAuth2,function(req, res) {
    User.updateOne(
      { googleid: req.user.googleid },
      { $set: { courses:[ "iot3" ]} },//use this function for every adding new course and deleting courses
      function(err, result) {//use any variable instead of using iot3
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  router.get('/array',function (req,res) {
    var array = [
      "string 2","string 4"
    ];
    var name="string 5";
    const search = what => array.find(element => element.name === what);
   if (search(name)) {
    console.log(search.value, search.other);
} else {
    console.log('No result found');
    array.push(name)
    
}
    
    
  })

module.exports=router
