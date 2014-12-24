'use strict';

var adsApp = angular
    .module('adsApp', ['ngResource', 'ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html'
            })
            .when('/login', {
                templateUrl: 'templates/login.html'
            })
            .when('/register', {
                templateUrl: 'templates/register.html'
            })
            .when('/user/home', {
                templateUrl: 'templates/edit-artist.html'
            })
            .otherwise({redirectTo: '/'});
    }).
    constant('serviceBaseUrl', 'http://softuni-ads.azurewebsites.net/api/');