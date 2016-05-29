var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var _ = require('underscore');
var User = mongoose.model('User');
var Jam = mongoose.model('Jam');


router.use('/newJam', isUserLogin);
router.use('/newJam', checkEmptyJam);
router.use('/newJam', checkTitleLength);
router.use('/newJam', checkDescrLength);
router.use('/newJam', checkLocationLength);
router.use('/newJam', checkDate);

router.use('/likeJam', isUserLogin);
router.use('/guestToJam/:id', isUserLogin);

router.use('/newMessage/:id', isUserLogin);
router.use('/newMessage/:id', checkEmptyMessage);
router.use('/newMessage/:id', checkTextLength);



router.use('/guestNotify', isUserLogin);
router.use('/likeNotify', isUserLogin);
router.use('/removeGuestNotify', isUserLogin);




function isUserLogin(req, res, next){
	if(_.isEmpty(req.user) || !req.user )
	{
		console.log('Nie jesteś zalogowany')
		return res.status(500).send('Nie jesteś zalogowany')
	}
	next()
}

function checkEmptyJam(req, res, next){
	if(!req.body.date || _.isEmpty(req.body.date) || !req.body.location || _.isEmpty(req.body.location) || !req.body.title || _.isEmpty(req.body.title) || !req.body.descr || _.isEmpty(req.body.descr))
	{
		return res.status(500).send('Uzupełnij wszystkie pola')
	}
	next()
}

function checkTitleLength(req, res, next){
	if(req.body.title.length > 20 || req.body.title.length < 5){
		return res.status(500).send('Dostępna ilość znaków dla pola tytuł to 5 - 20')
	}
	next()
}

function checkDescrLength(req, res, next){
	if(req.body.descr.length > 2000 || req.body.descr.length < 5){
		return res.status(500).send('Dostępna ilość znaków dla pola opis to 5 - 2000')
	}
	next()
}

function checkLocationLength(req, res, next){
	if(req.body.location.length > 100 || req.body.location.length < 5){
		return res.status(500).send('Dostępna ilość znaków dla pola lokalizacja to 5 - 100')
	}
	next()
}

function checkEmptyMessage(req, res, next){
	if(!req.body.text || _.isEmpty(req.body.text))
	{
		return res.status(500).send('Uzupełnij pole tekst')
	}
	next()
}

function checkTextLength(req, res, next){
	if(req.body.text.length > 1000 || req.body.text.length < 5){
		return res.status(500).send('Dostępna ilość znaków dla wiadmość opis to 5 - 1000')
	}
	next()
}


function checkDate(req, res, next){
	var JamDate = new Date(req.body.date)
	var today = new Date()

	if(JamDate < today)
	{
		return res.status(500).send('Data Jamu musi być większa od daty teraźniejszej')
	}
	next()
}







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
			class:'notify-join',
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
			class: 'notify-like',
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
			class: 'notify-leave',
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





////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;