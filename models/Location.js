const mongoose = require('mongoose');

const Location = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:255,
        min:4
    },
    desc:{
        type:String,
        required:true,
        max:255,
        min:10
    },
})

module.exports = mongoose.model('location',Location);