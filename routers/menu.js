const express =require('express');
const router = express.Router();
const menu = require('../models/menu');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const schemaCreateMenu = Joi.object({
    name: Joi.string()
        .min(2)
        .max(30)
        .required(),
    desc:Joi.string()
        .min(10)
        .max(255)
        .required()
})

router.post('/create',async(req,res) =>{
 
   const location = new menu({
        name:req.body.name,       
        desc:req.body.desc
    })
    try {
    const value = await schemaCreateMenu.validateAsync(req.body);
      const savedmenu = await menu.save()
        res.send(savedmenu);
    }
    catch (err) {
        res.send(err.details)
     } 
})
router.get('/all',async(req,res) =>{
 
    const allLocation=await Location.find().populate('Table')
    res.send(allLocation)
})
module.exports = router;