var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var me = new Schema({
	name: String,
	description: String,
	pictureUrl: String
});

module.exports = mongoose.model('Me', me);
