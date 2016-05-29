angular.module('authModule', []).controller('authController', function($scope, $http, $rootScope, $location, verify){


	//fill all register and login inputs on run == delete it later

	// $scope.user = {
	// 	username : 'przykładowy@mail.com',
	// 	password : 'manta123',
	// 	repeatPass: 'manta123'
	// }




	$scope.register = function(){

		// var notPass = verify.isEmpty($scope.user)

		var notPass = verify.register($scope.user)

		if(notPass)
		{
			return $scope.errors = notPass
		}	

		$http.post('/auth/signup', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.admin = data.user.admin;
				$rootScope.adress = data.user.adress;
				$rootScope.current_user = data.user.username;
				$location.path('/');
				$rootScope.limit = shortenEmail($rootScope.current_user);
			}
			else{
				console.log(data)
				$scope.errors = data.message;
			}
		});			
		

	};



	$scope.login = function(){

		var notPass = verify.login($scope.user)

		if(notPass)
		{
			return $scope.errors = notPass
		}	

		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.admin = data.user.admin;
				$rootScope.current_user =  data.user.username;
				$location.path('/');

			}
			else{
				$scope.errors = data.message;
			}
		});
	};



});



