const mongoose = require('mongoose');

const Menu = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:255,
        min:4
    },
    category_menu:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category_menu',
        required:true
    },
    desc:{
        type:String,
        required:true,
        min:10,
        max:255
    },
    available:{
        type:Boolean,
        required:true,
        default:false
    },
    image:{
        type:String,
        required:true,
        min:10,
        max:255
    }
})

module.exports = mongoose.model('menu',Menu);