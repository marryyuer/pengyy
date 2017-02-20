var express = require('express');
var app = express();

app.use('/resources',express.static(__dirname));

app.listen(3000, function() {
    console.log('server started at http://localhost:3000');
})