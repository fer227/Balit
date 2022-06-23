const mongoose = require('mongoose');


const HelloWorldSChema = new mongoose.Schema(
{
        key : {
            type:String,
            trim:true,
            required:true,
            max:164
        },
        value : {
            type:String,
            trim:true,
            required:true,
            max:164
        }

}, {timestamps: true});


module.exports = mongoose.model('HelloWorld', HelloWorldSChema);