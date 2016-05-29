angular.module('jamModule', []).controller('jamCtrl', function($scope, $http, $rootScope, $routeParams, $anchorScroll, $location){

	//get single jam information

	var getJamInfo = function(){
		$http.get( 'get/getJamInfo/' + $routeParams.id ).success( function( data ){        
			$scope.jam = data;
		})     
	}

	getJamInfo()


	//notify about guest added

	var addGuestNotify = function(){

		var newNotify = {
			username: $rootScope.current_user,
			org : $scope.jam.org.username,
			title : $scope.jam.title,
			jamId : $scope.jam._id
		} 

		$http.post('add/guestNotify', newNotify).success(function(data){
			console.log('notify added')
		})
	}


	//add guest to jam function

	$scope.addGuestToJam = function(){
		$http.post('add/guestToJam/' + $routeParams.id).success(function(data){
			getJamInfo()
			addGuestNotify()
		}).error(function(data){
			$scope.addError = data
		})
	}


	//notify about guest remove

	var removeGuestNotify = function(){

		var newNotify = {
			username: $rootScope.current_user,
			org : $scope.jam.org.username,
			title : $scope.jam.title,
			jamId : $scope.jam._id
		} 

		$http.post('add/removeGuestNotify', newNotify).success(function(data){
			console.log('notify added')
		})
	}


	//guest lose the jam function

	$scope.guestLoseJam = function(){
		$http.put('put/guestLoseJam/' + $routeParams.id).success(function(data){
			getJamInfo()
			removeGuestNotify()
		}).error(function(data){
			$scope.loseError = data
		})
	}


	//someone like your jam notify

	var addLikeNotify = function(){

		var newNotify = {
			username: $rootScope.current_user,
			org : $scope.jam.org.username,
			title : $scope.jam.title,
			jamId : $scope.jam._id
		} 

		$http.post('add/likeNotify', newNotify).success(function(data){
			console.log('notify added')
		})
	}


	//someone like your jamfunction

	$scope.likeJam = function(){
		
		$http.post('add/likeJam/' + $routeParams.id).success(function(){
			getJamInfo()
			addLikeNotify()
		}).error(function(data){
			getJamInfo()
			$scope.likeError = data
		})
	}


	//comment add function

	$scope.newMessage = function(){
		$http.post('add/newMessage/' + $routeParams.id, $scope.message).success(function(data){
			getJamInfo()
			$scope.message.text = ''
		}).error(function(data){
			$scope.errors = data
		})
	}





});



