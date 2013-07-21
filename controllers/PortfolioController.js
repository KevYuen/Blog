var PortfolioItem = require('../models/portfolioItem.js');


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
