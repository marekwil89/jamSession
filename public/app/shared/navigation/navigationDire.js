var navigationDire = angular.module('navigationDire', []);

navigationDire.directive('navuser', function(){
	return {
		restrict : 'E',
		templateUrl: 'app/shared/navigation/naviuser.html',
		controller: 'navigationCtrl'
	};
});

navigationDire.directive('naviadmin', function(){
	return {
		restrict : 'E',
		templateUrl: 'app/shared/navigation/naviadmin.html',
		controller: 'navigationCtrl'
	};
});