// Load node modules
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var http = require('http');

var file = "./brewmmer.db";

var db = new sqlite3.Database(file);


function readTemperature(callback){
	fs.readFile('/sys/bus/w1/devices/28-0000051e015b/w1_slave', function(err, buffer)
	{
		if (err){
			console.error(err);
			process.exit(1);
		}

		// Read data from file (using fast node ASCII encoding).
		var data = buffer.toString('ascii').split(" "); // Split by space

		// Extract temperature from string and divide by 1000 to give celsius
		var temp  = parseFloat(data[data.length-1].split("=")[1])/1000.0;

		// Round to one decimal place
		temp = Math.round(temp * 10) / 10;

		//Build JSON record
		var record = {
			timestamp : Date.now(),
			temperature : temp
		};

		//write temperature to consol
		//console.log(record);
		callback(record);
	});
};

function storeTemperature(record){
	var statement = db.prepare("INSERT INTO log VALUES (?, ?)");
	statement.run(record.timestamp, record.temperature);
	statement.finalize();
}

function logTemperature(interval){
	// Call the readTemp function with the insertTemp function as output to get initial reading
	readTemperature(storeTemperature);
	// Set the repeat interval (milliseconds). Third argument is passed as callback function to first (i.e. readTemp(storeTemperature)).
	setInterval(readTemperature, interval, storeTemperature);
}

function getTemperatures(num_records, callback){
	var current_temp = db.all("SELECT * FROM log ORDER BY time DESC LIMIT ?;", num_records,
		function(err, rows){
			if (err){
				return;
			}
			var records = {records:[rows]}
			callback(records);
		});
};



//Run
console.log("Temperature JS started");

var msecs = (60*15) * 1000;
logTemperature(msecs);
