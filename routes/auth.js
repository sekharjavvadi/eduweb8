const express = require('express')
const passport=require('passport')
const router = express.Router()
var backurl;

// login/auth with google
//get /
router.get('/google',passport.authenticate('google',{ scope: ['profile','email']}))


// google auth callback
// get/auth/google/callback

router.get('/googlee',(req,res)=>{
    console.log(req.headers.referer)
     backurl=req.headers.referer;
    res.redirect('/auth/google')
})
var validd=false;
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/auth/doogle'}),
(req,res)=>{
    validd=true;
    res.redirect(backurl)
    backurl=req.headers.referer
    console.log('login successfully')
}
)

// @dese logout user
// router /auth/logout
router.get('/logoutt',(req,res)=>{
    backurl=req.headers.referer;
    console.log(backurl);
    res.redirect('/auth/logout');
})
router.get('/logout',(req,res)=>
{
    req.logout();
   res.redirect(backurl);
   console.log('logout');
   validd=false;
   
})
module.exports=router


