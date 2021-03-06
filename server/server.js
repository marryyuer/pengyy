var express = require('express');
var path = require('path');
var http = require('http');
var fs = require('fs');

var mongoose = require('mongoose');
var Member = require('./models/member');
var InWorkListener = require('./models/inWorkListener');
var opts = {
	server: {
		socketOptions: { keepAlive: true }
	}
};
var formidable = require('formidable');
var jqupload = require('jquery-file-upload-middleware');
var credentials = require('./credential');
var fortune = require('./lib/fortune');
var weather = require('./lib/weather');
var app = express();

// regexp for email
var VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

//add initial data to mongoDB
switch(app.get('env')) {
	case 'development':
		mongoose.connect(credentials.mongo.development.connectString, opts);
		break;
	case 'production':
		mongoose.connect(credentials.mongo.production.connectString, opts);
		break;
}

Member.find(function(err, members) {
	if(members.length) return;

	new Member({
		name: 'Pengyy',
		sex: 'Boy',
		description: 'Working in Beijing',
		age: 29,
		salary: 14000,
		available: true,
		experiences: 6
	}).save();

	new Member({
		name: 'YuerBaby',
		sex: 'Girl',
		description: 'Living in Beijing',
		age: 24,
		salary: 14000,
		available: false,
		experiences: 1
	}).save();
});

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

app.use(function(req, res, next) {
	var domain = require('domain').create();
	domain.on('error', function(err) {
		console.error('Domain error caught¥n', err.stack);
		try {
			// shutdown after 5 seconds
			setTimeout(function() {
				console.error('Failsafe shutdown.');
				process.exit();
			}, 5000);

			// disconnect form cluster
			var worker = require('cluster').worker;
			if(worker) worker.disconnect();

			// close server
			server.close();

			try {
				// try express router
				next(err);
			}
			catch(err) {
				// if express error router failed, try to response with normal text information
				console.error('Express error mechanism fialed.¥n', err.stack);
				res.statusCode = 505;
				res.setHeader('content-type', 'text/plain');
				res.end('Serve error');
			}
		}
		catch(err) {
			console.error('Unable to send 500 response.¥n', err.stack);
		}
	});

	// add req and res to domain
	domain.add(req);
	domain.add(res);

	// do next
	domain.run(next);
});

app.use(function(req, res, next) {
	var cluster = require('cluster');
	if (cluster.isWorker) {
		console.log('Worker %d received request', cluster.worker.id);
	}
	next();
});

switch(app.get('env')) {
	case 'development':
		app.use(require('morgan')('dev'));
		break;
	case 'production':
		app.use(require('express-logger')({
			path: __dirname + '/log/request.log'
		}));
		break;
}

// var emailService = require('./email')(credentials);
// emailService.sendEmail('664150686@qq.com', 'test123', 'thanks for testing with me!');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
	secret: credentials.cookieSecret,
	resave: true,
	saveUninitialized: true
}));

var dataDir = __dirname + '/data';
var albumDir = dataDir + '/album';
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
fs.existsSync(albumDir) || fs.mkdirSync(albumDir);

function saveContestAlbum(contestName, email, year, month, photoPath) {
	// TODO
}

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

// show falimy members form mongoDB
app.get('/family/members', function(req, res) {
	Member.find({ available: true}, function(err, members) {
		var context = {
			members: members.map(function(member) {
				return {
					name: member.name,
					description: member.description,
					age: member.age,
					sex: member.sex
				};
			})
		};
		console.log(context);
		res.render('family/members', context);
	});
});

