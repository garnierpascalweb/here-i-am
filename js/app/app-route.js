(function(ng) {'use strict'; //NOSONAR
    ng.module('app')		
		// configuration dun Service de la librairie angular-ui-router
        .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
            $stateProvider            
            .state('show', {
                //parent: 'depot-parent',
                url: '/show/',
                views:  {                  
                    content: {
                        templateUrl: 'html/hereiam/show.html',
                        controller: 'ShowController as vm',
                        resolve : {
                            promiseObj : function (ShowService){
                                return ShowService.init();
                            }
                        }					 
                    }                  
                }                             
            }).state('mark', {
                //parent: 'depot-parent',
                url: '/mark/',
                views:  {                  
                    content: {
                        templateUrl: 'html/hereiam/mark.html',
                        controller: 'MarkController as vm'                         
                    }                  
                }                             
            });
        
            // route par dfaut, si / alors redirection vers /recherche
            $urlRouterProvider.otherwise('/show/');
        }]);		
}(angular));