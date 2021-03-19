(function (ng) {
    'use strict'; //NOSONAR
    ng.module('show')
        .service('ShowService', ShowService);
        ShowService.$inject = ['$log', '$q', '$http', 'MYAPI'];
    function ShowService($log, $q, $http,MYAPI) {
        var service = {};
        service.route = [];
        service.init = init;
        service.getRoute = getRoute;
        service.loadRoute = loadRoute;      

        function init(){
            $log.info("[show-service.js] - appel de init"); 
            var deferred = $q.defer();
            var routePromise = loadRoute();
            $q.all([routePromise]).then(function(value) {
                deferred.resolve();
                $log.info("[show-service.js] - init resolved");
            }, function (reason) {
                deferred.reject();
                $log.info("[show-service.js] - init rejected");
            });
            return deferred.promise;
        }

        function loadRoute() {                       
            var promise = $http.get(MYAPI);
            promise.then(function (data) {            
                service.route = data.data;
                $log.info("[show-service.js] - succes de loadRoute " + JSON.stringify(service.route));   
            }, function (reason){

            });
            $log.info("[show-service.js] - rendu de la promesse");
            return promise;
        };

        function getRoute() {
            return service.route;
        };
       
        return service;
    }
}(angular));