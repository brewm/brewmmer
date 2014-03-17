angular.module( 'brewmmer.controllers', [] )
  .controller( 'LineCtrl', function ( $scope , dataFactory) {
	$scope.data = dataFactory.getTemperatures();
    $scope.options =  {
	// Chart.js options can go here.
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
  }).controller( 'DataController', function($scope, tempDataFactrory){
	$scope.data = {};
	$scope.hihi = "Ajjaj.";
	
	getTemp();

    function getTemp() {
        tempDataFactrory.getTemperatures()
            .success(function (response, status, headers, config) {
				$scope.hihi = status;
                $scope.data = response;
            })
            .error(function (response, status, headers, config) {
                $scope.data = response;//'Unable to load customer data: ' + error.message;
				$scope.hihi = 'err';
            });
    };
	
	/*tempDataFactrory.getTemperaturesAsync(function callback(response, status, headers, config) {
		$scope.data = response;
		$scope.hihi = status;
	});
  */
  });