const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dotenv = require('dotenv')


dotenv.config();
const {MONGODB_IP,MONGODB_PORT,MONGODB_DATABASE,PORT} = process.env;

mongoose.connect(`mongodb://${MONGODB_IP}:${MONGODB_PORT}/${MONGODB_DATABASE}`, {useNewUrlParser: true});

/**
 * 
 * POST register        users
 * POST login           users
 * POST hostel           hostels
 * GET hostels           hostels
 * GET hostel/:hostel     hostels
 * 
 */

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const UsersRoute = require('./routes/users');
const HostelsRoute = require('./routes/hostels');

app.use('/',UsersRoute);
app.use('/',HostelsRoute);

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`)
})