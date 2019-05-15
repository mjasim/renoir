<?php
 $str_data = file_get_contents('php://input');
 $username=$_GET['q'];
 $fname='_int.csv';
 $fp = fopen($username.$fname, 'a');
 fwrite($fp,$str_data);
 fclose($fp);
?>