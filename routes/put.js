
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



function checkEmptyJam(req, res, next){
	if(!req.body.date || _.isEmpty(req.body.date) || !req.body.location || _.isEmpty(req.body.location) || !req.body.title || _.isEmpty(req.body.title) || !req.body.descr || _.isEmpty(req.body.descr))
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
	if(req.body.descr.length > 2000 || req.body.descr.length <= 5){
		return res.status(500).send('Dostępna ilość znaków dla pola opis to 5 - 2000')
	}
	next()
}

function checkLocationLength(req, res, next){
	if(req.body.location.length >= 100 || req.body.location.length <= 5){
		return res.status(500).send('Dostępna ilość znaków dla pola lokalizacja to 5 - 100')
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

function checkAdressLength(req, res, next){
	if(req.body.adress.length >= 100 || req.body.adress.length <= 5){
		return res.status(500).send('Dostępna ilość znaków dla pola adres to 5 - 100')
	}
	next()
}

function checkPhoneLength(req, res, next){
	if(req.body.phone.length >= 20 || req.body.phone.length <= 5){
		return res.status(500).send('Dostępna ilość znaków dla pola Telefon to 5 - 20')
	}
	next()
}


router.use('/guestLoseJam/:id', isUserLogin);
router.use('/deleteJam', isUserLogin);
router.use('/changeGuestStatus', isUserLogin);

router.use('/updateProfile', isUserLogin);
router.use('/updateProfile', checkAdressLength);
router.use('/updateProfile', checkPhoneLength);

router.use('/updateJam', isUserLogin);
router.use('/updateJam', checkEmptyJam);
router.use('/updateJam', checkTitleLength);
router.use('/updateJam', checkDescrLength);
router.use('/updateJam', checkLocationLength);
router.use('/updateJam', checkDate);



router.route('/updateJam').put(function(req, res){

	Jam.findOne({ _id: req.body.id }, function (err, jam){
		jam.title = req.body.title;
		jam.descr = req.body.descr;
		jam.date = req.body.date;
		jam.state = req.body.state;
		jam.location = req.body.location;
		jam.save(function(err){
			if(err){
				console.log(err)
			}
			return res.status(200).send('Edycja zakończona')
		});

	});			


})


router.route('/setNotifiyFalse').put(function(req, res){

	// User.update({'notifications.read': true},
 //      {'$set': {
 //             read: false,
	//    }}, {multi: true},
 //          function(err,jam) {
	//    	if(err){
 //        	console.log(err);
 //        	return res.send(err);
 //        }
 //        return res.status(200).send(jam);
 // 	});

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


router.route('/guestLoseJam/:id').put(function(req, res){


  	Jam.findByIdAndUpdate(req.params.id,{ $pull: { 'guests': {  username: req.user.username } } },function(err, jam){
		if(err){
			console.log(err);
		}
		
		return res.status(200).send(jam)
	});
    // Jam.update({'guests.username': req.user.username},
    //   {'$set': {
    //          'guests.$.status': lose,
	   // }},
    //       function(err, jam) {
	   // 	if(err){
    //     	console.log(err);
    //     	return res.send(err);
    //     }
    //     return res.status(200).send(err);
    // });


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