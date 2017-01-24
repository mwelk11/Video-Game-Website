'use strict';

app.controller('RankedListsCtrl', function($scope, gamesService) {
    $scope.message = "RANKED LIST MESSAGE!!!";

    $scope.getGames = function() {
        gamesService.getGames()
            .then(function(data) {
                $scope.games = data;
            }, function(error) {
                console.log('ERROR in getGames(): ', error);
            });
    };
});
