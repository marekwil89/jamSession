angular.module('jamModule', []).controller('jamCtrl', function($scope, $http, $rootScope, $routeParams, $anchorScroll, $location){




var getJamInfo = function(){
    $http.get( 'jam/getJamInfo/' + $routeParams.id ).success( function( data ){        
        $scope.jam = data;
    })     
}

// var guestsRateData = function(){
//   $http.get('jam/guestsRateData/' + $routeParams.id).success(function(){
//   }).error(function(data){
//     $scope.likeError = data
//   })
// }


getJamInfo()
// guestsRateData()


$scope.addGuestToJam = function(){
    $http.post('add/guestToJam/' + $routeParams.id).success(function(data){
        getJamInfo()
    })
}

$scope.guestLoseJam = function(){
    $http.put('jam/guestLoseJam/' + $routeParams.id).success(function(data){
        getJamInfo()
    })
}

$scope.deleteGuestFromJam = function(){
    $http.put('jam/deleteGuestFromJam/' + $routeParams.id).success(function(data){
        getJamInfo()
    })
}

$scope.newMessage = function(){

    $http.post('add/newMessage/' + $routeParams.id, $scope.message).success(function(data){
        getJamInfo()
    }).error(function(data){
        $scope.errors = data
    })
}


$scope.likeJam = function(){


    $http.post('add/likeJam/' + $routeParams.id).success(function(){
        getJamInfo()
    }).error(function(data){
        getJamInfo()
        $scope.likeError = data
    })
}




});