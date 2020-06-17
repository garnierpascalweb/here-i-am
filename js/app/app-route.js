(function(ng) {'use strict'; //NOSONAR
    ng.module('app')		
		// configuration dun Service de la librairie angular-ui-router
        .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
            $stateProvider            
            .state('hereiam', {
                //parent: 'depot-parent',
                url: '/hereiam/',
                views:  {                  
                    content: {
                        templateUrl: 'html/hereiam/hereiam.html',
                        controller: 'HereIAmController as vm',
                        resolve : {
                            promiseObj : function (HereIAmService){
                                return HereIAmService.init();
                            }
                        }					 
                    }                  
                }                             
            });
            // route par dfaut, si / alors redirection vers /recherche
            $urlRouterProvider.otherwise('/hereiam/');
        }]);		
}(angular));