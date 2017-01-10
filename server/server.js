var express = require('express');
var path = require('path');
var formidable = require('formidable');
var jqupload = require('jquery-file-upload-middleware');
var credentials = require('./credential');
var fortune = require('./lib/fortune');
var weather = require('./lib/weather');
var app = express();

// regexp for email
var VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// set up handlebars view engine
// var handlebars = require('express3-handlebars')
// 	.create({ defaultLayout: 'main', extname: '.hbs' });
var handlebars = require('express3-handlebars')
	.create({
		defaultLayout: 'main',
		helpers: {
			section: function(name, options) {
				if(!this._sections) {
					this._sections = {};
				}
				this._sections[name] = options.fn(this);
				return null;
			}
		}
});

var nodemailer = require('nodemailer');
var mailTransport = nodemailer.createTransport({
	host: 'smtp.163.com',
	port: 465,
	secure: true,
	auth: {
		user: credentials.gmail.user,
		pass: credentials.gmail.password
	}
});

mailTransport.sendMail({
	from: 'marrypen@163.com',
	to: 'marrypen@163.com, pengyy <664150686@qq.com>',
	subject: 'I am learning to send an email.',
	text: 'hello my friend!'
}, function(err) {
	if(err) console.error('can not send mail' + err);
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(require('cookie-parser')(credentials.cookieSecret));
var expressSession = require('express-session');
app.use(expressSession({
	secret: credentials.cookieSecret,
	resave : true,
	saveUninitialized: true
}));
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.use(function(req, res, next){
	if (!res.locals.partials) {
		res.locals.partials = {};
	}
	res.locals.partials.weather = weather.getWeatherData();
	next();
});

app.use(function(req, res, next) {
	res.locals.flash = req.session.flash;
	delete req.session.flash;
	next();
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res) {
	res.render('home');
});
app.get('/about', function(req,res){
	res.render('about', { fortune: fortune.getFortune(), pageTestScript:  './qa/tests-about.js'});
});
// form data submit
app.get('/newletter', function(req, res) {
	res.render('newletter/newletter', { csrf: 'CSRF token goes here!'});
});
app.post('/process', function(req, res) {
	console.log('Form (from querystring):' + req.query.form);
	console.log('CSRF (from Hidden):' + req.body._csrf);
	console.log('Name (from visible field):' + req.body.name);
	console.log('Email (from visible field):' + req.body.email);
	if(req.xhr || req.accepts('json,html') === 'json') {
		res.send({success: true});
	}
	else {
		res.redirect(303, '/thank-you');
	}
});

// for now, we're mocking NewsletterSignup:
function NewsletterSignup(){
}
NewsletterSignup.prototype.save = function(cb){
	cb();
};

app.post('/newletter', function(req, res){
	var name = req.body.name || '', email = req.body.email || ''; // 输入验证
	if(!email.match(VALID_EMAIL_REGEX)) {
		if(req.xhr) return res.json({ error: 'Invalid name email address.' });
		req.session.flash = {
			type: 'danger',
			intro: 'Validation error!',
			message: 'The email address you entered was not valid.'
		};
		return res.redirect(303, '/archive');
	}
	new NewsletterSignup({ name: name, email: email }).save(function(err){
		if(err) {
			if(req.xhr) return res.json({ error: 'Database error.' });
			req.session.flash = {
				type: 'danger',
				intro: 'Database error!',
				message: 'There was a database error; please try again later.',
			};
			return res.redirect(303, '/archive');
		}
		if(req.xhr) return res.json({ success: true });
		req.session.flash = {
			type: 'success',
			intro: 'Thank you!',
			message: 'You have now been signed up for the newsletter.'
		};
		return res.redirect(303, '/archive');
	});
});
app.get('/archive', function(req, res) {
	res.render('newletter/archive');
});
app.get('/thank-you', function(req, res) {
	res.render('thank-you');
});
// file upload
app.get('/contest/album', function(req, res) {
	var now = new Date();
	res.render('contest/album', {year: now.getFullYear(), month: now.getMonth()});
});
app.post('/contest/album/:year/:month', function(req, res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if(err) return res.redirect(303, '/error');
		console.log('received fields:');
		console.log(fields);
		console.log('received files:');
		console.log(files);
		res.redirect(303, '/thank-you');
	});
});
// jquery file upload
app.get('/contest/album-jquery', function(req, res) {
	var now = new Date();
	res.render('contest/album-jquery', {year: now.getFullYear(), month: now.getMonth()});
});
app.use('/upload', function(req, res, next) {
	var now = new Date();
	jqupload.fileHandler({
		uploadDir: function() {
			return __dirname + '/public/uploads/' + now;
		},
		uploadUrl: function() {
			return '/uploads/' + now;
		}
	})(req, res, next);
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
