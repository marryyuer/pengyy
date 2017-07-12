var express = require('express');
var app = express();

app.get('/api/sampleApi', function(req, res) {
    res.json({
        test: 'test data returned from nodejs server.'
    });
});

app.listen(3000, function() {
    console.log('server start at port: 3000.');
});

