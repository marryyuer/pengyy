var express = require('express');
var path = require('path');
var fortune = require('./lib/fortune');
var weather = require('./lib/weather');
var app = express();

// set up handlebars view engine
// var handlebars = require('express3-handlebars')
// 	.create({ defaultLayout: 'main', extname: '.hbs' });
var handlebars = require('express3-handlebars')
	.create({
		defaultLayout: 'main',
		section: function(name, options) {
			if(!this._section) {
				this._section = {};
			}
			this._section[name] = options.fn(this);
			return null;
		}
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' &&
						req.query.test === '1';
	next();
});

app.use(function(req, res, next){
	if (!res.locals.partials) {
		res.locals.partials = {};
	}
	res.locals.partials.weather = weather.getWeatherData();
	next();
});

app.use(require('body-parser')());

app.get('/', function(req, res) {
	res.render('home');
});
app.get('/about', function(req,res){
	// var randomFortune = 
		// fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
	res.render('about', { fortune: fortune.getFortune(), pageTestScript:  './qa/tests-about.js'});
});
app.get('/newletter', function(req, res) {
	res.render('newletter', { csrf: 'CSRF token goes here!'});
});
app.post('/process', function(req, res) {
	console.log('Form (from querystring):' + req.query.form);
	console.log('CSRF (from Hidden):' + req.body._csrf);
	console.log('Name (from visible field):' + req.body.name);
	console.log('Email (from visible field):' + req.body.email);
	res.redirect(303, '/thank-you');
});
app.get('/thank-you', function(req, res) {
	res.render('thank-you');
});
app.get('/life', function(req,res){
	res.render('life/life');
});
app.get('/life/28', function(req,res){
	res.render('life/28');
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});
