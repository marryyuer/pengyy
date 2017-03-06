var express = require('express');
var app = express();

app.use(express.static(__dirname + '/src'));

app.listen(3000, function() {
    console.log('Server running on 3000.' + 'confirm at url (http:localhost:3000/index.html)');
});