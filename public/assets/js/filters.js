var filters = angular.module('filters', []);

//Filter to make shorter email ('dupa@wp.pl' for 'dupa')

filters.filter('shortenEmail', function() {
	return function(input) {
		if(input){
			var email = input
			var shortEmail = email.substring(0, email.lastIndexOf("@"));
			return shortEmail			
		}

	};
});
