// Load node modules
var fs = require('fs');

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

		//write temperature to consol
		console.log(temp);
	});
};


function logTemperature(interval){
	setInterval(readTemperature, interval);
}

//Run
console.log("Temperature JS started");

var msecs = (10) * 1000;
logTemperature(msecs);
