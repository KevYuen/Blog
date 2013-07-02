var Post = require('../models/post.js'),
	Me = require('../models/me.js');

/*
 * Get all game:
 * - host- /api/post
 * - send: nothing
 * - receive: { "passkey": "some string" }
*/
exports.getPost = function(req, res){
	Post.find({}).sort({date:-1}).exec(function(err, allPost){
		if(err) res.send({error: err});
		//console.log(allPost);
		res.send({Posts: allPost});
	});
}

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

//About me Info
exports.getMe = function(req, res){
	Me.findOne({}, function(err, Me){
		if(err) res.send({error: err});
		res.send({Me: Me});
	});
}

exports.editMe = function(req, res){
	var editedInfo = new Me;
	editedInfo.name = req.body.name;
	editedInfo.description = req.body.description;
	editedInfo.pictureUrl = req.body.pictureUrl;

	var upsertData = editedInfo.toObject();

	// Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
	delete upsertData._id;

	//console.log(editedInfo);
	Me.update({}, upsertData, {upsert: true}, function(err){
		if (err) res.send({error: err});
		res.send({received: 'ok'});
	});
}

exports.getPostDetail = function(req, res){
	var id = req.params.id;
	Post.find({_id: id}, function(err, post){
		if (err) res.send({error:err});
		res.send({post:post});
	});
}