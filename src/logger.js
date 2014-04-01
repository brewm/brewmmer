// Load node modules
var fs = require('fs');
var sqlite3 = require('sqlite3');
var temperature = require('./temperature.js');

var db = new sqlite3.Database("./brewmmer.db");


function storeTemperature(err, record){
	if(err)	return console.error(err);

	var statement = db.prepare("INSERT INTO temperature_log VALUES (?, ?)");
	statement.run(record.timestamp, record.temperature);
	statement.finalize();
}

function logTemperature(interval){
	temperature.get(storeTemperature);
	// Set the repeat interval (milliseconds). Third argument is passed as callback function to first (i.e. readTemp(storeTemperature)).
	setInterval(temperature.get, interval, storeTemperature);
}

//Run
console.log("Temperature JS started");

var msecs = (60*15) * 1000;
logTemperature(msecs);