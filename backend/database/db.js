// db.js
//
// Class to establish database connections and define database utility 
// functions used for testing.

var mysql = require('mysql');
var env = process.env.NODE_ENV || 'development';
var dbConfig = require('./dbConfig.js')[env];

var con;

exports.dbName = dbConfig.database;

// Make connection to database
exports.connect = function(done) {
    con = mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database
    });
    done();
}

// Return database connection
exports.get = function() {
    return con;
}

// Return all rows of specified table
exports.getAll = function(table, done) {
    if(!con) {
        return done(new Error('Missing DB connection!'));
    }
    con.query('SELECT * FROM ' + table, function(err, rows) {
        if(err) {
            return done(new Error('ERROR getting table rows: ', err));
        }
        return done(null, rows);
    });
}

// Return game that matches incoming ID
exports.getGame = function(id, done) {
    if(!con) {
        return done(new Error('Missing DB connection!'));
    }
    con.query('SELECT * FROM VideoGames WHERE ID = ' + id, function(err, rows) {
        if(err) {
            return done(new Error('ERROR getting ID ' + id + ': ' + err));
        }
        return done(null, rows);
    });
}

// Clear specified table
exports.clear = function(table, done) {
    if(!con) {
        return done(new Error('Missing DB connection!'));
    }
    con.query('TRUNCATE TABLE ' + table, done);
}

// Insert json object into specified table
exports.insert = function(table, object, done) {
    if(!con) {
        return done(new Error('Missing DB connection!'));
    }
    con.query('INSERT INTO ' + table + ' SET ?', object, done);
}
