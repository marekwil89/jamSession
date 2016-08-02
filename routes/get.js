var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var _ = require('underscore');
var Jam = mongoose.model('Jam');
var User = mongoose.model('User');
var valid = require('./validation.js');



//admin

router.use('/usersList', valid.isAdmin)

//user

router.use('/guestsRateData/:id', valid.isUserLogin);
router.use('/getMyProfileInfo', valid.isUserLogin);
router.use('/getMyProfileJams', valid.isUserLogin);
router.use('/getUserSignJams', valid.isUserLogin);
router.use('/allNotifications', valid.isUserLogin);
router.use('/notificationLength', valid.isUserLogin);


router.route('/usersList').get(function(req, res){

	User.find({}, function(err, users){
		return res.status(200).send(users)
	})

})

router.route('/getLoginUser').get(function(req, res){
	if(_.isEmpty(req.user))
	{
		return res.status(500).send('nie zalogowany USER')
	}

	return res.status(200).send(req.user)

})

router.route('/getProfileInfo/:username').get(function(req, res){
	User.findOne({username: req.params.username}, function(err, userProfile){
		return res.status(200).send(userProfile)
	})
})

router.route('/getMyProfileInfo').get(function(req, res){
	User.findOne({_id: req.user._id}, function(err, user){
		if(err){
			console.log(err)
		}
		return res.status(200).send(user)
	})
})


router.route('/getJamsList').get(function(req, res){
	var today = new Date();
	today.setDate(today.getDate())

	Jam.find({ date: {$gte:today}}, function(err, jams){
		return res.status(200).send(jams)
	})

})


router.route('/allNotifications').get(function(req, res){
	User.findOne({_id: req.user._id}, function(err, user){
		var notifications = _.where(user.notifications , {read: false});
		return res.status(200).send(notifications);
	})
})


router.route('/notificationLength').get(function(req, res){
	User.findOne({_id: req.user._id}, function(err, user){
		var notifications = _.where(user.notifications , {read: false});
		var notify = {
			length : notifications.length
		}

		return res.status(200).send(notify);
	})
})


router.route('/getJamInfo/:id').get(function(req, res){

	Jam.findOne({_id: req.params.id}, function(err, jam){
		if(err)
		{
			console.log(err)
		}
		return res.status(200).send(jam)
	});
})


router.route('/getLastJams').get(function(req, res){
	var today = new Date();

	var dayPlus = new Date();
	dayPlus.setDate(dayPlus.getDate()+7);

	Jam.find( { date: { $gte: today, $lt: dayPlus } }, function(err, jams){
		res.status(200).send(jams)
	});
})



router.route('/guestsRateData/:id').get(function(req, res){
	Jam.findOne({_id: req.params.id}, function(err, jam){
		if(_.findWhere(jam.guestsRate , {username: req.user.username})){
			return res.status(500).send('Oceniłeś już ten Jam')
		}
	});
});



router.route('/getMyProfileJams').get(function(req, res){
	var today = new Date()

	Jam.find({'org._id': req.user._id, date: {$gte: today}}, function(err, userJams){
		if(err){
			console.log(err)
		}
		return res.status(200).send(userJams)
	})
})

router.route('/getUserSignJams').get(function(req, res){
	var today = new Date()

	Jam.find({'guests.username' : req.user.username, date: {$gte:today} }, function(err, signJams){
		return res.status(200).send(signJams)
	})
})


//admin

router.route('/allJams').get(function(req, res){

	Jam.find({}, function(err, jams){
		return res.status(200).send(jams)
	})

})



module.exports = router;