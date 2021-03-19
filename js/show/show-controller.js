(function (ng) {
    'use strict'; //NOSONAR
    ng.module('show')
        .controller('ShowController', ShowController);
    ShowController.$inject = ['$log', '$filter', 'ShowService', 'VERSION'];
    function ShowController($log, $filter, ShowService, VERSION) {
        var vm = this;
        vm.version = VERSION;
        vm.message = {};
        vm.message.class = "alert alert-info";
        vm.message.value = "";    
        vm.onLoad = onLoad;

        vm.getReadableDate = getReadableDate;


        function onLoad() {
            $log.info("[show-controller.js] - recuperation de la route");
            var data = ShowService.getRoute();
            var size = data.length;

            if (size > 0) {
                $log.info("[show-controller.js] - " + size + " points identifies");
                var lastPoint = data[size - 1];
                $log.info("[show-controller.js] - centre sur " + lastPoint.lat + " " + lastPoint.lng);
                var mymap = L.map('mapid', {
                    center: [lastPoint.lat, lastPoint.lng],
                    zoom: 13
                });
                var lastPointReadableDate = getReadableDate(lastPoint.timepoint);

                //var mymap = L.map('mapid').setView([currentPoint.lat, currentPoint.lng], 13);
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
                    var readable = getReadableDate(row.timepoint);
                    marker.bindPopup("<b>Here I Was at " + readable + "</b><br>" + row.lat + "-" + row.lng).openPopup();
                    $log.info("[show-controller.js] - ajout du marker " + row.lat + "-" + row.lng);
                });
                vm.message.value = size + " traces de passage détectées : dernière en date le " + lastPointReadableDate;
            } else {
                vm.message.value = "Pas de points enregistrés";
            }
            $log.info("[show-controller.js] - fin appel de onLoad");
        }

        function getReadableDate(timepoint){
            var mytime = new Date(timepoint*1000);
            var readable = $filter('date')(mytime, 'dd/MM/yyyy HH:mm');
            return readable;
        }
        onLoad();
    }
}(angular));