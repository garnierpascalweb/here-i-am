(function (ng) {
    'use strict'; //NOSONAR
    ng.module('app')
    .service('AppService', AppService);
    AppService.$inject = ['$log', '$http', '$location'];
    function AppService($log, $http, $location) {
        var service = {};        
        return service;
    }
} (angular));