<?php
class HereIAmDao {
    protected $pdo;
    /**
     * Constructeur
     */
    public function __construct($pdo){
        $this->pdo=$pdo;
    }

    public function get(){

    }

    public function add($data){
        $tokens = explode(";", $data);
        $lat = $tokens[0];
        $lng = $tokens[1];
        // $currentTime = date("Y-m-d-H-i");
        $timePoint = date("U");
        // $query = "insert into garnierpascalweb.hereiam values ('" . $lat . "', '" . $lng . "', '" . $currentTime . "')";
        $sqlInsertQuery = 'INSERT INTO hereiam (lat,lng,timepoint) VALUES (:lat,:lng,:timePoint)';
        $stmt = $this->pdo->prepare($sqlInsertQuery);
        $stmt->bindParam(':lat', $lat);
        $stmt->bindParam(':lng', $lng);
        $stmt->bindParam(':timePoint', $timePoint);
        $success=$stmt->execute();        
        return $success;
    }

    public function delete(){

    }
}
?>