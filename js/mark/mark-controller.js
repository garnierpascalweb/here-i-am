(function (ng) {
    'use strict'; //NOSONAR
    ng.module('mark')
        .controller('MarkController', MarkController);
        MarkController.$inject = ['$log', '$timeout', 'MarkService'];
    function MarkController($log, $timeout, MarkService) {
        var vm = this;
        vm.message = {};
        vm.message.class = "alert alert-info";
        vm.message.value = "Pret pour une localisation";    
        vm.setColor = setColor;  
        vm.setPosition = setPosition;
        vm.trash = trash;
        vm.color = "white";

        /**
         * Reinitialisation de l'écran
         */
        function setColor(inColor){
            vm.color = inColor;
        }

        /**
         * Permet d'envoyer sa position au backend
         */
        function setPosition() {
            var promise = MarkService.setPosition();
            vm.message.value="Appel en cours...";
            vm.message.class = "alert alert-warning";
            vm.color = "#e17055";
            promise.then(function (data) {
                vm.message.value = data;
                vm.message.class = "alert alert-success";
                vm.color = "#2ecc71";
                $timeout(function () {
                    vm.color = "white";
                    vm.message.class = "alert alert-info";
                    vm.message.value = "Pret pour une localisation";          
                }, 5000);               
            }, function (reason) {
                vm.message = reason;
                vm.message.class = "alert alert-danger";
                vm.color = "#e74c3c";
                $timeout(function () {
                    vm.color = "white";
                    vm.message.class = "alert alert-info";
                    vm.message.value = "Pret pour une localisation";          
                }, 5000); 
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