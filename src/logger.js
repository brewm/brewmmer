/* jslint node: true */
'use strict';

var fs = require('fs');
var mongoose = require('mongoose');

var temperature = require('./temperature.js');

mongoose.connect('mongodb://admin:br3wmm3r@kahana.mongohq.com:10037/brewmmer');
var Measurement = require('../models/measurement').Measurement;

var msecs;

//Get config file
var configFile = fs.readFileSync('../config.json');
var config = {};
try {
  config = JSON.parse(configFile);
  msecs = config.logging_interval * 1000;

} catch (err) {
  console.log('There has been an error parsing your JSON.');
  console.log(err);
}


function storeTemperature(err, record){
  if(err) return console.error(err);

  var measurement = new Measurement({ temperature: record.temperature, timestamp: record.timestamp });
  measurement.save();
}

function logTemperature(interval){
  temperature.get(storeTemperature);
  // Set the repeat interval (milliseconds). Third argument is passed as callback function to first (i.e. readTemp(storeTemperature)).
  setInterval(temperature.get, interval, storeTemperature);
}

//Run
logTemperature(msecs);
