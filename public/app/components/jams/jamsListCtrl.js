angular.module('jamsModule', []).controller('jamsListCtrl', function($scope, $http){

	//get list of all jams

	var getJamsList = function(){
		$http.get('get/getJamsList').success(function(data){
			$scope.jams = data;
		})
	}

	getJamsList();


});