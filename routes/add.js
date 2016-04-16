var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var _ = require('underscore');
var User = mongoose.model('User');
var Jam = mongoose.model('Jam');


router.use('/newJam', isUserLogin);
router.use('/newJam', checkEmptyInputs);
router.use('/newJam', checkTitleLength);
router.use('/newJam', checkDescrLength);
router.use('/newJam', checkLocationLength);

router.use('/likeJam', isUserLogin);
router.use('/newMessage/:id', isUserLogin);
router.use('/guestToJam/:id', isUserLogin);



function isUserLogin(req, res, next){
	if(_.isEmpty(req.user) || !req.user )
	{
		console.log('Nie jesteś zalogowany')
		return res.status(500).send('Nie jesteś zalogowany')
	}
	next()
}

function checkEmptyInputs(req, res, next){
	if(!req.body.time || _.isEmpty(req.body.time) || !req.body.date || _.isEmpty(req.body.date) || !req.body.location || _.isEmpty(req.body.location) || !req.body.title || _.isEmpty(req.body.title) || !req.body.descr || _.isEmpty(req.body.descr))
	{
		return res.status(500).send('Uzupełnij wszystkie pola')
	}
	next()
}

function checkTitleLength(req, res, next){
	if(req.body.title.length >= 40 || req.body.title.length <= 5){
		return res.status(500).send('Dostępna ilość znaków dla pola tytuł to 5 - 40')
	}
	next()
}

function checkDescrLength(req, res, next){
	if(req.body.descr.length >= 400 || req.body.descr.length <= 5){
		return res.status(500).send('Dostępna ilość znaków dla pola opis to 5 - 400')
	}
	next()
}
function checkLocationLength(req, res, next){
	if(req.body.location.length >= 100 || req.body.location.length <= 5){
		return res.status(500).send('Dostępna ilość znaków dla pola lokalizacja to 5 - 100')
	}
	next()
}

router.route('/newJam').post(function(req, res){

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
	newJam.save(function(err){
		if(err){
			console.log(err)
		}
		return res.status(200).send("Jam Session został dodany");
	})				
	
})







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
			role : req.user.role,
			status: 'chce isc',
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












router.route('/newMessage/:id').post(function(req, res){


	if(checkDescrLength(req.body.text) == false)
	{
		return res.status(500).send('Dostępna ilość znaków dla pola wiadomość to 5 - 400')
	}

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
			return res.status(200).send('Message added');
		});		
	})
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



module.exports = router;