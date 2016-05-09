angular.module('jamsModule', []).controller('jamsListCtrl', function($scope, $http, $rootScope, $location, $routeParams, $anchorScroll){


	// $scope.currentPage = 1;
	// $scope.pageSize = 6;
	

	$scope.states = ['Mazowieckie', 'Dolnośląskie', 'Kujawsko-pomorskie', 'Lubelskie', 'Łódzkie', 'Małopolskie', 'Opolskie', 'Podkarpackie', 'Podlaskie', 'Pomorskie', 'Śląskie', 'Świętokrzyskie', 'Warmińsko-mazurskie', 'Wielkopolskie', 'Zachodniopomorskie']

	$scope.stateChoose = '';

	var getJamsList = function(){
		$http.get('get/getJamsList').success(function(data){
			$scope.jams = data;
		})
	}

	getJamsList();


	// $scope.searchJams = function(){
	// 	var search = {
	// 		word: $scope.stateChoose
	// 	}
	// 	$http.post('jam/searchJams', search).success(function(data){
	// 		$scope.jams = data
	// 	})
	// }

});