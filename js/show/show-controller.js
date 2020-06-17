(function (ng) {
    'use strict'; //NOSONAR
    ng.module('show')
        .controller('ShowController', ShowController);
    ShowController.$inject = ['$log', '$filter', 'ShowService'];
    function ShowController($log, $filter, ShowService) {
        var vm = this;
        vm.message = "Chargement en cours...";
        vm.onLoad = onLoad;


        function onLoad() {
            $log.info("[show-controller.js] - recuperation de la route");
            var data = ShowService.getRoute();
            var size = data.length;

            if (size > 0) {
                $log.info("[show-controller.js] - " + size + " points identifies");
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
                    var mytime = new Date(row.timepoint*1000);
                    var readable = $filter('date')(mytime, 'dd/MM/yyyy HH:mm');
                    marker.bindPopup("<b>Here I Was at " + readable + "</b><br>" + row.lat + "-" + row.lng).openPopup();
                    $log.info("[show-controller.js] - ajout du marker " + row.lat + "-" + row.lng);
                });
                vm.message = size + " points enregistrés";
            } else {
                vm.message = "Pas de points enregistrés";
            }
            $log.info("[show-controller.js] - fin appel de onLoad");
        }
        onLoad();
    }
}(angular));