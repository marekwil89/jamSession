angular.module('myProfileModule', []).controller('myProfileCtrl', function($scope, $http, $rootScope, $location, $routeParams, $timeout, redirect){

	//redirect to main page if logout

	redirect.ifLogout($rootScope.authenticated, $rootScope.current_user)

	//options
	$scope.showGuests = false
	$scope.toggleGuestsList = function(){

	}

	
	// $scope.editProfile = false
	$scope.stats = ['Bierze udzial', 'Odrzucony'];
	$scope.options1 = {
		country: 'pl',
		types: '(cities)'
	};
	// $scope.details1 = '';
	$scope.roles = ['Main Guitar', 'Vocal', 'Percussion', 'Bass'];


	//get my profie information

	var getMyProfileInfo = function(){
		$http.get( 'get/getMyProfileInfo').success( function( data ){        
			$scope.myProfileInfo = data;
		})
	}

	getMyProfileInfo()


	//get my created jams

	var getMyCreatedJams = function(){
		$http.get('get/getMyProfileJams').success(function(data){
			$scope.myCreatedJams = data    	
		})
	}

	getMyCreatedJams()


	//get my sign up jams

	var getUserSignJams = function(){
		$http.get('get/getUserSignJams').success(function(data){
			$scope.mySignJams = data
		})
	}

	getUserSignJams()



	//delete your own jam

	$scope.deleteJam = function(id){
		if( !confirm('Czy napewno chcesz usunąć jam ?'))
			return false;
		var jam = {
			id : id
		}
		$http.put('put/deleteJam', jam).success(function(data){
			getMyCreatedJams()
		})
	}


	//open inputs modal

	$scope.editProfile = false

	$scope.changeProfileDetails = function(){

		if($scope.editProfile == false)
		{
			return $scope.editProfile = true
		}
		return $scope.editProfile = false
	}



	//updated profile

	$scope.updateProfile = function(myProfileInfo){

		var updatedProfile = {
			id : myProfileInfo._id,
			role : myProfileInfo.role,
			adress : myProfileInfo.adress,
			phone : myProfileInfo.phone
		}

		$http.put('put/updateProfile', updatedProfile).success(function(data){
			getMyProfileInfo()
			$scope.errors = ''
			$scope.editProfile = false;
		}).error(function(data){
			$scope.errors = data
		})
	}

	//change guest status to 'odrzucony' or 'bierze udział'

	$scope.changeGuestStatus = function(newStatus, guestId, jamId){

		var guest = {
			status: newStatus,
			guestId: guestId,
			jamId: jamId
		}
		$http.put('put/changeGuestStatus', guest).success(function(data){
			getMyProfileInfo()
			getMyCreatedJams() 
		})
	}



});

