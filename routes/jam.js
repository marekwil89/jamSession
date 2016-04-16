var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var _ = require('underscore');
// var jam = mongoose.model('Expedition');
var Jam = mongoose.model('Jam');



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







router.use('/deleteGuestFromJam/:id', isUserLogin);
router.use('/guestLoseJam/:id', isUserLogin);
router.use('/guestsRateData/:id', isUserLogin);





router.route('/getJamsList').get(function(req, res){
	var today = new Date();

	Jam.find({ date: {$gt:today}}, function(err, jams){
		return res.status(200).send(jams)
	})


	// Jam.find(function(err, jams){
	// 	if(err){
	// 		console.log(err)
	// 	}
	// 	return res.status(200).send(jams)
	// })
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
	dayPlus.setDate(dayPlus.getDate()+10);

	Jam.find( { date: { $gt: today, $lt: dayPlus } }, function(err, jams){
		res.status(200).send(jams)
	});
})




// router.route('/guestLoseJam/:id').put(function(req, res){

// 	Jam.findOneAndUpdate({'guests.username': req.user.username},
//       {'$set': {
//              'guests.$.status': 'zrezygnował',
// 	   }},
//           function(err, jam) {
// 	   	if(err){
//         	console.log(err);
//         	return res.send(err);
//         }
//         return res.status(200).send(jam);
//     });

// })
//////////////////////////////////////////////////////////////////////////




router.route('/guestsRateData/:id').get(function(req, res){
	Jam.findOne({_id: req.params.id}, function(err, jam){
		if(_.findWhere(jam.guestsRate , {username: req.user.username})){
			return res.status(500).send('Oceniłeś już ten Jam')
		}
	});
});
////////////////////////////////////////////////////////////////////////////////////////////////////////







// router.route('/searchJams').post(function(req, res){
// 	console.log(req.body.word)

// 	Jam.find({state: req.body.word }, function(err, jams) {
// 		if(err){
// 			return res.status(500).send(err)
// 		}
// 		return res.status(200).send(jams)
// 	});

// })

// router.route('/deleteGuestFromJam/:id').put(function(req, res){

//   	Jam.findByIdAndUpdate(req.params.id,{ $pull: { 'guests': {  username: req.user.username } } },function(err, jam){
// 		if(err){
// 			console.log(err);
// 		}
		
// 		return res.status(200).send(jam)
// 	});


// })




module.exports = router;