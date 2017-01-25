'use strict';

app.controller('RankedListsCtrl', function($scope, gamesService) {

    $scope.formData = {};
    $scope.sortType = 'Rating'; // default sort
    $scope.sortReverse = true;
    $scope.searchGames = '';

    $scope.getGames = function() {
        gamesService.getGames()
            .then(function(data) {
                $scope.games = data;
            }, function(error) {
                console.log('ERROR in getGames(): ', error);
            });
    };
});
