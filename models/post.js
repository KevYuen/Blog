var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var post = new Schema({
	title: String,
	author: String,
    body: String,
    comment:[{ body:String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta:{
    	votes: Number,
    	favs: Number
    }
});

module.exports = mongoose.model('Post', post);