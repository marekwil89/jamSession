angular.module('naviModule', []).controller('navigation', function($scope, $http, $location, $rootScope){



    $scope.isActive = function(sciezka){
        return $location.path() === sciezka;
    };

})

