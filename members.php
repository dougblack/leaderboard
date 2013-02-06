
<?php

$club_id = urlencode($_POST['club_id']);

$url = "http://www.strava.com/api/v1/clubs/$club_id/members";

$json = file_get_contents($url);
echo $json;

?>
