var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	role: String,
	adress: String,
	phone: String,
	admin: Boolean,
	created_at: {type: Date, default: Date.now}
})


var jamSchema = new mongoose.Schema({
	org: {},
	title: String,
	descr: String,
	date: {type: Date},
	time: {type: Date},
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
		role: String,
		username: String
	}],
	guestsRate: [{
		username: String
	}],
	like: Number,
	dislike: Number
})
// var expeditionSchema = new mongoose.Schema({
// 	title: String,
// 	text: String,
// 	adress: String,
// 	category: String,
// 	created_at: {type: Date, default: Date.now},
// 	comments: [{
// 		username: String,
// 		text: String,
// 		admin: Boolean,
// 		created_at: {type: Date, default: Date.now}
// 	}],
// 	likers: [{
// 		username: String
// 	}],
// 	like: Number,
// 	dislike: Number
// });



mongoose.model('Jam', jamSchema);
mongoose.model('User', userSchema);

