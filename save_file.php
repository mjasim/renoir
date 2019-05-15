<?php
 $str_json = file_get_contents('php://input');
 $fp = fopen('stat.json', 'w');
 fwrite($fp,$save_data);
 fclose($fp);
?>