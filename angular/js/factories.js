/* global angular */
'use strict';

angular.module( 'brewmmer.factories', [] )
  .factory( 'dataFactory', function ($http, $filter) {
  var factory = {};

  factory.getTemperatures = function(limit, callback) {
    $http.get('http://brewmmer.dyndns.org:3551/temperatures/' + limit)
    .success(function(response, status){
      var data = {};
      data.labels = response.records.map(function(rec){
        return $filter('date')(rec.timestamp, 'yyyy-MM-dd HH:mm:ss'); //getFormattedDate(rec.timestamp);
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
    .error(function(response){
      return callback(response, 'Error: Can\'t connect to server!');
    });
  };

  factory.getTemperature = function(callback) {
    $http.get('http://brewmmer.dyndns.org:3551/temperature')
    .success(function(response){
      return callback(response);
    })
    .error(function(){
      return callback('???');
    });
  };

  return factory;
  });
