## CheckCloudIhm

### Endpoint
Pour accéder directement à l'outil
  - [http://sit/sys/was/cloud/monitor](http://sit/sys/was/cloud/monitor)  

Attention ! Le navigateur doit etre lancé d'une certaine manière pour que l'outil puisse fonctionner.  
Se reporter aux instructions du paragraphe __Utilisation__  

### Description
__CheckCloudIhm__ est une interface graphique permettant aux administrateurs du Cloud Privé de vérifier le bon fonctionnement des applications Cloud sur chaque environnement.  
L'outil s'appuie sur un [inventaire généré périodiquement]() pour récupérer l'ensemble des applications et teste l'appel aux pages de status des différentes applications (mises a disposition par les socles techniques), permettant de présenter un tableau de toutes les applications avec le status associé

### Utilisation
__A LIRE__ La version actuelle de l'outil impose le lancement du navigateur Chrome d'une manière spécifique (en désactivant la sécurité CORS) de facon à ce que les pages AngularJS puissent émettre des requetes http vers les pages de status qui sont hébergées sur un host différent.
Ci dessous, un exemple de lancement du navigateur _Chrome_ sur un poste standard Probtp Windows 10
 
```bash
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --user-data-dir="c:/temp/Chromedevsession" --disable-web-security
```

### Configuration  
Dans la version actuelle, certains paramètres de l'application peuvent etre retouchés directement dans les fichiers de constantes
  - _app-constants.js_ - Configuration générale
    - nom de l'application
    - version
    - lien github (vers cette documentation) 
    - environnement par défaut à la connexion a la page principale 
    - lien vers les services REST d'inventaire
    - timeouts sur les chargement des inventaires...
  - _statuspage-constants_ - Configuration relative aux pages de status
    - timeout sur les requetes aux pages de status
    - pattern permettant d'indiquer qu'une application est OK
    - listing des différents états possibles pour une application  

Dans un prochaine version, ces paramètres seront exportés vers un fichier _config.json_ de manière a ne pas avoir besoin de retoucher les fichiers JS


### Livraison
Pour livrer une nouvelle version du l'outil
  - incrémenter le numéro de version dans le fichier _app-constants.js_
  - copier l'ensemble du projet dans [\\\\pwadmin01\D$\WebServer\data\SYS\was\cloud\monitor](\\\\pwadmin01\D$\WebServer\data\SYS\was\cloud\monitor)
