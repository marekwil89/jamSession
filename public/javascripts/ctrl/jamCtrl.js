angular.module('jamModule', []).controller('jamCtrl', function($scope, $http, $rootScope, $routeParams, $anchorScroll, $location){

    var getJamInfo = function(){
        $http.get( 'get/getJamInfo/' + $routeParams.id ).success( function( data ){        
            $scope.jam = data;
        })     
    }

    // var guestsRateData = function(){
    //   $http.get('get/guestsRateData/' + $routeParams.id).success(function(){
    //   }).error(function(data){
    //     $scope.likeError = data
    //   })
    // }


    getJamInfo()
    // guestsRateData()

/////////////////////////////////////////////////////////////////////////////////////

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


    $scope.addGuestToJam = function(){
        $http.post('add/guestToJam/' + $routeParams.id).success(function(data){
            getJamInfo()
            addGuestNotify()
        }).error(function(data){
            $scope.guestError = data
        })
    }

//////////////////////////////////////////////////////////////////////////////////////

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



    $scope.guestLoseJam = function(){
        $http.put('put/guestLoseJam/' + $routeParams.id).success(function(data){
            getJamInfo()
            removeGuestNotify()
        })
    }


//////////////////////////////////////////////////////////////////////////////////////






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

    $scope.likeJam = function(){
        
        $http.post('add/likeJam/' + $routeParams.id).success(function(){
            getJamInfo()
            addLikeNotify()
        }).error(function(data){
            getJamInfo()
            $scope.likeError = data
        })
    }



//////////////////////////////////////////////////////////////////////////////////////

    $scope.newMessage = function(){
        $http.post('add/newMessage/' + $routeParams.id, $scope.message).success(function(data){
            getJamInfo()
            $scope.message.text = ''
        }).error(function(data){
            $scope.errors = data
        })
    }





});



