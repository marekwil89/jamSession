var mongoose = require('mongoose');   
var User = mongoose.model('User');
var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var express = require('express');
var _ = require('underscore');
var emailRegex = require('email-regex');


module.exports = function(passport){

	
	passport.serializeUser(function(user, done) {
		console.log('serializing user:',user.username);
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			console.log('deserializing user:',user.username);
			done(err, user);
		});
	});

	passport.use('login', new LocalStrategy({
		passReqToCallback : true
	},
	function(req, username, password, done) { 
		if(_.isEmpty(username) || _.isEmpty(password))
		{
			console.log('Pole email i hasło jest wymagane')
			return done(null, false);
		}

		User.findOne({ 'username' :  username }, 
			function(err, user, req) {
				if (err){
					return done(err);
				}
				if (!user){
					return done(null, false);                 
				}

				if (!isValidPassword(user, password)){
					return done(null, false);
				}

				return done(null, user);
			}
		);
	}
	));

	
	passport.use('signup', new LocalStrategy({
		passReqToCallback : true
	},
	function(req, username, password, done) {

		if(/^[a-zA-Z]+$/.test(username) == true)
		{
			console.log('Email nie może zawierać Polskich znaków')
			return done(null, false)
		}
		if(_.isEmpty(username) || _.isEmpty(password))
		{
			console.log('Pole email i hasło jest wymagane')
			return done(null, false);
		}
		if(emailRegex().test(username) == false)
		{
			console.log('to nie jest email')
			return done(null, false)
		}

		if(username.length > 30 || username.length < 5 || password.length > 30 || password.length <5)
		{
			console.log('Pole email i hasło musi zawierać od 5 do 30 znaków')
			return done(null, false);
		}

		User.findOne({ 'username' :  username }, function(err, user) {
			if (user) {
				console.log('Ten email jest już używany')
				return done(null, false);
			}
			else {
				var newUser = new User();
				newUser.username = username;
				newUser.password = createHash(password);
				newUser.admin = false;


				newUser.save(function(err) {
					if (err){
						console.log(err);  
						throw err;  
					}
					console.log(newUser.username + ' Registration succesful');    
					return done(null, newUser);
				});
			}
		});
	})
);


var isValidPassword = function(user, password){
	return bCrypt.compareSync(password, user.password);
};
	// Generates hash
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};
