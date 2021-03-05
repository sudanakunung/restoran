const mongoose = require('mongoose');

const Order = new mongoose.Schema({
    date:{
        type:Date,
        required:true,
    },
    table:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'table',
        required:true
    },
    items:{
        type:[String]
    }
})

module.exports = mongoose.model('order',Order);