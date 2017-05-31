describe('gamesServiceTest', function() {

    var gamesService;

    beforeEach(function() {
        module('videoGamesApp');

        inject(function(_gamesService_) {
            gamesService = _gamesService_;
        });
    });

    describe('gamesService', function() {
        it('should pass', function() {
            console.log('WOOO');
        });
    });
});
