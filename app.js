var express = require('express'),
  mongoose = require('mongoose'),
  path = require('path'),
  routes = require('./controllers/routes.js'),
  app = module.exports = express();
 
mongoose.connect(process.env.Mongo|| "mongodb://localhost/KevBlog");

//authentication
var auth = express.basicAuth(process.env.USERNAME || "admin" , process.env.PASSWORD || "Welcome123");

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


var post = require('./controllers/PostController.js'),
    portfolio= require('./controllers/PortfolioController.js'),
    aboutMe = require('./controllers/AboutMeController.js');
    
//routes
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/partials/secure/:name', auth, routes.securePartials);

//api calls
app.get('/api/post', post.getPost);
app.post('/api/post', auth, post.savePost);
app.get('/api/post/:id', post.getPostDetail);
app.del('/api/post/:id', auth, post.deletePost);
app.put('/api/post/:id', auth, post.editPost);

app.get('/api/me', aboutMe.getMe);
app.put('/api/me', auth, aboutMe.editMe);

app.get('/api/portfolio', portfolio.getPortfolioItems);
app.post('/api/portfolio', portfolio.savePortfolioItem);
app.get('/api/portfolio/:id', portfolio.getPortfolioItem);
app.del('/api/portfolio/:id', auth, portfolio.deletePortfolioItem);
app.put('/api/portfolio/:id', auth, portfolio.editPortfolioItem);

app.listen(3000);
console.log('Express server listening on port 3000');