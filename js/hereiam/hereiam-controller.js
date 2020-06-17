(function (ng) {
    'use strict'; //NOSONAR
    ng.module('hereiam')
        .controller('HereIAmController', HereIAmController);
    HereIAmController.$inject = ['$log', 'HereIAmService'];
    function HereIAmController($log, HereIAmService) {
        var vm = this;
        vm.message = "coucou controller";
        vm.onLoad = onLoad;
        vm.setPosition = setPosition;


        function onLoad() {           
            $log.info("[hereiam-controller.js] - recuperation de la route");
            var data = HereIAmService.getRoute();
            var size = data.length;
            $log.info("[hereiam-controller.js] - " + size + " points identifies");
            var currentPoint = data[size - 1];
            var mymap = L.map('mapid').setView([currentPoint.lat, currentPoint.lng], 13);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1
            }).addTo(mymap);
            angular.forEach(data, function (row) {
                var marker = L.marker([row.lat, row.lng]).addTo(mymap);                
                marker.bindPopup("<b>Here I Was at " + row.timepoint + "</b><br>" + row.lat + "  " + row.lng).openPopup();
                $log.info("[hereiam-controller.js] - ajout du marker " + row.lat + " " + row.lng);
            });
            $log.info("[hereiam-controller.js] - fin appel de onLoad");
        }

        function setPosition() {
            var promise = HereIAmService.setPosition();
            promise.then(function (data) {
                vm.message = data;
            }, function (reason) {
                vm.message = reason;
            });
        }
        onLoad();
    }
}(angular));