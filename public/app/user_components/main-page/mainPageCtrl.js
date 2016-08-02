angular.module('mainPageModule', []).controller('mainPageCtrl', function(anchorSmoothScroll , $scope, $http, $rootScope, $location){

	var getLastJams = function(){
		$http.get('get/getLastJams').success(function(data){
			$scope.lastJams = data;
		})
	}

	getLastJams()
	
	$scope.gotoElement = function (eID){
		// set the location.hash to the id of
		// the element you wish to scroll to.
		$location.hash('bottom');
		
		// call $anchorScroll()
		anchorSmoothScroll.scrollTo(eID);
	
	};








});

