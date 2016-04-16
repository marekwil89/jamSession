angular.module('mainPageModule', []).controller('mainPageCtrl', function($scope, $http, $rootScope, $location, $routeParams, $anchorScroll){

	var getLastJams = function(){
		$http.get('jam/getLastJams').success(function(data){
			$scope.lastJams = data;
			console.log($scope.lastJams)
		})
	}

	getLastJams()



	

	
});

