<?php
include_once($_SERVER['DOCUMENT_ROOT']."/conf/connect.php");
$requested_method = $_SERVER["REQUEST_METHOD"];
$rep = "";

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
        break;
    }
    case "POST" : {
        $data = file_get_contents("php://input");
        $tokens = explode(";", $data);
        $lat = $tokens[0];
        $lng = $tokens[1];
        $currentTime = date("Y-m-d-H-i");
        $query= "insert into hereiam values ('".$lat."', '".$lng."', '".$currentTime."')";   
        $success = mysql_query($query, $LINK);    
        $rep = $success;
    }
}
header("Access-Control-Allow-Origin: *");  
header("Access-Control-Allow-Methods: GET,POST,PUT,PATCH,OPTIONS,DELETE");  
header("Access-Control-Allow-Headers: Content-Type, Date, Server");  
echo $rep;
?>

