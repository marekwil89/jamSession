angular.module('myNotificationsModule', []).controller('myNotificationsCtrl', function($scope, $http, $rootScope, $location, redirect){

	//redirect to main page if logout

	redirect.ifLogout($rootScope.authenticated, $rootScope.current_user)


	//get list of all unreaded notifications

	var getAllNotifications = function(){
		$http.get( 'get/allNotifications' ).success( function( data ){        
			$scope.notifications = data
		})     
	}


	getAllNotifications()


	//get notifications length function 

	var getNotificationLength = function(){

		$http.get( 'get/notificationLength' ).success( function( data ){  
			console.log(data)      
			$rootScope.notifyLength = data.length

		})
	}

	getNotificationLength()


	//button to delete notification

	$scope.setNotifyFalse = function(id, read){

		read = true

		var notify = {
			id : id,
			read : read
		}

		$http.put( 'put/setNotifiyFalse', notify ).success(function(data){
			getAllNotifications()
			getNotificationLength()
		})
	}



	
});

