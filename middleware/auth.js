const passport = require("passport")
const {design,filmmaking,development,itandsoftware,personaldevelopment,technology,marketing,business} = require('../routes/courses')

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
            res.render(req.params.id,{
            validd:validd,design:design(),
           })
          
        }
    },
    ensureAuth2: function (req,res,next){
        if(req.isAuthenticated()){
            console.log('authenticatedd')
            return next()
        }
        else{
            console.log('unauthenicated')          
        }
    },
    ensureAuth3: function (req,res,next){
        if(req.isAuthenticated()){
            console.log('authenticatedd')
            return next()
        }
        else{
            console.log('unauthenicated')    
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
            var validd=false;
            res.render('coursetopics',{coursetopics:coursetopics,validd:validd,design:design(),coursetitle:req.params.id,
            })      
        }
    },
    ensureAuth4: function (req,res,next){
        if(req.isAuthenticated()){
            console.log('authenticatedd')
            return next()
        }
        else{
            console.log('unauthenicated')
            const validd=false;
            res.render('index',{
            validd:validd,design:design(),
           })
          
        }
    }
}