var app = angular.module('app', ['userProfileModule',
 								 'ui.bootstrap' , 
 								 'myProfileModule', 
 								 'mainPageModule', 
 								 'textAngular', 
 								 'jamModule',
 								 'jamsModule', 
 								 'addJamModule', 
 								 'naviModule', 
 								 'ngRoute', 
 								 'authModule', 
 								 'serwiski', 
 								 'dyrektywki', 
 								 'ngAnimate',
 								 'filters'
 								 ]).run(function($rootScope, $http, $location) {

	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.admin = false;
    	$rootScope.current_user = '';
	};



	$rootScope.isUserLogin = function(){
		$http.get('user/getLoginUser').success(function(data){
			console.log('zalogowany')
			$rootScope.authenticated = true;
	    	$rootScope.admin = data.admin;
	    	$rootScope.current_user = data.username;
		}).error(function(data){
			$rootScope.signout()
			$rootScope.authenticated = false;
    		$rootScope.admin = false;
    		$rootScope.current_user = '';
        });
	}

	$rootScope.isUserLogin()




});
	


app.config(function($routeProvider, $httpProvider){

	$routeProvider.otherwise({
        redirectTo: '/jamsList'
    });

	$routeProvider.when('/jamsList', {
			templateUrl: 'parts/user/jamsList.html',
			controller: 'jamsListCtrl'
	})
	
	$routeProvider.when('/jam/:id', {
		templateUrl: 'parts/user/jam.html',
		controller: 'jamCtrl'
	});

	$routeProvider.when('/myProfile', {
		templateUrl: 'parts/user/myProfile.html',
		controller: 'myProfileCtrl'
	});

	$routeProvider.when('/userProfile/:username', {
		templateUrl: 'parts/user/userProfile.html',
		controller: 'userProfileCtrl'
	});

	$routeProvider.when('/mainPage', {
		templateUrl: 'parts/user/mainPage.html',
		controller: 'mainPageCtrl'
	});

	$routeProvider.when('/login', {
			templateUrl: 'parts/user/login.html',
			controller: 'authController'
		})

	$routeProvider.when('/register', {
			templateUrl: 'parts/user/register.html',
			controller: 'authController'
		});

	// Admin Routes

	$routeProvider.when('/addJam', {
		templateUrl: 'parts/user/addJam.html',
		controller: 'addJamCtrl'
	});

});


