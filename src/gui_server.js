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


http.createServer(function(request, response) { 
	//client.basicAuth('$login', '$password');
	client.get('/temperatures/20', function(err, req, res, obj) {
		if (err){
			console.error(err);
			process.exit(1);
		}
		console.log(obj);
		response.writeHeader(200, {"Content-Type": "text/html"});  
		response.write("<html><body>"+JSON.stringify(obj, null, 2)+"</html></body>"); 
		response.end();  
		//JSON.stringify(res, null, 2);
	});
}).listen(3552);