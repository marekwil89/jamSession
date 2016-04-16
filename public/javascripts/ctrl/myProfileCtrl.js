angular.module('myProfileModule', []).controller('myProfileCtrl', function($scope, $http, $rootScope, $location, $routeParams, $anchorScroll){




    $scope.stats = ['chce iść', 'zrezygnował', 'zakceptowany', 'odrzucony'];

	var getMyProfileInfo = function(){
        $http.get( 'user/getMyProfileInfo').success( function( data ){        
            $scope.myProfileInfo = data;
        })     
    }

    var getMyProfileJams = function(){
    	$http.get('user/getMyProfileJams').success(function(data){
    		$scope.myProfileJams = data    	
    	})
    }

    var getUserSignJams = function(){
        $http.get('user/getUserSignJams').success(function(data){
            $scope.myProfileSignJams = data
        })
    }

    $scope.deleteJam = function(id){
        console.log(id)
        var jam = {
            id : id
        }
        $http.put('user/deleteJam', jam).success(function(data){
  
        })
    }


    $scope.options1 = {
        country: 'pl',
        types: '(cities)'
    };
    $scope.details1 = '';
    $scope.roles = ['Main Guitar', 'Vocal', 'Percussion', 'Bass'];

    $scope.editProfile = false

    $scope.changeProfileDetails = function(){

        if($scope.editProfile == false)
        {
            return $scope.editProfile = true
        }
        return $scope.editProfile = false
    }


    $scope.updateProfile = function(myProfileInfo){

        var changes = {
            id : myProfileInfo._id,
            role : myProfileInfo.role,
            adress : myProfileInfo.adress,
            phone : myProfileInfo.phone
        }

        $http.put('user/updateProfile', changes).success(function(data){
            getMyProfileInfo()
            $scope.editProfile = false;
        }).
        error(function(data){

        })
    }

    $scope.changeGuestStatus = function(newStatus, guestId, jamId){

        var guest = {
            status: newStatus,
            guestId: guestId,
            jamId: jamId
        }
    	$http.put('user/changeGuestStatus', guest).success(function(data){
            getMyProfileInfo()
            getMyProfileJams() 
    	})
    }
    getUserSignJams()
    getMyProfileInfo()
    getMyProfileJams()
});

