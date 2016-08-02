angular.module('adminUserListModule', []).controller('adminUserListCtrl', function($scope, $http, $rootScope, redirect){

	redirect.ifLogout($rootScope.authenticated, $rootScope.current_user)

	redirect.ifNotAdmin($rootScope.admin)

	var getUserList = function(){
		$http.get('get/usersList').success(function(data){
			$scope.users = data;
		})
	}

	getUserList();

	$scope.deleteUser = function(id){
		if( !confirm('Czy napewno chcesz usunąć Użytkownika ?'))
			return false;
		var user = {
			id : id
		}
		$http.put('put/deleteUser', user).success(function(data){
			getUserList()
		})
	}

});