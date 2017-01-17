var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/../frontend/app'));

var server = app.listen(8081, function() {
    var port = server.address().port;
    console.log('Server listening on port', port);
});

module.exports = server;
