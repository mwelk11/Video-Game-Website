var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('serverTest', function() {
    var server;
    var db;

    // Establish DB connection and clear test DB before each test
    beforeEach(function() {
        process.env.NODE_ENV = 'test';
        // Delete cached instance of server so a fresh server is created 
        // for each unit test
        delete require.cache[require.resolve('../../src/backend/server')];
        server = require('../../src/backend/server');
        db = require('../../src/backend/database/db.js');
        db.clear('VideoGames', function(err) {
            if(err) {
                console.log('Error clearing Customers table: ' + err);
            }
        });
    });
    
    afterEach(function(done) {
        server.close(done);
    });

    it('should respond with all games on /games POST with empty body', function testGamesPostWithEmptyBody(done) {
        insertTestVideoGame(12, 'TestGame', 'TestPublisher', 'TestGenre', 2015, 8.4);

        chai.request(server)
            .post('/games')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body[0].ID.should.equal(12);
                res.body[0].Title.should.equal('TestGame');
                res.body[0].Publisher.should.equal('TestPublisher');
                res.body[0].Genre.should.equal('TestGenre');
                res.body[0].Year.should.equal(2015);
                res.body[0].Rating.should.equal(8.4);
                done();
            });
    });

    it('should respond with only games matching publisher passed in body on /games POST', function testGamesPostWithPopulatedBody(done) {
        insertTestVideoGame(1, 'TestGame1', 'Publisher1', 'TestGenre1', 2017, 8.8);
        insertTestVideoGame(2, 'TestGame2', 'Publisher1', 'TestGenre2', 2016, 7);
        insertTestVideoGame(3, 'TestGame3', 'Publisher2', 'TestGenre3', 2015, 4.5);

        var formData = {
            Publisher: 'Publisher1'
        };

         chai.request(server)
            .post('/games')
            .send(formData)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.should.have.property('body').with.lengthOf(2);
                res.body[0].ID.should.equal(1);
                res.body[0].Title.should.equal('TestGame1');
                res.body[0].Publisher.should.equal('Publisher1');
                res.body[0].Genre.should.equal('TestGenre1');
                res.body[1].ID.should.equal(2);
                res.body[1].Title.should.equal('TestGame2');
                res.body[1].Publisher.should.equal('Publisher1');
                res.body[1].Genre.should.equal('TestGenre2');
                done();
            });       
    });

    function insertTestVideoGame(id, title, publisher, genre, year, rating) {
        // Create and insert a video game to the test DB
        var testVideoGame = {
            ID: id,
            Title: title,
            Publisher: publisher,
            Genre: genre,
            Year: year,
            Rating: rating
        };
        db.insert('VideoGames', testVideoGame, function(err) {
            if(err) {
                console.log('ERROR inserting VideoGame: ', err);
            }
        });
    };
});
