angular.module('userProfileModule', []).controller('userProfileCtrl', function($scope, $http, $rootScope, $routeParams){



    var getProfileInfo = function(){
        $http.get('get/getProfileInfo/' + $routeParams.username).success(function(data){
                $scope.userProfile = data;
            })        
    } 

    getProfileInfo()



});

