<?php
  
$queryString = urlencode($_POST['queryString']);

$url = "http://www.strava.com/api/v1/clubs?name=$queryString";

$json = file_get_contents($url);
echo $json;

?>
