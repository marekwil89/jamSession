var express = require('express');
var router = express.Router();
var _ = require('underscore');

module.exports = {

	 isUserLogin: function (req, res, next){
		if(_.isEmpty(req.user) || !req.user )
		{
			console.log('Nie jesteś zalogowany')
			return res.status(500).send('Nie jesteś zalogowany')
		}
		next()
	},


	 isAdmin: function (req, res, next){
		if(_.isEmpty(req.user) || !req.user)
		{
			return res.status(500).send('Nie jesteś zalgowany')
		}
		else if(req.user.admin != true || req.user.admin == false)
		{
			return res.status(500).send('Brak uprawnień')
		}
		next()

	},

	 checkEmptyJam : function (req, res, next){
		if(!req.body.date || _.isEmpty(req.body.date) || !req.body.location || _.isEmpty(req.body.location) || !req.body.descr || _.isEmpty(req.body.descr))
		{
			return res.status(500).send('Uzupełnij wszystkie pola')
		}
		next()
	},

	 checkDescrLength: function (req, res, next){
		if(req.body.descr.length > 2000 || req.body.descr.length <= 5){
			return res.status(500).send('Dostępna ilość znaków dla pola opis to 5 - 2000')
		}
		next()
	},

	checkLocationLength: function (req, res, next){
		if(req.body.location.length >= 100 || req.body.location.length <= 5){
			return res.status(500).send('Dostępna ilość znaków dla pola lokalizacja to 5 - 100')
		}
		next()
	},


 	checkDate: function (req, res, next){
		var JamDate = new Date(req.body.date)
		var today = new Date()

		if(JamDate < today)
		{
			return res.status(500).send('Zmień datę')
		}
		next()
	},

 	checkAdressLength: function (req, res, next){
		if(req.body.adress.length > 40)
		{
			return res.status(500).send('Maksymalna ilość znaków dla pola adress to 40')
		}
		next()
	},

	checkPhoneIsNumber: function (req, res, next){
		console.log(typeof req.body.phone)
		if(isNaN(req.body.phone) || req.body.phone < 0)
		{
			return res.status(500).send('Zły format pola telefon, spróbuj jeszcze raz')
		}
		next()
	},

	checkPhoneLength: function (req, res, next){
		if(req.body.phone.length > 15)
		{
			return res.status(500).send('Maksymalna ilość znaków dla pola telefon to 15')
		}
		next()
	},

	checkEmptyJam: function (req, res, next){
		console.log(req.body)
		if(!req.body.date || _.isEmpty(req.body.date) || !req.body.location || _.isEmpty(req.body.location) || !req.body.descr || _.isEmpty(req.body.descr))
		{
			return res.status(500).send('Uzupełnij wszystkie pola')
		}
		next()
	},

	checkTitleLength: function (req, res, next){
		if(req.body.title.length > 20 || req.body.title.length < 5){
			return res.status(500).send('Dostępna ilość znaków dla pola tytuł to 5 - 20')
		}
		next()
	},

	checkDescrLength: function (req, res, next){
		if(req.body.descr.length > 2000 || req.body.descr.length < 5){
			return res.status(500).send('Dostępna ilość znaków dla pola opis to 5 - 2000')
		}
		next()
	},

	checkLocationLength: function (req, res, next){
		if(req.body.location.length > 100 || req.body.location.length < 5){
			return res.status(500).send('Dostępna ilość znaków dla pola lokalizacja to 5 - 100')
		}
		next()
	},

	checkEmptyMessage: function (req, res, next){
		if(!req.body.text || _.isEmpty(req.body.text))
		{
			return res.status(500).send('Uzupełnij pole tekst')
		}
		next()
	},

	checkTextLength: function (req, res, next){
		if(req.body.text.length > 1000 || req.body.text.length < 5){
			return res.status(500).send('Dostępna ilość znaków dla wiadmość opis to 5 - 1000')
		}
		next()
	},


	checkDate: function (req, res, next){
		var JamDate = new Date(req.body.date)
		var today = new Date()

		if(JamDate < today)
		{
			return res.status(500).send('Zmień datę')
		}
		next()
	}


}