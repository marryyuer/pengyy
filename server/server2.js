var app = require('express')();
var add = require('./public/test/test');

console.log(add(1, 2));

app.use(function(req, res, next) {
    console.log('¥n¥nALLWAYS!');
    next();
});

app.get('/a', function(req, res, next) {
    console.log('a: Router ended!');
    res.send('a');
});

app.use('/a', function(req, res, next) {
    console.log('Never run here.');
});

app.get('/b' ,function(req, res, next) {
    console.log('b: router not ended.');
    next();
});

app.use(function(req, res, next) {
    console.log('Sometimes here.');
    next();
});

app.use('/b', function(req, res, next) {
    console.log('b: there is an error.');
    throw new Error('b: there is an error.');
});

app.use('/b', function(err, req, res, next) {
    console.log('b: error detected.');
    next(err);
});

app.get('/c', function(err, req) {
    console.log('c: throw an error');
    throw new Error('c: error happened');
});

app.use('/c', function(err, req, res, next) {
    console.log('c: error detected!');
    next();
});

app.use(function(err, req, res, next) {
    console.log('error detected!' + err.message);
    res.send('500 - server error.');
});

app.use(function(req, res) {
    console.log('router undefined!');
    res.send('404 - page not found!');
});

app.listen(3000, function() {
    console.log('Listening to Port 3000');
})