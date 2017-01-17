'use strict';

/**
 * @ngdoc overview
 * @name videoGamesApp
 * @description
 * # videoGamesApp
 *
 * Main module of the application.
 */
var app = angular.module('videoGamesApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .when('/rankedLists', {
            templateUrl: 'views/rankedLists.html',
            controller: 'RankedListsCtrl'
        })
        .when('/addGame', {
            templateUrl: 'views/addGame.html',
            controller: 'AddGameCtrl'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
});

