const express =require('express');
const router = express.Router();
const Location = require('../models/Location');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const schemaCreateLocation = Joi.object({
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
 
   const location = new Location({
        name:req.body.name,       
        desc:req.body.desc
    })
    try {
    const value = await schemaCreateLocation.validateAsync(req.body);
      const savedlocation = await location.save()
        res.send(savedlocation);
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