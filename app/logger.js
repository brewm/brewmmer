/* jslint node: true */
'use strict';

// // get config
// var db = require('../config/db');

// var mongoose = require('mongoose');
// mongoose.connect(db.url);

var Measurement = require('./models/measurement');
var Temperature = require('./temperature.js');

function storeTemperature(err, record){
  if(err) return console.error(err);

  var measurement = new Measurement({ temperature: record.temperature, timestamp: record.timestamp });
  measurement.save();
}

//export functionality
var timer = 0;

var exports = module.exports = {};

exports.start = function(interval){
  timer = setInterval(Temperature.get, interval * 1000, storeTemperature);
}

exports.stop = function(){
  clearInterval(timer);
}
