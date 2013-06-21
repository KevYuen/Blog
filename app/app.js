var express = require('express'),
  mongoose = require('mongoose'),
  app = module.exports = express();
 
mongoose.connect('mongodb://localhost/KevBlog');
 
//authentication
var auth = express.basicAuth('admin', 'testpass')

app.configure(function(){
 	app.use('/', express.static(__dirname + '/view'));
 	app.use(express.bodyParser());
  	app.use(express.methodOverride());
  	app.use(app.router);
});


var api = require('./controllers/api.js');
app.get('/api/post', api.getPost);
app.post('/api/post', auth,  api.savePost);

app.listen(3000);
console.log("Express server listening on port 3000");