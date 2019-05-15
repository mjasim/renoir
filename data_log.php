<?php
 $str_json = file_get_contents('php://input');
 $username=$_GET['q'];
 $fname='_data.csv';
 $fp = fopen($username.$fname, 'a');
 fwrite($fp,$str_json);
 fclose($fp);
?>