<?php
include_once($_SERVER['DOCUMENT_ROOT'] . "/conf/DbConn.php");
$httprc = $http200;
try {
    $dbConn = new DbConn();
    $pdo = $dbConn->getPdo();
    $requested_method = $_SERVER["REQUEST_METHOD"];
    $http200 = "HTTP/1.1 200 OK";
    $http500 = "HTTP/1.1 500 Internal Server Error";


    switch ($requested_method) {
        case 'GET': {
                $query = "select lat, lng, timepoint from hereiam order by timepoint ASC";
                $statement = $pdo->prepare($query);
                $statement->execute();
                $results = $statement->fetchAll(PDO::FETCH_ASSOC);
                $json = json_encode($results);
                $rep = $json;
                $httprc = $http200;
                break;
            }
        case 'POST': {
                /*
                $data = file_get_contents("php://input");
                $tokens = explode(";", $data);
                $lat = $tokens[0];
                $lng = $tokens[1];
                // $currentTime = date("Y-m-d-H-i");
                $currentTime = date("U");
                $query = "insert into garnierpascalweb.hereiam values ('" . $lat . "', '" . $lng . "', '" . $currentTime . "')";
                $success = mysql_query($query, $LINK);
                if ($success) {
                    $rep = "Coordonnees " . $lat . " " . $lng . " envoyées sur le backend!";
                    $httprc = $http200;
                } else {
                    $rep = "Probleme lors de l'envoi des données sur le backend";
                    $httprc = $http500;
                }
                break;
                */
                $data = file_get_contents("php://input"); 
                $tokens = explode(";", $data);
                $lat = $tokens[0];
                $lng = $tokens[1];
                // $currentTime = date("Y-m-d-H-i");
                $currentTime = date("U");                              
                $query = "insert into hereiam (lat,lng,timepoint) values (:lat, :lng, :timepoint)";
                $statement = $pdo->prepare($query);
                $statement->bindParam(':lat', $lat);
                $statement->bindParam(':lng', $lng);
                $statement->bindParam(':timepoint', $currentTime);
                $statement->execute();            
                $httprc = $http200;
                break;
            }
        case 'DELETE': {
                /*
                $data = file_get_contents("php://input");
                $tokens = explode(";", $data);
                $lat = $tokens[0];
                $lng = $tokens[1];
                $currentTime = date("Y-m-d-H-i");
                $query = "delete from  garnierpascalweb.hereiam";
                $success = mysql_query($query, $LINK);
                if ($success) {
                    $rep = "Suppression de tous les points de la carte effectuée";
                    $httprc = $http200;
                } else {
                    $rep = "Probleme lors de la suppression de tous les points de la carte";
                    $httprc = $http500;
                }
                break;
                */
                $httprc = $http200;
                break;
            }
    }

    // Pour le GET, echo REP
} catch (Exception $e) {
    $rep = "Probleme technique ".$e->getMessage();
    $httprc = $http500;
} finally {
}
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,OPTIONS,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Date, Server");
header($httprc);
echo $rep;
