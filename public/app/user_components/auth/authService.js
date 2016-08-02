angular.module('authService', [])



.service('verify', function(_){

	this.login = function(user){

		if(_.isEmpty(user) == true || !user.username || !user.password)
		{
			return 'Uzupełnij wszystkie pola'
		}
	}


	this.register = function(user){

		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(_.isEmpty(user) == true || !user.username || !user.password || !user.repeatPass)
		{
			return 'Uzupełnij wszystkie pola'
		}
		if(re.test(user.username) == false)
		{
			return 'Nieprawidłowy format email'
		}
		if(user.username.length > 30 || user.username.length < 5 || user.password.length > 30 || user.password.length < 5)
		{
			return 'Pole email i hasło musi zawierać od 5 do 30 znaków'
		}
		if(user.password != user.repeatPass)
		{
			return 'Hasła nie są zgodne'
		}
	};   
});