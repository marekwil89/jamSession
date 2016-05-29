var navigationDire = angular.module('navigationDire', []);

navigationDire.directive('navigation', function(){
	return {
		restrict : 'E',
		templateUrl: 'app/shared/navigation/navigation.html',
		controller: 'navigationCtrl'
	};
});