const googlestrategy=require('passport-google-oauth20').Strategy
const mongoose=require('mongoose');
//const session=require('express-session')
const User=require('../models/user')
var courses=new Array();

module.exports = function (passport){
    passport.use(
        new googlestrategy(
            {
        clientID:'362110677396-13o4vdi7fcruc6u0ko8fc6ek5qlhbof1.apps.googleusercontent.com',
        clientSecret:'pvj1279XKs9P9W50amwKHu9t',
        callbackURL:'/auth/google/callback'
    },
    async (accessToken,refreshToken,profile,done)=>
    {
        console.log(profile)
       // console.log(`this is the email address${profile.emails[0].value}`);
        const newUser = {
            googleid:profile.id,
            gmail:profile.emails[0].value,
            displayname:profile.displayName,
            image:profile.photos[0].value,
            courses:courses
        }
        try{
            let user= await User.findOne({googleid:profile.id})
            if(user){
                done(null,user)
            }
            else{
                user=await User.create(newUser)
                done(null,user)
            }

        }
        catch (err){
            console.error(err)

        }

    }
    ))
    passport.serializeUser((user,done)=>
    {
        done(null,user.id)
    })
    passport.deserializeUser((id,done)=>
    {
        User.findById(id,(err,user)=> done(err,user))
    })

}