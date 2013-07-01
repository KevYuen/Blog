var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var me = new Schema({
	name: String,
	age: Number,
	description: String,
	pictureUrl: String
})