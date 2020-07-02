<?php
include_once($_SERVER['DOCUMENT_ROOT']."/conf/connect.php");
$requested_method = $_SERVER["REQUEST_METHOD"];
$rep = "";
$httprc = "";
$http200 = "HTTP/1.1 200 OK";
$http500 = "HTTP/1.1 500 Internal Server Error";

switch ($requested_method){
    case "GET" : {
        $query= "select lat, lng, timepoint from garnierpascalweb.hereiam order by timepoint ASC";
        $result = mysql_query($query, $LINK);
        $numResults = mysql_num_rows($result);
        $counter = 0;
        $json="[";
        while ($row = mysql_fetch_array ($result)) {    
            $json .= "{";
            $json .= "\"lat\":"."\"".$row["lat"]."\",";
            $json .= "\"lng\":"."\"".$row["lng"]."\","; 
            $json .= "\"timepoint\":"."\"".$row["timepoint"]."\""; 
            if (++$counter == $numResults) {
                $json .= "}";
            } else {
                $json .= "},";
            }
        }
        $json .= "]";            
        $rep = $json;
        $httprc = $http200;
        break;
    }
    case "POST" : {
        $data = file_get_contents("php://input");
        $tokens = explode(";", $data);
        $lat = $tokens[0];
        $lng = $tokens[1];
        // $currentTime = date("Y-m-d-H-i");
        $currentTime = date("U");
        $query= "insert into garnierpascalweb.hereiam values ('".$lat."', '".$lng."', '".$currentTime."')";   
        $success = mysql_query($query, $LINK); 
        if ($success){
            $rep = "Coordonnees ".$lat." ".$lng." envoyées sur le backend!";
            $httprc = $http200;
        } else {
            $rep = "Probleme lors de l'envoi des données sur le backend";
            $httprc = $http500;
        }
        break;
    }
    case "DELETE" : {
        $data = file_get_contents("php://input");
        $tokens = explode(";", $data);
        $lat = $tokens[0];
        $lng = $tokens[1];
        $currentTime = date("Y-m-d-H-i");
        $query= "delete from  garnierpascalweb.hereiam";   
        $success = mysql_query($query, $LINK);    
        if ($success){
            $rep = "Suppression de tous les points de la carte effectuée";
            $httprc = $http200;
        } else {
            $rep = "Probleme lors de la suppression de tous les points de la carte";
            $httprc = $http500;
        }

        break;
    }
}
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,OPTIONS,DELETE");  
header("Access-Control-Allow-Headers: Content-Type, Date, Server");  
header($httprc);
echo $rep;
?>

