<?php

include_once($_SERVER['DOCUMENT_ROOT'] . "/conf/DbConn.php");
include_once($_SERVER['DOCUMENT_ROOT'] . "/app/here-i-am/HereIAmDao.php");
try {
    echo 'bonjour php';
    $dbConn = new DbConn();
    $pdo = $dbConn->getPdo();
    $dao = new HereIAmDao($pdo);
    echo 'success?'.$dao->add("42;14;1541254552");
} catch (Exception $e) {
    echo "on a eu un probleme ".$e->getMessage();
}

echo 'bonjour hereiam'.$_SERVER['DOCUMENT_ROOT'] . "/conf/DbConn.php";
?>