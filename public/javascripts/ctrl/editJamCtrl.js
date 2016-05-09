angular.module('editJamModule', []).controller('editJamCtrl', function($scope, $http, $rootScope, $routeParams, $location){



    var redirectLogOut = function(){
        if($rootScope.authenticated == false && !$rootScope.current_user){
            $location.path('/mainPage')
        }
    }

    redirectLogOut()

    var getJamInfo = function(){
        $http.get( 'get/getJamInfo/' + $routeParams.id ).success( function( data ){        
            $scope.jam = data;
            $scope.date = new Date($scope.jam.date)
        })     
    }

    getJamInfo()

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



    $scope.states = ['Mazowieckie', 'Dolnośląskie', 'Kujawsko-pomorskie', 'Lubelskie', 'Lubuskie' , 'Łódzkie', 'Małopolskie', 'Opolskie', 'Podkarpackie', 'Podlaskie', 'Pomorskie', 'Śląskie', 'Świętokrzyskie', 'Warmińsko-mazurskie', 'Wielkopolskie', 'Zachodniopomorskie']





    $scope.updateJam = function(){
    	var updatedJam = {
    		id: $scope.jam._id,
    		title: $scope.jam.title,
    		descr: $scope.jam.descr,
    		date: $scope.date,
    		state: $scope.jam.state,
    		location: $scope.jam.location
    	}

        $http.put('put/updateJam', updatedJam).success(function(data){
        	$scope.success = data;
        	$scope.errors = ''
        }).error(function(errors){
          	$scope.errors = errors;
          	$scope.success = ''
        })
    }





});
