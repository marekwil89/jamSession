var express = require('express');
var router = express.Router();

module.exports = function(passport){

	//sends successful login state back to angular
	router.get('/success', function(req, res){
		res.send({state: 'success', user: req.user ? req.user : null, message: "Success"});
	});

	// sends failure login state back to angular
	router.get('/failure', function(req, res){
		res.send({state: 'failure', user: null, message: "Zły login lub hasło"});
	});

	router.get('/signupFail', function(req, res, message){
		res.send({state: 'failure', user: null, message: "Ten email jest już używany"});
	});

	//log in
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/failure'
	}));

	//sign up
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/signupFail'
	}));

	//log out
	router.get('/signout', function(req, res) {
		req.session.destroy();
		req.logout()
		req.logOut()
		// req.user.admin = false;

	});

	return router;

}



