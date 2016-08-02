angular.module('user', []).controller('editJamCtrl', function($scope, $http, $rootScope, $routeParams, $location, redirect, $timeout){

	//redirect to main page if logout

	redirect.ifLogout($rootScope.authenticated, $rootScope.current_user)


	//options

	$scope.states = ['Mazowieckie', 'Dolnośląskie', 'Kujawsko-pomorskie', 'Lubelskie', 'Lubuskie' , 'Łódzkie', 'Małopolskie', 'Opolskie', 'Podkarpackie', 'Podlaskie', 'Pomorskie', 'Śląskie', 'Świętokrzyskie', 'Warmińsko-mazurskie', 'Wielkopolskie', 'Zachodniopomorskie']
	$scope.options1 = {
		country: 'pl',
		types: '(cities)'
	};

	//get single jam information

	var getJamInfo = function(){
		$http.get( 'get/getJamInfo/' + $routeParams.id ).success( function( data ){        
			$scope.jam = data;
			$scope.date = new Date($scope.jam.date)
		})     
	}

	getJamInfo()


	//Calendar options

	$scope.toggleMinDate = function() {
		var minDate = new Date();
		minDate.setDate(minDate.getDate());
		$scope.minDate = $scope.minDate ? null : minDate;
	};

	$scope.toggleMinDate();


	$scope.open = function($event,opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.dateOpened = true;
	};

	$scope.dateOpened = false;
	$scope.hourStep = 1;
	$scope.format = "dd-MMM-yyyy";
	$scope.minuteStep = 15;



	$scope.showMeridian = false;


	//update Jam function

	$scope.updateJam = function(){
		var updatedJam = {
			id: $scope.jam._id,
			descr: $scope.jam.descr,
			date: $scope.date,
			state: $scope.jam.state,
			location: $scope.jam.location
		}

		$http.put('put/updateJam', updatedJam).success(function(data){
			$scope.success = data;
			$scope.errors = ''
			$timeout(function () {
				$location.path('/myProfile')
			}, 2000);  
		}).error(function(errors){
			$scope.errors = errors;
			$scope.success = ''
		})
	}

});
