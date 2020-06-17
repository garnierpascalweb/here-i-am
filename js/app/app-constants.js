(function(ng) {'use strict'; //NOSONAR
ng.module('app')		    
    // le nom de l'outil, qui apparait en haut a gauche de la navbar
    .constant('APPNAME', 'MonApp')
    // la documentation de l'outil , lien vers la page gitlab
    .constant('APPDOC', 'https://gitlab.probtp/DIPI-SIT-ITWEB/CheckCloudIhm')
    // La version de l'outil, a incrementer a chaque livraison
    .constant('VERSION', '1.1.0');
}(angular));