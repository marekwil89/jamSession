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
								 'ui.bootstrap.datetimepicker',
								 'footerDire',
								 'navigationDire',
								 'authService',
								 'underscore'
								 ]).run(function($rootScope, $http, $location, $interval) {


	$rootScope.notifyLength = 0

	var getNotificationLength = function(){
			$interval(function(){
				$http.get( 'get/notificationLength' ).success( function( data ){  
					console.log(data)      
					$rootScope.notifyLength = data.length
				})
			}, 15000)
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

	getNotificationLength()		

	$rootScope.isUserLogin()

});
	


app.config(function($routeProvider, $httpProvider){

	$routeProvider.otherwise({
		redirectTo: '/mainPage'
	});

	$routeProvider.when('/jamsList', {
			templateUrl: 'app/components/jams/jamsList.html',
			controller: 'jamsListCtrl'
	})
	
	$routeProvider.when('/jam/:id', {
		templateUrl: 'app/components/jam/jam.html',
		controller: 'jamCtrl'
	});

	$routeProvider.when('/myProfile', {
		templateUrl: 'app/components/my-profile/myProfile.html',
		controller: 'myProfileCtrl'
	});

	$routeProvider.when('/myNotifications', {
		templateUrl: 'app/components/my-notifications/myNotifications.html',
		controller: 'myNotificationsCtrl'
	});


	$routeProvider.when('/editJam/:id', {
		templateUrl: 'app/components/edit-jam/editJam.html',
		controller: 'editJamCtrl'
	});

	$routeProvider.when('/userProfile/:username', {
		templateUrl: 'app/components/user-profile/userProfile.html',
		controller: 'userProfileCtrl'
	});

	$routeProvider.when('/mainPage', {
		templateUrl: 'app/components/main-page/mainPage.html',
		controller: 'mainPageCtrl'
	});

	$routeProvider.when('/login', {
			templateUrl: 'app/components/auth/login.html',
			controller: 'authController'
		})

	$routeProvider.when('/register', {
			templateUrl: 'app/components/auth/register.html',
			controller: 'authController'
		});

	$routeProvider.when('/addJam', {
		templateUrl: 'app/components/add-jam/addJam.html',
		controller: 'addJamCtrl'
	});

});


