/* jslint node: true */
'use strict';

var fs = require('fs');
var mongoose = require('mongoose');

var temperature = require('./temperature.js');

mongoose.connect('mongodb://admin:br3wmm3r@kahana.mongohq.com:10037/brewmmer');
var Measurement = require('./models/measurement').Measurement;

function storeTemperature(err, record){
  if(err) return console.error(err);

  // FOR TESTING PURPOSES
  record.temperature += (Math.random() - 0.5) * 10;

  var measurement = new Measurement({ temperature: record.temperature, timestamp: record.timestamp });
  measurement.save();
}

function logTemperature(interval){
  temperature.get(storeTemperature);
  // Set the repeat interval (seconds). Third argument is passed as callback function to first (i.e. readTemp(storeTemperature)).
  setInterval(temperature.get, interval * 1000, storeTemperature);
}

//Run
logTemperature(process.env['LOG_INTERVAL']);
