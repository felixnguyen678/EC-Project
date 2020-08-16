const mongoose = require('mongoose');
var categories = new mongoose.Schema(
    {
        name:
        {
            type:String
        },
        topics:{
            type:Array
        }
    }
);
module.exports=mongoose.model('categories',categories);