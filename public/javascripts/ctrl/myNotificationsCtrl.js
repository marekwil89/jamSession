angular.module('myNotificationsModule', []).controller('myNotificationsCtrl', function($scope, $http, $rootScope){

    var redirectLogOut = function(){
        if($rootScope.authenticated == false && !$rootScope.current_user){
            $location.path('/mainPage')
        }
    }

    redirectLogOut()


    var getNotificationLength = function(){

            $http.get( 'get/notificationLength' ).success( function( data ){  
                    console.log(data)      
                    $rootScope.notifyLength = data.length

            })
    }

    getNotificationLength()

	$scope.setNotifyFalse = function(id, read){

        var notify = {
            id : id,
            read : read
        }

		$http.put( 'put/setNotifiyFalse', notify ).success(function(data){
            getAllNotifications()
            getNotificationLength()
		})
	}


    var getAllNotifications = function(){
        $http.get( 'get/allNotifications' ).success( function( data ){        
            $scope.notifications = data
        })     
    }


    getAllNotifications()

	
});

