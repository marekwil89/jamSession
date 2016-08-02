var app = angular.module('app', ['userProfileModule',
								 'user',
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
								 'underscore',
								 'adminUserListModule',
								 'adminJamsListModule'
								 ]).run(function($rootScope, $http, $location, $interval) {


	$rootScope.notifyLength = 0

	$rootScope.getNotificationLength = function(){
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
		});
	}

	$rootScope.getNotificationLength()
	$rootScope.isUserLogin()

});
	


app.config(function($routeProvider, $httpProvider){

	$routeProvider.otherwise({
		redirectTo: '/mainPage'
	});

	$routeProvider.when('/jamsList', {
			templateUrl: 'app/user_components/jams/jamsList.html',
			controller: 'jamsListCtrl'
	})
	
	$routeProvider.when('/jam/:id', {
		templateUrl: 'app/user_components/jam/jam.html',
		controller: 'jamCtrl'
	});

	$routeProvider.when('/myProfile', {
		templateUrl: 'app/user_components/my-profile/myProfile.html',
		controller: 'myProfileCtrl'
	});

	$routeProvider.when('/myProfileEdit', {
		templateUrl: 'app/user_components/my-profile/myProfileEdit.html',
		controller: 'myProfileCtrl'
	});

	$routeProvider.when('/myNotifications', {
		templateUrl: 'app/user_components/my-notifications/myNotifications.html',
		controller: 'myNotificationsCtrl'
	});


	$routeProvider.when('/editJam/:id', {
		templateUrl: 'app/user_components/edit-jam/editJam.html',
		controller: 'editJamCtrl'
	});

	$routeProvider.when('/userProfile/:username', {
		templateUrl: 'app/user_components/user-profile/userProfile.html',
		controller: 'userProfileCtrl'
	});

	$routeProvider.when('/mainPage', {
		templateUrl: 'app/user_components/main-page/mainPage.html',
		controller: 'mainPageCtrl'
	});

	$routeProvider.when('/login', {
			templateUrl: 'app/user_components/auth/login.html',
			controller: 'authController'
		})

	$routeProvider.when('/register', {
			templateUrl: 'app/user_components/auth/register.html',
			controller: 'authController'
		});

	$routeProvider.when('/addJam', {
		templateUrl: 'app/user_components/add-jam/addJam.html',
		controller: 'addJamCtrl'
	});

	//admin


	$routeProvider.when('/adminUserList', {
		templateUrl: 'app/admin_components/admin-user-list/adminUserList.html',
		controller: 'adminUserListCtrl'
	});

	$routeProvider.when('/adminJamsList', {
		templateUrl: 'app/admin_components/admin-jams-list/adminJamsList.html',
		controller: 'adminJamsListCtrl'
	});

});


