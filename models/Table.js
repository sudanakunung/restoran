const mongoose = require('mongoose');

const table = new mongoose.Schema({
    no:{
        type:String,
        required:true,
        max:255,
        min:2
    },
    location:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'location',
        required:true
    },
    customer:{
        type:Number,
        required:false
    },
    status:{
        type:Boolean,
        required:true,
        default:false
    }
})

module.exports = mongoose.model('table',table);