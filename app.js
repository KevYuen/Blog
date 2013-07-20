var express = require('express'),
  mongoose = require('mongoose'),
  path = require('path'),
  routes = require('./controllers/routes.js'),
  app = module.exports = express();
 
//mongoose.connect(process.env.Mongo);
mongoose.connect('mongodb://localhost/KevBlog');

//authentication
//var auth = express.basicAuth(process.env.USERNAME, process.env.PASSWORD);
var auth = express.basicAuth("admin", "Welcome123");

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
app.get('/partials/secure/:name', auth, routes.securePartials);

//api calls
app.get('/api/post', api.getPost);
app.put('/api/post', auth, api.savePost);
app.get('/api/post/:id', api.getPostDetail);

app.get('/api/me', api.getMe);
app.put('/api/me', auth, api.editMe);

app.get('/api/portfolio', api.getPortfolioItems);
app.put('/api/portfolio', api.savePortfolioItem);
app.get('/api.portfolio/:id', api.getPortfolioItem);

app.listen(3000);
console.log('Express server listening on port 3000');