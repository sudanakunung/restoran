const mongoose = require('mongoose');

const Category_menu = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:255,
        min:4
    },
    desc:{
        type:String,
        required:true,
        min:10,
        max:255
    },
   
})

module.exports = mongoose.model('category_menu',Category_menu);