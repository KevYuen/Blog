var express = require('express'),
  mongoose = require('mongoose'),
  path = require('path'),
  routes = require('./controllers/routes.js'),
  app = module.exports = express();
 
mongoose.connect('mongodb://0a8a8201-6547-48d5-8a4e-e2c9338dc702:414a558e-f0c2-4012-8f66-91ddd10ad6e3@10.0.5.80:26074/db');
 
//authentication
var auth = express.basicAuth(process.env.USERNAME, process.env.PASSWORD);

//cors middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
};

app.configure(function(){
 	app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
 	  app.use(express.bodyParser());
  	app.use(express.methodOverride());
  	app.use(allowCrossDomain);
  	app.use(app.router);
  	app.use(express.static(path.join(__dirname, 'public')));
  	
});


var api = require('./controllers/api.js');

//routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

//api calls
app.get('/api/post', api.getPost);
app.post('/api/post', auth,  api.savePost);

app.listen(3000);
console.log('Express server listening on port 3000');