// Load node modules
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();

var file = "./brewmmer.db";
//var exists = fs.existsSync(file);

var db = new sqlite3.Database(file);

/*
if(!exists){
	console.error("db not found");
	db.run("CREATE TABLE log (time bigint primary key, celsius real)");
}else{
	console.log("db OK");
}
*/

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
		console.log(record);
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
	// Set the repeat interval (milliseconds). Third argument is passed as callback function to first (i.e. readTemp(insertTemp)).
	setInterval(readTemperature, interval, storeTemperature);
}



//Run
console.log("Temperature JS started");

var msecs = (60*15) * 1000;
logTemperature(msecs);
