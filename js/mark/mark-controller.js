(function (ng) {
    'use strict'; //NOSONAR
    ng.module('mark')
        .controller('MarkController', MarkController);
        MarkController.$inject = ['$log', 'MarkService'];
    function MarkController($log, MarkService) {
        var vm = this;
        vm.message = {};
        vm.message.class = "alert alert-info";
        vm.message.value = "Where are you";      
        vm.setPosition = setPosition;
        vm.trash = trash;

        /**
         * Permet d'envoyer sa position au backend
         */
        function setPosition() {
            var promise = MarkService.setPosition();
            promise.then(function (data) {
                vm.message.value = data;
                vm.message.class = "alert alert-success";
            }, function (reason) {
                vm.message = reason;
                vm.message.class = "alert alert-danger";
            });
        }        

        /**
         * Permet de flinguer l'ensemble des points
         */
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