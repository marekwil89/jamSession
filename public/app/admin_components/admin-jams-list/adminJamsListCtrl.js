angular.module('adminJamsListModule', []).controller('adminJamsListCtrl', function($scope, $http, $rootScope, redirect){

	redirect.ifLogout($rootScope.authenticated, $rootScope.current_user)

	redirect.ifNotAdmin($rootScope.admin)

	var getJamsList = function(){
		$http.get('get/allJams').success(function(data){
			$scope.allJams = data;
		})
	}

	getJamsList();

	$scope.deleteJam = function(id){
		if( !confirm('Czy napewno chcesz usunąć Jam ?'))
			return false;

		var jam = {
			id : id
		}

		$http.put('put/deleteJam', jam).success(function(data){
			getJamsList()
		})
	}

});