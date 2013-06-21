var Post = require('../models/post.js');

/*
 * Get all game:
 * - host- /api/post
 * - send: nothing
 * - receive: { "passkey": "some string" }
*/
exports.getPost = function(req, res){
	Post.find({}, function(err, allPost){
		if(err) res.send({error: err});
		res.send({Posts: allPost});
	});
}

exports.savePost = function(req, res){
	var post = new Post;
	console.log(req.body);
	post.title = req.body.title;
	post.author = req.user;
	post.body = req.body.body;
	post.comment = [];
	post.hidden = req.body.hidden;
	post.meta = {votes: 0, favs: 0};
	post.save(function(err, post){
		if (err) res.send({error: err});
		res.send({received : 'ok'});
	})
}
