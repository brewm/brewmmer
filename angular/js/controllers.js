/* global angular */
'use strict';

angular.module( 'brewmmer.controllers', [] )
  .controller( 'LineCtrl', function ( $scope , dataFactory) {
  $scope.status = '';
  $scope.data = {};
  $scope.limit = 10;


  // Chart.js options
  $scope.options =  {
    bezierCurve : true,
    segmentShowStroke : true,
    segmentStrokeColor : '#fff',
    segmentStrokeWidth : 24,
    percentageInnerCutout : 50,
    animation : true,
    animationSteps : 100,
    animationEasing : 'easeOutBounce',
    animateRotate : true,
    animateScale : false,
    onAnimationComplete : null
  };

  $scope.refresh = function(){
    dataFactory.getTemperatures($scope.limit, function(response, status) {
      $scope.status = status=200?'':status;
      $scope.data = response;
    });
  };

  $scope.refresh();
  }).controller( 'DataController', function( $scope, $timeout, dataFactory) {
    $scope.data = {};

    (function tick() {
      dataFactory.getTemperature(function(response){
        $scope.data = response.temperature + ' C';
        $timeout(tick, 1000);
      });
    })();
  });
