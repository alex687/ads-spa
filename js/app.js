'use strict';

var adsApp = angular
    .module('adsApp', ['ngResource', 'ui.bootstrap', 'ipCookie', 'ui.router', 'permission'])
    .config(function ($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");
        //
        // Now set up the states
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "templates/home.html"
            })
            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                data: {
                    permissions: {
                        only: ['anonymous'],
                        redirectTo: 'home'
                    }
                }
            })
            .state('register', {
                url: "/register",
                templateUrl: "templates/register.html",
                data: {
                    permissions: {
                        only: ['anonymous'],
                        redirectTo: 'home'
                    }
                }
            })
            .state('publish', {
                url: "/user/ads/publish",
                templateUrl: "templates/publish-ad.html",
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'login'
                    }
                }
            })
            .state('user-ads', {
                url: "/user/ads/",
                templateUrl: "templates/user-ads.html",
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'login'
                    }
                }
            })
    })
    .constant('serviceBaseUrl', 'http://softuni-ads.azurewebsites.net/api/')
    .constant('pageSize', 5)
    .run(function (Permission, authorization) {

        Permission.defineRole('anonymous', function (stateParams) {
            return !authorization.isUser();
        });

        Permission.defineRole('user', function (stateParams) {
            return authorization.isUser();
        });

        Permission.defineRole('admin', function (stateParams) {
            return authorization.isAdmin();
        });
    });