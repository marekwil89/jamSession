var app = angular.module('app', ['userProfileModule',
								 'editJamModule',
 								 'ui.bootstrap' , 
 								 'myProfileModule', 
 								 'mainPageModule', 
 								 'jamModule',
 								 'jamsModule', 
 								 'addJamModule', 
 								 'naviModule', 
 								 'ngRoute', 
 								 'authModule', 
 								 'services', 
 								 'directives', 
 								 'ngAnimate',
 								 'filters',
 								 'myNotificationsModule',
 								 'ui.bootstrap.datetimepicker'
 								 ]).run(function($rootScope, $http, $location, $interval) {




 	$rootScope.notifyLength = 0

	var getNotificationLength = function(){
          	$interval(function(){
	            $http.get( 'get/notificationLength' ).success( function( data ){  
	            	console.log(data)      
	            	$rootScope.notifyLength = data.length
	        	})
          	}, 4000)
	}



	


	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.admin = false;
    	$rootScope.current_user = '';
	};



	$rootScope.isUserLogin = function(){
		$http.get('get/getLoginUser').success(function(data){
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

	getNotificationLength()



});
	


app.config(function($routeProvider, $httpProvider){

	$routeProvider.otherwise({
        redirectTo: '/mainPage'
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

	$routeProvider.when('/myNotifications', {
		templateUrl: 'parts/user/myNotifications.html',
		controller: 'myNotificationsCtrl'
	});


	$routeProvider.when('/editJam/:id', {
		templateUrl: 'parts/user/editJam.html',
		controller: 'editJamCtrl'
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


