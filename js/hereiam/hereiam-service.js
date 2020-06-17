(function (ng) {
    'use strict'; //NOSONAR
    ng.module('hereiam')
        .service('HereIAmService', HereIAmService);
    HereIAmService.$inject = ['$log', '$q', '$http'];
    function HereIAmService($log, $q, $http) {
        var service = {};
        service.route = [];
        service.init = init;
        service.getRoute = getRoute;
        service.loadRoute = loadRoute;
        service.setPosition = setPosition;

        function init(){
            $log.info("[hereiam-service.js] - appel de init"); 
            var deferred = $q.defer();
            var routePromise = loadRoute();
            $q.all([routePromise]).then(function(value) {
                deferred.resolve();
                $log.info("[hereiam-service.js] - init resolved");
            }, function (reason) {
                deferred.reject();
                $log.info("[hereiam-service.js] - init rejected");
            });
            return deferred.promise;
        }

        function loadRoute() {
            var url = "https://cors-anywhere.herokuapp.com/http://garnierpascalweb.free.fr/api/hereiam.php";
            $log.info("[hereiam-service.js] - appel de loadRoute sur " + url);            
            var promise = $http.get(url);
            promise.then(function (data) {            
                service.route = data.data;
                $log.info("[hereiam-service.js] - succes de loadRoute " + JSON.stringify(service.route));   
            }, function (reason){

            });
            $log.info("[hereiam-service.js] - rendu de la promesse");
            return promise;
        };

        function getRoute() {
            return service.route;
        };

        function setPosition() {
            $log.info("[hereiam-service.js] - appel de setOpsition");
            var deferred = $q.defer();
            if (navigator.geolocation) {
                $log.info("[hereiam-service.js] - geoloc supportee");               
                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    var data = lat + ";" + lng;
                    $log.info("[hereiam-service.js] - appel du backend");      
                    $log.info("[hereiam-service.js] - data " + data);      
                    var promise = $http.post("https://cors-anywhere.herokuapp.com/http://garnierpascalweb.free.fr/api/hereiam.php", data);
                    promise.success(function (data) {
                        deferred.resolve(data);
                    }).error(deferred.reject);
                });
            } else {
                $log.info("[hereiam-service.js] - geoloc non supportee");      
                deferred.reject("pas de geoloc sur ton browser de merde");
            }
            return deferred.promise;
        };
        return service;
    }
}(angular));