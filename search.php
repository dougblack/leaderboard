<?php
  
$query_string = urlencode($_POST['query_string']);

$url = "http://www.strava.com/api/v1/clubs?name=$query_string";

$json = file_get_contents($url);
echo $json;

?>
