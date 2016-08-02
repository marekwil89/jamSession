var filters = angular.module('filters', []);

//Filter to make shorter email ('user@wp.pl' for 'user')

filters.filter('shortenEmail', function() {
	return function(email) {
		if(email){
			return shortEmail = email.substring(0, email.lastIndexOf("@"));		
		}

	};
});
