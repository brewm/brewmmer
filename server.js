/* jslint node: true */
'use strict';

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

// get config
var db = require('./config/db');

// configure app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 3554; // set our port

var mongoose = require('mongoose');
mongoose.connect(db.url);

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  // console.log('we can log here');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:<PORT>/api)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the root!' });
});

// REGISTER THE CONTROLLERS  -------------------------
require('./app/controllers/measurements')(router);
require('./app/controllers/recipe_types')(router);
require('./app/controllers/recipes')(router);
require('./app/controllers/services')(router);
require('./app/controllers/temperature')(router);

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('We run on port ' + port);
