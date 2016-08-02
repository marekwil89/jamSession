angular.module('addJamModule', []).controller('addJamCtrl', function($scope, $http, $rootScope, $location, $timeout){
	
	//Calendar Options

	$scope.dateNow = function(){
		$scope.jam ={
			date: new Date()
		}
	}

	$scope.dateNow()

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

	//Poland States


	$scope.states = ['Mazowieckie', 'Dolnośląskie', 'Kujawsko-pomorskie', 'Lubelskie', 'Lubuskie' , 'Łódzkie', 'Małopolskie', 'Opolskie', 'Podkarpackie', 'Podlaskie', 'Pomorskie', 'Śląskie', 'Świętokrzyskie', 'Warmińsko-mazurskie', 'Wielkopolskie', 'Zachodniopomorskie']


	//add new Jam and check which input are empty and add empty css class 

	
	$scope.addNewJam = function(){
		$http.post('add/newJam', $scope.jam).success(function(data){
			$scope.success = data.text;
			var id = data.id;
			$scope.errors = '';
			$scope.jam = '';
			$timeout(function () {
				$location.path('/jam/' + id )
			}, 2000);  
		}).error(function(errors){
			$scope.checkEmpty = function(word){
				if(!word)
				{
					return 'empty'
				}
			}
			$scope.errors = errors;
			$scope.success = ''
		})
	}

});