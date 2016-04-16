angular.module('authModule', []).controller('authController', function($scope, $http, $rootScope, $location){
	$scope.options1 = {
    	country: 'pl',
    	types: '(cities)'
    };
    $scope.details1 = '';
	$scope.roles = ['Main Guitar', 'Vocal', 'Percussion', 'Bass'];
	$scope.error_message = '';

	$scope.user = {
		username : 'raven8912@gmail.com',
		password : 'manta123'
	}





	$scope.login = function(){

		if(userEmpty() == true)
		{
			return $scope.errors = 'Pole email i hasło jest wymagane'
		}
		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.state == 'success'){


				$rootScope.authenticated = true;


				$rootScope.admin = data.user.admin;
	

				$rootScope.current_user =  data.user.username;
				$location.path('/myProfile');
			}
			else{
				$scope.errors = data.message;
			}
		});
	};




	$scope.register = function(){


		if(userEmpty() == true)
		{
			return $scope.errors = 'Pole email i hasło jest wymagane'
		}

		if(userLength() == true)
		{
			return $scope.errors = 'Pole email i hasło musi zawierać od 5 do 30 znaków'
		}

		if(userEmail() == false)
		{
			return $scope.errors = 'To nie jest email'
		}

		if(passEqual() == true)
		{
			return $scope.errors = 'hasła nie są zgodne, spróbuj jeszcze raz'
		}
		


		$http.post('/auth/signup', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.admin = data.user.admin;
				$rootScope.adress = data.user.adress;
				$rootScope.current_user = data.user.username;
				$location.path('/');
			}
			else{
				$scope.errors = data.message;
			}
		});			
	

	};




	var userEmpty = function(){
		if(!$scope.user.username || !$scope.user.password)
		{
			return true
		}
	}

	var userEmail = function(){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test($scope.user.username)
	}

	var userLength = function(){
		if($scope.user.username.length >= 30 || $scope.user.username.length <= 5 || $scope.user.password.length >= 30 || $scope.user.password.length <= 5)
		{
			return true
		}
	}

	var passEqual = function(){
		if($scope.user.password != $scope.repeatPass)
		{
			return true
		}


	}


});


