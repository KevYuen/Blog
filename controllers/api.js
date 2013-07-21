var Post = require('../models/post.js'),
	Me = require('../models/me.js'),
	PortfolioItem = require('../models/portfolioItem.js');

/*
 * Get all game:
 * - Get- /api/post
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
 * Get about me info
 * Get - /api/me
 * send: Nothing
 * receive: {Me: info}
 */
exports.getMe = function(req, res){
	Me.findOne({}, function(err, Me){
		if(err) res.send({error: err});
		res.send({Me: Me});
	});
}

/*
 * Update aboutme
 * Put - /api/me
 * send: {name: String, description: string, pictureUrl: string}
 * receive: {received: ok}
 */
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
 *Get all PortfolioItems
 * Get - /api/portfolio/
 * send: nothing
 * receive: {portfolioItems:[{name:string, description: string}] }
 */
exports.getPortfolioItems = function(req, res){
	PortfolioItem.find({}).sort({date:-1}).exec(function(err, allItems){
		if (err) res.send({error:err});
		res.send({portfolioItems: allItems});
	});
}

/*
 * Save a PortfolioItem
 * Put - /api/portfolio/
 * send: {title: String, description: string}
 * receive: {received: ok}
 */
exports.savePortfolioItem = function(req, res){
	var newPortItem = new PortfolioItem;
	newPortItem.title = req.body.title;
	newPortItem.description = req.body.description;

	newPortItem.save(function(err, newItems){
		if(err) res.send({error:err});
		res.send({received: "ok"});
	});
}


/*
 * Get detail of one PortfolioItem
 * Get- /api/portfolio/:id/
 * send: id in URL
 * receive: {portfolioItem: ItemInfo}
 */
exports.getPortfolioItem = function(req, res){
	var id = req.params.id;
	PortfolioItem.find({_id: id}, function(err, ItemInfo){
		if (err) res.send({error:err});
		res.send({portfolioItem:ItemInfo});
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
 * Remove the document of the portfolioItem specified by id
 * Delete- /api/post/:id
 * send: id in URL
 * receive: {recevied: ok}
 */
 exports.deletePortfolioItem = function(req, res){
 	var id = req.params.id;
 	PortfolioItem.remove({_id: id}, function(err, DeletedItem){
 		if (err) res.send({error: err});
 		res.send({received:'ok'});
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

 /*
 * Edit Portfolio Item
 * Put - /api/portfolio/:id
 * send: {title: String, description: string}
 * receive: {received: ok}
 */
exports.editPortfolioItem = function(req, res){
	PortfolioItem.update({_id: req.params.id},{title: req.body.title, description: req.body.description} , {upsert: false}, function(err){
		if (err) res.send({error: err});
		res.send({received: 'ok'});
	});
}