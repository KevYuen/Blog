var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var portfolioItem = new Schema({
	title: String,
	description: String,
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PortfolioItem', portfolioItem);
