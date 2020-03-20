"use strict";

/**
 * import dependencies
 */

const path = require('path'),
    config = require('dotenv').config({path: __dirname + '/../.env'}),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    express = require('express'),
    cors = require('cors');




/**
 * import resources/routers
 */
const users = require('./resources/users/users.js');

/**
 * import configs/env vars
 */
const PORT = process.env.PORT,
    DB_URL = process.env.DB_URL;

/**
 * Connect to DB
 */
mongoose.connect(DB_URL, { useNewUrlParser: true });



/**
 * initialize and attach middleware
 */
const app = express();                              // init app
app.use(cors());                                    // for cross origin requests
app.use(bodyParser.json());                         // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/**
 * attach routes and attach middleware
 */
app.use('/users', users);


/**
 * listen on port
 */
app.listen(PORT, () => {
    console.log("\nApp listening on port: " + PORT);
})