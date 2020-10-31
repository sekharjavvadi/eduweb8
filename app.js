const path=require('path')
const express=require('express');
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const morgan =require('morgan');
const passport = require('passport')
const fs = require('fs');
const bodyparser=require('body-parser')
const session = require('express-session')
const favicon = require('serve-favicon');
//const {ensureAuth,ensureGuest}=require('./middleware/auth')
const connectdb = require('./config/db');
const myfun=require('./routes/index');
var PORT=process.env.PORT || 3000;

var url=bodyparser.urlencoded({extended:false})
// load config
dotenv.config({path:'./config/config.env'});

// passport config
require('./config/passport')(passport)

connectdb();

const app=express();

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())





app.use(favicon(__dirname + '/public/favicon.ico'));
//static folders
app.use(express.static(path.join(__dirname,'public')))

// view engine
app.set('view engine', 'ejs');


//sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
     // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  // passport middle ware
app.use(passport.initialize())
app.use(passport.session())
app.use('/courselist',myfun.router);//
app.use('/auth',require('./routes/auth'));
 app.use('/coursetopic',require('./routes/courselist'));//

app.use('/update',require('./routes/dummy'));
 app.use('/',require('./routes/indexx'));//
// app.get('/',(req,res)=>{
//   res.send("this is sekhar how are you")
// })


app.listen(PORT,function(){
  console.log(`app running on port ${PORT}`)
})




