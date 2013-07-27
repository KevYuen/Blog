var Post = require('../models/post.js');

/*
 * Get all game:
 * - Get- /api/post
 * - send: offset
 * - receive: { "passkey": "some string" }
*/
exports.getPost = function(req, res){
	var offset = req.query.offset ? req.query.offset : 0;
	Post.find({}).sort({date:-1}).skip(offset).limit(10).exec(function(err, allPost){
		if(err) res.send({error: err});
		console.log(allPost);
		res.send({Posts: allPost});
	});
}

/*
 * Save a Post
 * Put - /api/post
 * send: {title: String, body: string, hidden: bool}
 * receive: {received: ok}
 */
exports.savePost = function(req, res){
	var post = new Post;
	
	//console.log(req.body);
	post.title = req.body.title;
	post.author = req.user;
	post.body = req.body.body;
	post.comment = [];
	post.hidden = req.body.hidden;
	post.meta = {votes: 0, favs: 0};
	post.save(function(err, post){
		if (err) res.send({error: err});
		res.send({received : 'ok'});
	});
}


/*
 * Get detail of one post
 * Get- /api/post/:id/
 * send: id in URL
 * receive: {post: postinfo}
 */
exports.getPostDetail = function(req, res){
	var id = req.params.id;
	Post.find({_id: id}, function(err, post){
		if (err) res.send({error:err});
		res.send({post:post});
	});
}


/*
 * Remove the document of the post specified by id
 * Delete- /api/post/:id
 * send: id in URL
 * receive: {recevied: ok}
 */
exports.deletePost = function(req, res){
	var id = req.params.id;
	Post.remove({_id: id}, function(err, DeletedItem){
		if(err) res.send({error:err});
		res.send({received: 'ok'});
	});
}


 /*
 * Edit post
 * Put - /api/post/:id
 * send: {title: String, body: string, hidden: bool}
 * receive: {received: ok}
 */
exports.editPost = function(req, res){
	Post.update({_id: req.params.id}, {title:req.body.title, body: req.body.body }, {upsert: false}, function(err){
		if (err) res.send({error: err});
		res.send({received: 'ok'});
	});
}
