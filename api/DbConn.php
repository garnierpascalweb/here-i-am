<?php
class DbConn {
    private $servername = "garnieep.mysql.db";
    private $username = "garnieep";
    private $password = "Bite1982";
    private $dbname = "garnieep";
    private $pdo = null;

    function __construct() {       
        $this->pdo = new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
            // set the PDO error mode to exception
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);                   
    }

    public function getPdo(){
        return $this->pdo;
    }
}
