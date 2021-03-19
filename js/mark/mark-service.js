(function (ng) {
    'use strict'; //NOSONAR
    ng.module('mark')
        .service('MarkService', MarkService);
        MarkService.$inject = ['$log', '$q', '$http', 'MYAPI'];
    function MarkService($log, $q, $http, MYAPI) {
        var service = {};            
        service.setPosition = setPosition;
        service.trash = trash;
               
        function setPosition() {
            $log.info("[mark-service.js] - appel de setPosition");
            var deferred = $q.defer();
            if (navigator.geolocation) {
                $log.info("[mark-service.js] - geoloc supportee");               
                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    var data = lat + ";" + lng;
                    $log.info("[mark-service.js] - appel du backend");      
                    $log.info("[mark-service.js] - data " + data);      
                    var promise = $http.post(MYAPI, data);
                    promise.success(function (data) {
                        deferred.resolve(data);
                        $log.info("[mark-service.js] - requete traitee avec succes ");    
                    }).error(deferred.reject);
                });
            } else {
                $log.info("[mark-service.js] - geoloc non supportee");      
                deferred.reject("pas de geoloc sur ton browser de merde");
            }
            return deferred.promise;
        };

        function trash(){
            $log.info("[mark-service.js] - appel de trash");
            var deferred = $q.defer();
            var promise = $http.delete(MYAPI);
            promise.success(function (data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        }
        return service;
    }
}(angular));