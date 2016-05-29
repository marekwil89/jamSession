var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	role: String,
	adress: String,
	phone: String,
	admin: Boolean,
	notifications: [{
		username: String,
		text : String,
		jamTitle: String,
		created_date : {type: Date, default: Date.now},
		read: Boolean,
		class: String,
		jamId: String
	}],
	created_at: {type: Date, default: Date.now}
})


var jamSchema = new mongoose.Schema({
	org: {},
	title: String,
	descr: String,
	date: {type: Date},
	state: String,
	location: String,
	messages: [{
		username: String,
		text: String,
		created_at: {type: Date, default: Date.now}
	}],
	guestLimit: Number,
	guests: [{
		status: String,
		username: String
	}],
	guestsRate: [{
		username: String
	}],
	like: Number
	// dislike: Number
})




mongoose.model('Jam', jamSchema);
mongoose.model('User', userSchema);

