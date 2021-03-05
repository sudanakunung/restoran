const express = require('express');
const server = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config')
var cors = require('cors')
const userRouter = require('./routers/User');
const tableRouter = require('./routers/Table');
const locationRouter = require('./routers/Location');

server.use(bodyParser.json());
server.use(cors()) 
server.use('/api/user',userRouter);
server.use('/api/location',locationRouter);
server.use('/api/table',tableRouter);


mongoose.connect("mongodb+srv://sudanakunyung:thuagus123rj@cluster0.s7yqt.gcp.mongodb.net/restoran?retryWrites=true&w=majority",{ useUnifiedTopology: true,useNewUrlParser: true },(data)=>{
   if(data===null) console.log('connected')
   else console.log(data)
});

server.listen(3000)