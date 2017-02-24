var express = require('express');

var app = express();

app.use('/resources', express.static(__dirname));

app.listen(3000, function() {
    console.log('Server started at port 3000.');
});