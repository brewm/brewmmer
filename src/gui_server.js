var http = require('http'),
    fs = require('fs');

var restify = require('restify');
		
// Creates a JSON client
var client = restify.createJsonClient({
	url: 'http://brewmmer.dyndns.org:3551'
});


fs.readFile('./temp_plot.html', function (err, html) {
	if (err){
			console.error(err);
			process.exit(1);
	}
//	http.createServer(function(request, response) {  
//		response.writeHeader(200, {"Content-Type": "text/html"});  
//		response.write(html);  
//		response.end();  
//	}).listen(3552);
});

function replaceByValue( json, field) {
    for( var k = 0; k < json.length; ++k ) {
		json[k][field] = new Date(json[k][field]) ;
	}
	return json;
}



http.createServer(function(request, response) { 
	//client.basicAuth('$login', '$password');
	client.get('/temperatures/20', function(err, req, res, obj) {
		if (err){
			console.error(err);
			process.exit(1);
		}

		//refactor object
		var temperatures = replaceByValue(obj.records, "time")
		console.log(temperatures);


		var opts = {
			"dataFormatX": function (x) { return d3.time.format('%Y-%m-%d').parse(x); },
			"tickFormatX": function (x) { return d3.time.format('%A')(x); }
		};

		var data = {
		  "xScale": "time",
		  "yScale": "linear",
		  "type": "line",
		  "main": [
		    {
		      "className": ".temperatures",
		      "data": obj.records
		    }
		  ]
		};


		var myChart = new xChart('line', data, '#example3', opts);

		response.writeHeader(200, {"Content-Type": "text/html"});  
		response.write("<html><body>"+"<figure style=\"width: 400px; height: 300px;\" id=\"myChart\"></figure>"+"</html></body>"); 
		response.end();  
		//JSON.stringify(res, null, 2);
	});
}).listen(3552);

