angular.module('naviModule', []).controller('navigationCtrl', function($scope, $http, $location, $rootScope){

	$scope.newNotify = function(){
		if($rootScope.notifyLength > 0)
		{
			return 'new-notify'
		}
	}

// new-notify


	$scope.isActive = function(path){
		return $location.path() === path;
	};

})

