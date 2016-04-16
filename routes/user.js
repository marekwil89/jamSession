
var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var _ = require('underscore');
var User = mongoose.model('User');
var Jam = mongoose.model('Jam');


function isUserLogin(req, res, next){
	if(_.isEmpty(req.user) || !req.user )
	{
		console.log('Nie jesteś zalogowany')
		return res.status(500).send('Nie jesteś zalogowany')
	}
	next()
}


router.use('/getMyProfileInfo', isUserLogin);
router.use('/getMyProfileJams', isUserLogin);
router.use('/getUserSignJams', isUserLogin);
router.use('/changeBandRole', isUserLogin);
router.use('/deleteJam', isUserLogin);

router.route('/getMyProfileInfo').get(function(req, res){
	User.findOne({_id: req.user._id}, function(err, user){
		if(err){
			console.log(err)
		}
		return res.status(200).send(user)
	})
})


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

router.route('/getMyProfileJams').get(function(req, res){
	Jam.find({'org._id': req.user._id}, function(err, userJams){
		if(err){
			console.log(err)
		}
		console.log(userJams)
		return res.status(200).send(userJams)
	})
})


router.route('/getUserSignJams').get(function(req, res){
	Jam.find({'guests.username' : req.user.username }, function(err, signJams){
		return res.status(200).send(signJams)
	})
})



router.route('/getProfileInfo/:username').get(function(req, res){
	User.findOne({username: req.params.username}, function(err, userProfile){
		return res.status(200).send(userProfile)
	})
})


router.route('/deleteJam').put(function(req, res){
	console.log(req.body)
	Jam.findByIdAndRemove(req.body.id, function(err, jam){
		return res.status(200).send(jam)
	})

})

router.route('/changeGuestStatus').put(function(req, res){
	Jam.update({'guests._id': req.body.guestId},
      {'$set': {
             'guests.$.status': req.body.status,
	   }},
          function(err,jam) {
	   	if(err){
        	console.log(err);
        	return res.send(err);
        }
        return res.status(200).send(jam);
 	});
})


router.route('/updateProfile').put(function(req, res){
	User.findOne({ _id: req.body.id }, function (err, user){
		user.role = req.body.role;
		user.adress = req.body.adress;
		user.phone = req.body.phone;
		user.save();
		return res.status(200).send(user);
	});
})

module.exports = router;