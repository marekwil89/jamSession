var filters = angular.module('filters', []);


filters.filter('startFrom', function(){
	return function(data, start){
		return data.slice(start);
	}
})


filters.filter('startFrom', function(){
	return function(data, start){
		return data.slice(start);
	}
})