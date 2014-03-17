angular.module( 'brewmmer.factories', [] )
  .factory( 'dataFactory', function () {
	var factory = {};
	
	function getFormattedDate(longDate){
		var date = new Date(longDate);
		return date.getFullYear() + "/"+ date.getMonth() + "/"+  date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	}
	
	var tempTemps = [
		{timestamp:1394465317287,temperature:21.3},
		{timestamp:1394464417197,temperature:21.3},
		{timestamp:1394463517097,temperature:21.4},
		{timestamp:1394462616997,temperature:21.4},
		{timestamp:1394461716947,temperature:21.5}
		];
	
	var data2 = {};
	data2.labels = tempTemps.map(function(rec){
		return getFormattedDate(rec.timestamp);
	});
	data2.datasets = [
        {
          fillColor : 'rgba(151,187,205,0.5)',
          strokeColor : 'rgba(151,187,205,1)',
          pointColor : 'rgba(151,187,205,1)',
          pointStrokeColor : '#fff'
		}
		];
	data2.datasets[0].data = tempTemps.map(function(rec){
		return rec.temperature;
	});
	
	factory.getTemperatures = function () {
        return data2;
    };
	
	return factory;
  })
  .factory('tempDataFactrory', function($http){
	var factory = {};
	
	factory.getTemperatures = function () {
        return $http.get('http://brewmmer.dyndns.org:3551/test');
    };
	
	factory.getTemperaturesAsync = function(callback) {
		$http.get('http://rest-service.guides.spring.io/greeting')//'http://brewmmer.dyndns.org:3551/temperature')
		.success(function(response, status, headers, config){
			return callback(response, status, headers, config);
		})
		.error(function(response, status, headers, config){
			return callback(response, status, headers, config);
		});
	}
    
	//callback(response, status, headers, config)
	return factory;
  });