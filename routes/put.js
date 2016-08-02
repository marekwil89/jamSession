
var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var _ = require('underscore');
var User = mongoose.model('User');
var Jam = mongoose.model('Jam');
var valid = require('./validation.js');


router.use('/guestLoseJam/:id', valid.isUserLogin);
router.use('/guestLoseJam/:id', valid.checkDate);

router.use('/deleteJam', valid.isUserLogin);
router.use('/changeGuestStatus', valid.isUserLogin);

router.use('/updateProfile', valid.isUserLogin);
router.use('/updateProfile', valid.checkAdressLength)
router.use('/updateProfile', valid.checkPhoneIsNumber)
router.use('/updateProfile', valid.checkPhoneLength)

router.use('/updateJam', valid.isUserLogin);
router.use('/updateJam', valid.checkEmptyJam);
router.use('/updateJam', valid.checkDescrLength);
router.use('/updateJam', valid.checkLocationLength);
router.use('/updateJam', valid.checkDate);

router.use('/deleteUser', valid.isAdmin);
router.use('/deleteUser', valid.isUserLogin);




router.route('/updateJam').put(function(req, res){

	Jam.findOne({ _id: req.body.id }, function (err, jam){
		jam.descr = req.body.descr;
		jam.date = req.body.date;
		jam.state = req.body.state;
		jam.location = req.body.location;
		jam.save(function(err){
			if(err){
				console.log(err)
			}
			return res.status(200).send('Edycja zakończona, nastąpi przekierowanie ...')
		});			
		
	});			
})


router.route('/setNotifiyFalse').put(function(req, res){

 	User.update({'notifications._id': req.body.id},
      {'$set': {
             'notifications.$.read': req.body.read,
	   }},
          function(err,user) {
	   	if(err){
        	console.log(err);
        	return res.send(err);
        }
        return res.status(200).send(user);
 	});

})

router.route('/updateProfile').put(function(req, res){

	User.findOne({ _id: req.body.id }, function (err, user){
		user.role = req.body.role;
		user.adress = req.body.adress;
		user.phone = req.body.phone;
		user.save(function(err){
			if(err){
				console.log(err)
			}
			return res.status(200).send('Edycja zakończona');
		});
	});

})

router.route('/deleteJam').put(function(req, res){

	Jam.findByIdAndRemove(req.body.id, function(err, jam){
		return res.status(200).send('Usunięto')
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


router.route('/guestLoseJam/:id').put(function(req, res){

  	Jam.findByIdAndUpdate(req.params.id,{ $pull: { 'guests': {  username: req.user.username } } },function(err, jam){
		if(err){
			console.log(err);
		}
		
		return res.status(200).send(jam)
	});

})


router.route('/deleteUser').put(function(req, res){

	User.findByIdAndRemove(req.body.id, function(err, user){
		return res.status(200).send('Usunięto')
	})

})


// router.route('/deleteGuestFromJam/:id').put(function(req, res){

//   	Jam.findByIdAndUpdate(req.params.id,{ $pull: { 'guests': {  username: req.user.username } } },function(err, jam){
// 		if(err){
// 			console.log(err);
// 		}
		
// 		return res.status(200).send(jam)
// 	});


// })

module.exports = router;