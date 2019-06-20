<?php
 $str_json = file_get_contents('php://input');
 $fp = fopen('stat_stack.json', 'w');
 fwrite($fp,$str_json);
 fclose($fp);
?>