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

            .state('admin-home', {
                url: "/admin/home",
                templateUrl: "templates/admin/home.html",
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            })


            .state('admin-edit-ad', {
                url: "/admin/ads/edit/:adId",
                templateUrl: "templates/admin/edit-ad.html",
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            })

            .state('admin-delete-ad', {
                url: "/admin/ads/delete/:adId",
                templateUrl: "templates/admin/delete-ad.html",
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            })
            .state('admin-users', {
                url: "/admin/users/list",
                templateUrl: "templates/admin/users-list.html",
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            })
            .state('admin-user-edit', {
                url: "/admin/users/edit/:userId",
                templateUrl: "templates/admin/users-edit.html",
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            })
            .state('admin-user-delete', {
                url: "/admin/users/delete/:userId",
                templateUrl: "templates/admin/users-delete.html",
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            }).state('admin-towns-list', {
                url: "/admin/towns/list",
                templateUrl: "templates/admin/towns-categories-list.html",
                controller: 'AdminTownsListController',
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            })
            .state('admin-towns-create', {
                url: "/admin/towns/create",
                templateUrl: "templates/admin/towns-categories-create-edit-delete.html",
                controller: 'AdminTownCreateController',
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            }).state('admin-towns-edit', {
                url: "/admin/towns/edit/:townId",
                templateUrl: "templates/admin/towns-categories-create-edit-delete.html",
                controller: 'AdminTownEditController',
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            }).state('admin-towns-delete', {
                url: "/admin/towns/delete/:townId",
                templateUrl: "templates/admin/towns-categories-create-edit-delete.html",
                controller: 'AdminTownDeleteController',
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            }).state('admin-categories-list', {
                url: "/admin/categories/list",
                templateUrl: "templates/admin/towns-categories-list.html",
                controller: 'AdminCategoriesListController',
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            }).state('admin-categories-edit', {
                url: "/admin/categories/edit/:categoryId",
                templateUrl: "templates/admin/towns-categories-create-edit-delete.html",
                controller: 'AdminCategoriesEditController',
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            }).state('admin-categories-delete', {
                url: "/admin/categories/delete/:categoryId",
                templateUrl: "templates/admin/towns-categories-create-edit-delete.html",
                controller: 'AdminCategoriesDeleteController',
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            }).state('admin-categories-create', {
                url: "/admin/categories/create",
                templateUrl: "templates/admin/towns-categories-create-edit-delete.html",
                controller: 'AdminCategoriesCreateController',
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'home'
                    }
                }
            });
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