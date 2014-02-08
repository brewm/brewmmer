var restify = require('restify');
var fs = require('fs');


var server = restify.createServer({
  name: 'brewmmer',
  version: '1.0.0'
});
server
  .use(restify.fullResponse())
  .use(restify.bodyParser())

server.get('test', ok);
server.get('temperature', readTemperature);

server.listen(3551, function() {
  console.log('%s listening at %s', server.name, server.url);
});

function ok(req, res, next) {
  res.send('I\'m alive! \n');
}


function readTemperature(req, res, next){
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

		res.send(record);
		return next();
	});
};