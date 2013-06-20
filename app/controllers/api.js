var Post = require('../models/post.js');

exports.getPost = function(req, res){
	Post.find({}, function(err, allPost){
		res.send(allPost);
	});
}

exports.savePost = function(req, res){

}
