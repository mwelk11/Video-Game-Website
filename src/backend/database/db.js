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
    checkConnection(done);
    con.query('SELECT * FROM ??', table, function(err, rows) {
        if(err) {
            console.log("ERROR = " + err);
            return done(new Error('ERROR getting table rows: ', err));
        }
        return done(null, rows);
    });
}

// Return game that matches incoming ID
exports.getGame = function(id, done) {
    checkConnection(done);
    con.query('SELECT * FROM VideoGames WHERE ID = ?', id, function(err, rows) {
        if(err) {
            return done(new Error('ERROR getting ID ' + id + ': ' + err));
        }
        return done(null, rows);
    });
}

// Return games that match the search criteria
exports.getGames = function(params, done) {
    var conditions = buildSearchConditions(params);
    checkConnection(done);
    con.query('SELECT * FROM VideoGames WHERE ' + conditions.where, conditions.values, function(err, rows) {
        if(err) {
            return done(new Error('ERROR getting search results: ' + err));
        } else {
            return done(null, rows);
        }
    });
}

// Insert a game into the VideoGames table
exports.insertGame = function(params, done) {
    checkConnection(done);
    con.query('INSERT INTO VideoGames SET ?', params, function(err, result) {
        if(err) {
            return done(new Error('ERROR inserting game: ' + err));
        } else {
            return done(null, result);
        }
    });
}

// Clear specified table
exports.clear = function(table, done) {
    checkConnection(done);
    con.query('TRUNCATE TABLE ??', table, done);
}

// Insert json object into specified table
exports.insert = function(table, object, done) {
    checkConnection(done);
    con.query('INSERT INTO ?? SET ?', [table, object], function(err, result) {
        if(err) {
            return done(new Error('ERROR inserting into ' + table + ': ' + err));
        } else {
            return done(null, result);
        }
    });
}

function buildSearchConditions(params) {
    var conditions = [];
    var values = [];
    
    for(var key in params) {
        console.log("PARAMS ==> " + key + "=" + params[key]);
        if(typeof params[key] !== 'undefined') {
            conditions.push(key + " LIKE ?");
            values.push("%" + params[key] + "%");
        }
    }

    return {
        where: conditions.length ? conditions.join(' AND ') : '1',
        values: values
    };
}

function checkConnection(done) {
    if(!con) {
        return done(new Error('Missing DB connection!'));
    }
}
