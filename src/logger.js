/* jslint node: true */
'use strict';

var sqlite3 = require('sqlite3');
var temperature = require('./temperature.js');

var db = new sqlite3.Database('./brewmmer.db');

var msecs = (60*15) * 1000;

function storeTemperature(err, record){
  if(err) return console.error(err);

  var statement = db.prepare('INSERT INTO temperature_log VALUES (?, ?)');
  statement.run(record.timestamp, record.temperature);
  statement.finalize();
}

function logTemperature(interval){
  temperature.get(storeTemperature);
  // Set the repeat interval (milliseconds). Third argument is passed as callback function to first (i.e. readTemp(storeTemperature)).
  setInterval(temperature.get, interval, storeTemperature);
}

//Run
logTemperature(msecs);
