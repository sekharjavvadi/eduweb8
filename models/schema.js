
//initializing the schema is nothing but a structure for storing database

const mongoose=require('mongoose');

const schema=mongoose.Schema;
const blogschema=new schema({
    coursename:{ 
        type: String,
        required:true,
        unique:true,
    },
    topics: {
        type: {String},
        required: true
    },
    links: {
        type:{String},
        required:true
    },
    description:{
        type:{String},
        required:false
    }
},{timestamps:true});

const Blog=mongoose.model('Blog',blogschema);
module.exports = Blog;