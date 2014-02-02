// Load node modules
var fs = require('fs');

//Run
console.log("Temperature JS started");
readTemperature();

function readTemperature(){
	fs.readFile('/sys/bus/w1/devices/28-0000051e015b/w1_slave', function(err, buffer)
		{
	      if (err){
	         console.error(err);
	         process.exit(1);
	      }

	      console.log(buffer);
	   });
};
