angular.module( 'brewmmer.factories', [] )
  .factory( 'dataFactory', function ($http) {
	var factory = {};
	
	function getFormattedDate(longDate){
		var date = new Date(longDate);
		return date.getFullYear() + "/"+ date.getMonth() + "/"+  date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	}

	factory.getTemperatures = function(limit, callback) {
        $http.get('http://brewmmer.dyndns.org:3551/temperatures/'+limit)
		.success(function(response, status, headers, config){
			var data = {};
			data.labels = response.records.map(function(rec){
				return getFormattedDate(rec.timestamp);
			});
		
			data.datasets = [
			{
			  fillColor : 'rgba(151,187,205,0.5)',
			  strokeColor : 'rgba(151,187,205,1)',
			  pointColor : 'rgba(151,187,205,1)',
			  pointStrokeColor : '#fff'
			}
			];
			
			data.datasets[0].data = response.records.map(function(rec){
				return rec.temperature;
			});
			
			return callback(data, status);
		})
		.error(function(response, status, headers, config){
			return callback(response, "Error: Can't connect to server!");
		});
    };
	
	factory.getTemperature = function(callback) {
		$http.get('http://brewmmer.dyndns.org:3551/temperature')
		.success(function(response, status, headers, config){
			return callback(response);
		})
		.error(function(response, status, headers, config){
			return callback('???');
		});
	}
	
	return factory;
  });