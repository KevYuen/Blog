var Me = require('../models/me.js');

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

