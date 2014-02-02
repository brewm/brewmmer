// Load node modules
var fs = require('fs');
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database(':memory:');

function readTemperature(){
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
			time : Date.now(),
			temperature : temp
		};

		//write temperature to consol
		console.log(record);
		return record;
	});
};

function storeTemperature(record){
	var statement = db.prepare("INSERT INTO log VALUES (?, ?)");
	statement.run(record.time, record.temperature);
	statement.finalize();
}

function logTemperature(interval){
	setInterval(storeTemperature(readTemperature), interval);
}



//Run
console.log("Temperature JS started");

var msecs = (10) * 1000;
logTemperature(msecs);
