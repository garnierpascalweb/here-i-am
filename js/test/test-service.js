(function (ng) {
    'use strict'; //NOSONAR
    ng.module('test')
        .service('TestService', TestService);
        TestService.$inject = ['$log'];
    function TestService($log) {
        var service = {};        
        return service;
    }
}(angular));