angular.module('addJamModule', []).controller('addJamCtrl', function($scope, $http, $rootScope, $location, $timeout){
	
  // var redirectLogOut = function(){
  //   if($rootScope.authenticated == false && !$rootScope.current_user){
  //     $location.path('/jamsList')
  //   }
  // }

  // redirectLogOut()


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

  
  $scope.jam = {
    title : "Przykładowy Jam",
    descr: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde odit aperiam tempora quae saepe dolorum ratione vero minima eos culpa, est maiores, eum laudantium quam? Beatae voluptates nemo repudiandae enim rerum labore molestiae voluptatem repellendus veniam corporis dicta ipsam vitae, dolorem excepturi dolorum, sunt unde maiores, qui cumque culpa obcaecati non? Eos saepe, perferendis totam facilis vel vero quidem voluptas.",
    state : "Mazowieckie",
    location: "Warszawa"
  }




	$scope.states = ['Mazowieckie', 'Dolnośląskie', 'Kujawsko-pomorskie', 'Lubelskie', 'Lubuskie' , 'Łódzkie', 'Małopolskie', 'Opolskie', 'Podkarpackie', 'Podlaskie', 'Pomorskie', 'Śląskie', 'Świętokrzyskie', 'Warmińsko-mazurskie', 'Wielkopolskie', 'Zachodniopomorskie']


	$scope.addNewJam = function(){
        $http.post('add/newJam', $scope.jam).success(function(data){
        	$scope.success = data;
        	$scope.errors = ''
          $scope.jam = ''
        }).error(function(errors){
          	$scope.errors = errors;
          	$scope.success = ''
        })
	}

});