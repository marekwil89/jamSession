var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var _ = require('underscore');
var User = mongoose.model('User');
var Jam = mongoose.model('Jam');
var valid = require('./validation.js');

router.use('/newJam', valid.isUserLogin);
router.use('/newJam', valid.checkEmptyJam);
router.use('/newJam', valid.checkTitleLength);
router.use('/newJam', valid.checkDescrLength);
router.use('/newJam', valid.checkLocationLength);
router.use('/newJam', valid.checkDate);

router.use('/likeJam', valid.isUserLogin);
router.use('/guestToJam/:id', valid.isUserLogin);
router.use('/guestToJam/:id', valid.checkDate);

router.use('/newMessage/:id', valid.isUserLogin);
router.use('/newMessage/:id', valid.checkEmptyMessage);
router.use('/newMessage/:id', valid.checkTextLength);



router.use('/guestNotify', valid.isUserLogin);
router.use('/likeNotify', valid.isUserLogin);
router.use('/removeGuestNotify', valid.isUserLogin);
router.use('/messageNotify', valid.isUserLogin);




router.route('/newMessage/:id').post(function(req, res){


	Jam.findOne({_id: req.params.id}, function(err, jam){
		var message = {
			username : req.user.username,
			text : req.body.text
		}

		jam.messages.push(message)

		jam.save(function(err) {
			if (err){
				return res.status(500).send(err)
			}
			return res.status(200).send('Komentarz został dodany');
		});		
	})
})



router.route('/newJam').post(function(req, res){

	var today = new Date();
	today.setDate(today.getDate())

	Jam.findOne({ 'title' :  req.body.title,  date: {$gte:today} }, function(err, jam) {
		if (jam) {
			return res.status(500).send('Tytuł Jamu jest już zajęty, wpisz inny')
		}
		else {
			var newJam = new Jam
			newJam.org = req.user
			newJam.title = req.body.title;
			newJam.descr = req.body.descr;
			newJam.date = req.body.date;
			newJam.time = req.body.time;
			newJam.location = req.body.location;
			newJam.state = req.body.state;
			newJam.guestLimit = 40;
			newJam.like = 0;
			newJam.dislike = 0;
			newJam.save(function(err, newJam){
				if(err){
					console.log(err)
				}
				return res.status(200).send({
					text: 'Gratulacje, dodałeś nowy Jam, nastąpi przekierowanie ...',
					id: newJam._id
				});
			})		
		}
	});
		
	
})



router.route('/likeJam/:id').post(function(req, res){
	Jam.findById({_id: req.params.id}, function(err, jam){
		if(_.findWhere(jam.guestsRate , {username: req.user.username})){
			return res.status(500).send('Oceniłeś już ten Jam')
		}
		else
		{
			var userLike = {
				username: req.user.username
			}

			jam.like++;
			jam.guestsRate.push(userLike);


			jam.save(function(err, jam) {
				if (err){
					return res.status(500).send(err)
				}
				return res.status(200).send('Dodałeś like');
			});			
		}
	});
});



router.route('/guestToJam/:id').post(function(req, res){
	Jam.findOne({_id: req.params.id}, function(err, jam){

		jamDate = jam.date.getTime()
		newDate = new Date().getTime()

		if(jamDate<newDate)
		{
			console.log('Wydarzenie już się zaczeło')
			return res.status(500).send('Wydarzenie już się zaczeło')
		}
		if(_.findWhere(jam.guests , {username: req.user.username})){
			return res.status(500).send('Już jesteś na liście')
		}

		var guest = {
			id : req.user._id,
			username : req.user.username,
			status: 'Bierze udział',
		}
		jam.guests.push(guest);
		jam.save(function(err, jam) {
			if (err){
				return res.status(500).send(err)
			}
			console.log(jam.guests)
			return res.status(200).send(jam);
		});		
	})
});


///////////////////////Notifications//////////////////////////////////////////////////////////

router.route('/guestNotify').post(function(req, res){
	User.findOne({username : req.body.org}, function(err, user){
		var notify = {
			username : req.body.username,
			text : 'dołączył',
			jamTitle: req.body.title,
			read: false,
			jamId: req.body.jamId
		}
		user.notifications.push(notify);
		user.save(function(err, user){
			if(err)
				return res.status(500).send(err)
			return res.status(200).send('Dodano')
		})
	})
})

router.route('/likeNotify').post(function(req, res){
	User.findOne({username : req.body.org}, function(err, user){
		var notify = {
			username : req.body.username,
			text : 'polubił',
			jamTitle: req.body.title,
			read: false,
			jamId: req.body.jamId
		}
		user.notifications.push(notify);
		user.save(function(err, user){
			if(err)
				return res.status(500).send(err)
			return res.status(200).send('Dodano')
		})
	})
})

router.route('/messageNotify').post(function(req, res){
	User.findOne({username : req.body.org}, function(err, user){
		var notify = {
			username : req.body.username,
			text : 'skomentował',
			jamTitle: req.body.title,
			read: false,
			jamId: req.body.jamId
		}
		user.notifications.push(notify);
		user.save(function(err, user){
			if(err)
				return res.status(500).send(err)
			return res.status(200).send('Dodano')
		})
	})
})

router.route('/removeGuestNotify').post(function(req, res){
	User.findOne({username : req.body.org}, function(err, user){
		var notify = {
			username : req.body.username,
			text : 'opuścił',
			jamTitle: req.body.title,
			read: false,
			jamId: req.body.jamId
		}
		user.notifications.push(notify);
		user.save(function(err, user){
			if(err)
				return res.status(500).send(err)
			return res.status(200).send('Dodano')
		})
	})
})


module.exports = router;