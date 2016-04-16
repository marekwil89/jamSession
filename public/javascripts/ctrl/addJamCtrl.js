angular.module('addJamModule', []).controller('addJamCtrl', function($scope, $http, $rootScope, $location){
	
    $scope.options1 = '';
    $scope.details1 = '';

	$scope.jam = {
		time : new Date(),
		date : new Date()
	}

	$scope.minDate = new Date();

	$scope.states = ['Mazowieckie', 'Dolnośląskie', 'Kujawsko-pomorskie', 'Lubelskie', 'Łódzkie', 'Małopolskie', 'Opolskie', 'Podkarpackie', 'Podlaskie', 'Pomorskie', 'Śląskie', 'Świętokrzyskie', 'Warmińsko-mazurskie', 'Wielkopolskie', 'Zachodniopomorskie']

	$scope.hstep = 1;
	$scope.mstep = 15; 

	$scope.options = {
		hstep: [1, 2, 3],
		mstep: [1, 5, 10, 15, 25, 30]
	};

	$scope.ismeridian = false;

	$scope.addNewJam = function(){
        $http.post('add/newJam', $scope.jam).success(function(data){
        	$scope.success = data;
        	$scope.errors = ''
        }).error(function(errors){
          	$scope.errors = errors;
          	$scope.success = ''
        })
	}

});