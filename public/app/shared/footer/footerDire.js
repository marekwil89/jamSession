var footerDire = angular.module('footerDire', []);

footerDire.directive('footer', function(){
	return {
		restrict : 'E',
		templateUrl: 'app/shared/footer/footer.html'
	};
});