'use strict';

app.controller('AddGameCtrl', function($scope, gamesService) {

    $scope.formData = {};

    $scope.addGame = function() {
        gamesService.insertGame($scope.formData)
            .then(function(data) {
                $scope.respData = data;
                alert('SUCCESS!');
                console.log('DATA = ', data);
            }, function(error) {
                console.log('Error in insertGame');
            });

        $scope.addGamesForm.$setPristine;
        $scope.formData = {};
    }; 
});
