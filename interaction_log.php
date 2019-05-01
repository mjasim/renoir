<?php
 $str_data = file_get_contents('php://input');
 $username=$_GET['q'];
 $fp = fopen($username.'log.csv', 'a');
 fwrite($fp,$str_data);
 fclose($fp);
?>