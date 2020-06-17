(function (ng) {
    'use strict'; //NOSONAR
    ng.module('test')
        .controller('TestController', TestController);
        TestController.$inject = ['$log'];
    function TestController($log) {
        var vm = this;
        vm.message="coucou controller";
    }
}(angular));