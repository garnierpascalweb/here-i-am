(function (ng) {
    'use strict'; //NOSONAR
    ng.module('hereiam')
        .service('HereIAmService', HereIAmService);
    HereIAmService.$inject = ['$log', '$q', '$http'];
    function HereIAmService($log, $q, $http) {
        var service = this;

        service.getRoute = getRoute;
        service.setPosition = setPosition;

        function getRoute() {
            var deferred = $q.defer();
            var promise = $http.get("https://garnierpascalweb.free.fr/api/hereiam.php");
            promise.success(function (data) {
                deferred.resolve(data);
            }).error(deferred.reject);
            return deferred.promise;
        };

        function setPosition() {
            var deferred = $q.defer();
            if (navigator.geolocation) {                
                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    var data = lat + ";" + lng;
                    var promise = $http.post("https://garnierpascalweb.free.fr/api/hereiam.php", data);
                    promise.success(function (data) {
                        deferred.resolve(data);
                    }).error(deferred.reject);
                });
            } else {
                deferred.reject("pas de geoloc sur ton browser de merde");
            }
            return deferred.promise;
        };
        return service;
    }
}(angular));