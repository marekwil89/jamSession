var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var _ = require('underscore');
var Jam = mongoose.model('Jam');
var User = mongoose.model('User');



// function isAdmin(req, res, next){
// 	if(_.isEmpty(req.user) || !req.user)
// 	{
// 		return res.status(500).send('Nie jesteś zalgowany')
// 	}
// 	else if(req.user.admin != true || req.user.admin == false)
// 	{
// 		return res.status(500).send('Brak uprawnień')
// 	}
// 	next()

// }


function isUserLogin(req, res, next){
	if(_.isEmpty(req.user) || !req.user )
	{
		console.log('Nie jesteś zalogowany')
		return res.status(500).send('Nie jesteś zalogowany')
	}
	next()
}



router.use('/guestsRateData/:id', isUserLogin);
router.use('/getMyProfileInfo', isUserLogin);
router.use('/getMyProfileJams', isUserLogin);
router.use('/getUserSignJams', isUserLogin);
router.use('/allNotifications', isUserLogin);
router.use('/notificationLength', isUserLogin);


router.route('/getLoginUser').get(function(req, res){
	if(_.isEmpty(req.user))
	{
		return res.status(500).send('nie zalogowany USER')
	}
	else
	{
		return res.status(200).send(req.user)
	}
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





module.exports = router;