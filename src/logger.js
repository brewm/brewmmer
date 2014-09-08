/* jslint node: true */
'use strict';

var fs = require('fs');
var mongoose = require('mongoose');

var temperature = require('./temperature.js');

mongoose.connect('mongodb://admin:br3wmm3r@kahana.mongohq.com:10037/brewmmer');
var Measurement = require('./models/measurement').Measurement;

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
logTemperature(process.env['LOG_INTERVAL']);
