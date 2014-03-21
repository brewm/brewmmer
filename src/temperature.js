var fs = require('fs');

var exports = module.exports = {};

exports.get = function (callback){
	fs.readFile('/sys/bus/w1/devices/28-0000051e015b/w1_slave', function(err, buffer){
		if(err)	return callback(err);
		
		var result = {};	
		
		var data = buffer.toString('ascii').split(" "); 
		var temperature  = parseFloat(data[data.length-1].split("=")[1])/1000.0;
		
		result.timestamp = Date.now();
		result.temperature = Math.round(temperature * 10) / 10;

		callback(null, result);
	});
};

