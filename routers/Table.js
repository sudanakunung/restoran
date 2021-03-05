const express = require('express');
const router = express.Router();
const Table = require('../models/Table');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const schemaCreateTable = Joi.object({no: Joi.string().min(2).max(30).required(), location_Id: Joi.objectId().required()})

router.post('/create', async (req, res) => {

    const table = new Table({no: req.body.no, location: req.body.location_Id})
    try {
        const value = await schemaCreateTable.validateAsync(req.body);
        const savedTable = await table.save()
        res.send(savedTable);
    } catch (err) {
        res.send(err.details)
    }
})
router.get('/all', async (req, res) => {

    const allTable = await Table.find().populate('location', '-__v ')
    res.send(allTable)

})
router.get('/:location', async (req, res) => {

    const allTable = await Table.find({location: req.params.location})
    res.send(allTable)

})
module.exports = router;