// motify me by email
app.get('/work/notify-me-when-in-work', function(res, req) {
	res.render('work/notify-me-when-in-work', { date: req.query.date });
});
app.post('/work/notify-me-when-in-work', function(res, req) {
	InWorkListener.update(
		{ email: req.body.email },
		{ $push: {date: req.body.date} },
		{ upsert: true },
		function(err) {
			if(err) {
				console.error(err.stack);
				req.session.flash = {
					type: 'danger',
					intro: 'Oops',
					message: 'There was an error procssing request.'
				};
				return res.redirect(303, '/family/members');
			}
			req.session.flash = {
				type: 'success',
				intro: 'Thank you.',
				message: 'You will be notified while I becomes inwork.'
			};
			return res.redirect(303, '/falmily/members');
		}
	)
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
		if(err) {
			res.session.flash = {
				type: 'danger',
				intro: 'Oops!',
				message: 'There was an error processing you submission.' + 
						'Please try again!'
			};
			return res.redirect('303', '/contest/album');
		}

		var photo = files.photo;
		var dir = albumDir + '/' + Date.now();
		var path = dir + '/' + photo.name;

		fs.mkdirSync(dir);
		fs.renameSync(photo.path, dir + '/' + photo.name);

		saveContestAlbum('album', fields.email, req.params.year, req.params.month);
		req.session.flash= {
			type: 'success',
			intro: 'Congretulations!',
			message: 'You have been entered into the contest.'
		};
		return res.redirect(303, '/contest/album/entries');
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

// mocking product database
function Product(){
}
Product.find = function(conditions, fields, options, cb){
	if(typeof conditions==='function') {
		cb = conditions;
		conditions = {};
		fields = null;
		options = {};
	} else if(typeof fields==='function') {
		cb = fields;
		fields = null;
		options = {};
	} else if(typeof options==='function') {
		cb = options;
		options = {};
	}
	var products = [
		{
			name: 'Hood River Tour',
			slug: 'hood-river',
			category: 'tour',
			maximumGuests: 15,
			sku: 723,
		},
		{
			name: 'Oregon Coast Tour',
			slug: 'oregon-coast',
			category: 'tour',
			maximumGuests: 10,
			sku: 446,
		},
		{
			name: 'Rock Climbing in Bend',
			slug: 'rock-climbing/bend',
			category: 'adventure',
			requiresWaiver: true,
			maximumGuests: 4,
			sku: 944,
		}
	];
	cb(null, products.filter(function(p) {
		if(conditions.category && p.category!==conditions.category) return false;
		if(conditions.slug && p.slug!==conditions.slug) return false;
		if(isFinite(conditions.sku) && p.sku!==Number(conditions.sku)) return false;
		return true;
	}));
};
Product.findOne = function(conditions, fields, options, cb){
	if(typeof conditions==='function') {
		cb = conditions;
		conditions = {};
		fields = null;
		options = {};
	} else if(typeof fields==='function') {
		cb = fields;
		fields = null;
		options = {};
	} else if(typeof options==='function') {
		cb = options;
		options = {};
	}
	Product.find(conditions, fields, options, function(err, products){
		cb(err, products && products.length ? products[0] : null);
	});
};

var cartValidation = require('./lib/cartValidation.js');

app.use(cartValidation.checkWaivers);
app.use(cartValidation.checkGuestCounts);

app.post('/cart/add', function(req, res, next){
	var cart = req.session.cart || (req.session.cart = { items: [] });
	Product.findOne({ sku: req.body.sku }, function(err, product){
		if(err) return next(err);
		if(!product) return next(new Error('Unknown product SKU: ' + req.body.sku));
		cart.items.push({
			product: product,
			guests: req.body.guests || 0,
		});
		res.redirect(303, '/cart');
	});
});
app.get('/cart', function(req, res, next){
	var cart = req.session.cart;
	if(!cart) next();
	res.render('cart/cart', { cart: cart });
});
app.get('/cart/checkout', function(req, res, next) {
	var cart = req.session.cart;
	if(!cart) next();
	res.render('cart/checkout');
});
app.post('/cart/checkout', function(req, res, next) {
	var cart = req.session.cart;
	if(!cart) next(new Error('cart does not exist!'));

	var name = req.body.name || '';
	var email = req.body.email || '';
	if(!email.match(VALID_EMAIL_REGEX)) {
		return next(new Error('Invalid email address!'));
	}

	cart.number = Math.random().toString().replace(/^0\.0*/, '');
	cart.billing = {
		name: name,
		email: email,
	};

	res.render('cart/thank-you', {
		layout: null,
		cart: cart
	}, function(err, html) {
		if(err) console.log('error in email template!');
		mailTransport.sendMail({
			from: 'Pengyy: marrypen@163.com',
			to: 'marrypen@163.com',
			subject: 'thank you for applying Pengyy Party.',
			html: html,
			generateTextHtml: true
		}, function(err) {
			if(err) {
				console.error('Unable to send confirmation:' + err.stack);
			}
		});
	});
	res.render('cart/cart-thank-you', {cart: cart});
});

// app.get('/fail', function(req, res, next) {
// 	throw new Error('Nope!');
// });

app.get('/epic-fail', function(req, res) {
	process.nextTick(function() {
		throw new Error('Kaboom!');
	});
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

// app.listen(app.get('port'), function(){
//   console.log( 'Express started in ' + app.get('env') + 
// 	' mode on http://localhost:' + 
//     app.get('port') + '; press Ctrl-C to terminate.' );
// });

function startServer() {
	http.createServer(app).listen(app.get('port'), function() {
		console.log('Express started in ' + app.get('env') +
		' mode on http://localhost:' + app.get('port') + 
		'; Press Ctrl + C to terminate.');
	});
}

if(require.main === module) {
	// start server directly.
	startServer();
} else {
	// required by other module.
	module.exports = startServer;
}