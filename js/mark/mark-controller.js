(function (ng) {
    'use strict'; //NOSONAR
    ng.module('mark')
        .controller('MarkController', MarkController);
        MarkController.$inject = ['$log', 'MarkService'];
    function MarkController($log, MarkService) {
        var vm = this;
        vm.message = "MarkController controller";      
        vm.setPosition = setPosition;
        vm.trash = trash;

        function setPosition() {
            var promise = MarkService.setPosition();
            promise.then(function (data) {
                vm.message = data;
            }, function (reason) {
                vm.message = reason;
            });
        }        

        function trash() {
            var promise = MarkService.trash();
            promise.then(function (data) {
                vm.message = data;
            }, function (reason) {
                vm.message = reason;
            });
        }  
    }
}(angular));