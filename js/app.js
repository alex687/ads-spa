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
            .state('logout', {
                url: "/logout",
                controller: 'LogoutController',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'login'
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
                controller: 'PublishAdController',
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
            .state('user-ad-edit', {
                url: "/user/ads/edit/:adId",
                templateUrl: "templates/publish-ad.html",
                controller: 'EditAdController',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'login'
                    }
                }
            })
            .state('user-ad-delete', {
                url: "/user/ads/delete/:adId",
                templateUrl: "templates/delete-ad.html",
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'login'
                    }
                }
            })
            .state('user-profile', {
                url: "/user/profile",
                templateUrl: "templates/profile-edit.html",
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
    .run(function (Permission, authorization, $http) {

        $http.defaults.transformRequest.push(function (data, headersGetter) {
            var currentHeaders = headersGetter();
            if (currentHeaders.Authorization) {
                currentHeaders.Authorization = authorization.getHeaders();
            }
            return data;
        });

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