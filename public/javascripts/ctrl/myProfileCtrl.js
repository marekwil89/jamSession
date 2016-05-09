angular.module('myProfileModule', []).controller('myProfileCtrl', function($scope, $http, $rootScope, $location, $routeParams, $timeout){

    var redirectLogOut = function(){
        if($rootScope.authenticated == false && !$rootScope.current_user){
            $location.path('/mainPage')
        }
    }

    redirectLogOut()



    $scope.editProfile = false

    $scope.stats = ['chce iść',  'zakceptowany', 'odrzucony'];

    $scope.options1 = {
        country: 'pl',
        types: '(cities)'
    };
    $scope.details1 = '';
    $scope.roles = ['Main Guitar', 'Vocal', 'Percussion', 'Bass'];



    // $rootScope.shortenEmail = function(userEmail){
    //     var email = userEmail
    //     var login = email.substring(0, email.lastIndexOf("@"));
    //     var loginIsLength = login.length
    //     return loginIsLength
    // }



	var getMyProfileInfo = function(){
        $http.get( 'get/getMyProfileInfo').success( function( data ){        
            $scope.myProfileInfo = data;

            // $rootScope.limit = $rootScope.shortenEmail($scope.myProfileInfo.username)

        }).error(function(errors){
            $scope.errors = errors
        })
    }




    var getMyProfileJams = function(){
    	$http.get('get/getMyProfileJams').success(function(data){
    		$scope.myProfileJams = data    	
    	})
    }

    var getUserSignJams = function(){
        $http.get('get/getUserSignJams').success(function(data){
            $scope.myProfileSignJams = data
        })
    }

    $scope.deleteJam = function(id){
        if( !confirm('Czy napewno chcesz usunąć jam ?'))
            return false;
        var jam = {
            id : id
        }
        $http.put('put/deleteJam', jam).success(function(data){
            getMyProfileJams()
        })
    }




    $scope.changeProfileDetails = function(){

        if($scope.editProfile == false)
        {
            return $scope.editProfile = true
        }
        return $scope.editProfile = false
    }


    $scope.updateProfile = function(myProfileInfo){

        var updatedProfile = {
            id : myProfileInfo._id,
            role : myProfileInfo.role,
            adress : myProfileInfo.adress,
            phone : myProfileInfo.phone
        }

        $http.put('put/updateProfile', updatedProfile).success(function(data){
            getMyProfileInfo()
            $scope.editProfile = false;
            $scope.errors = ''
        }).error(function(data){
            $scope.errors = data
            $scope.editProfile = true
        })
    }

    $scope.changeGuestStatus = function(newStatus, guestId, jamId){

        var guest = {
            status: newStatus,
            guestId: guestId,
            jamId: jamId
        }
    	$http.put('put/changeGuestStatus', guest).success(function(data){
            getMyProfileInfo()
            getMyProfileJams() 
    	})
    }
    getUserSignJams()
    getMyProfileInfo()
    getMyProfileJams()
});

