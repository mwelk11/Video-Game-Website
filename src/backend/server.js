var express = require('express');
var app = express();
var path = require('path');
var db = require('./database/db.js');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../frontend/app'));
app.use(bodyParser.json());

app.post('/games', function(req, res) {
    db.getGames(req.body, function(err, rows) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(rows);
        }
    });
});

app.post('/insertGame', function(req, res) {
    db.insertGame(req.body, function(err, result) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
});

var server;
db.connect(function(err) {
    if(err) {
        console.log('ERROR connecting to', db.dbName, ': ', err);
        process.exit(1);
    } else {
        console.log('Connection established to', db.dbName);
        server = app.listen(8081, function() {
            var port = server.address().port;

            console.log('Server listening on port', port);
        });
    }
});

module.exports = server;
