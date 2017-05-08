describe('gamesServiceTest', function() {

    var gamesService;

    beforeEach(function() {
        module('videoGamesApp');

        inject(function(_gamesService_) {
            gamesService = _gamesService_;
        });
    });

    describe('gamesService', function() {
        var formData = {};
        gamesService.getGames(formData)
            .then(function(data) {
                console.log('SUCCESS');
                console.log(data);
            }, function(err) {
                console.log('ERROR in getGames()', err);
            });

    });
});
