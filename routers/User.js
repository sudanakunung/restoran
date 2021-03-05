const express =require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const schemaRegister = Joi.object({
    name: Joi.string()
        .min(6)
        .max(30)
        .required(),
    email: Joi.string()
        .min(6)
        .max(30)
        .required()
        .email(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_password: Joi.ref('password'),
})

const schemaLogin = Joi.object({
    email: Joi.string()
        .min(6)
        .max(30)
        .required()
        .email(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

})

router.post('/register',async(req,res) =>{
 
    const emailExist = await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send('Email alredy exist')

    const salt = await bcrypt.genSaltSync(10);
    const hashpassword = await bcrypt.hashSync(req.body.password, salt);
   const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword
    })
    try {
    const value = await schemaRegister.validateAsync(req.body);
      const savedUser = await user.save()
        res.send(savedUser);
    }
    catch (err) {
        res.send(err.details)
     } 
})
router.post('/login',async(req,res) =>{
    
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("Email Isn't exist")
   
    const validpass = await bcrypt.compare(req.body.password, user.password)
    if(!validpass) return res.status(400).send('invalid password')

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
    
    
    res.header('auth-token',token).json({
        token:token,
        user:user
    });

})
router.get('/profile',verify,async(req,res) =>{
    
     const dataUser = await User.findOne({_id:req.user})
     res.send(dataUser);
     
})


module.exports = router;