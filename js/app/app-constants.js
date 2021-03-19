(function(ng) {'use strict'; //NOSONAR
ng.module('app')		            
    .constant('MYAPI', 'api/hereiam.php')
    // La version de l'outil, a incrementer a chaque livraison
    .constant('VERSION', '1.1.0');
}(angular));