<?php

$club_id = urlencode($_POST["club_id"]);

// Get first and last day of the current month.
$start_date = date("Y-m-01");
$end_date = date("Y-m-t");

$offset = 0;
$rides_left = true;
$rides = array();

// The API only returns 50 rides per request, so we continue grabbing sets of 50
// until we've run out requests.
while ($rides_left) {
  $club_rides_url = "http://www.strava.com/api/v1/rides?clubId=$club_id&startDate=$start_date&endDate=$end_date&offset=$offset";
  $response = json_decode(file_get_contents($club_rides_url), true);
  $new_rides = $response["rides"];
  $number_of_rides = count($new_rides);
  if ($number_of_rides == 0 || $number_of_rides < 50)
    $rides_left = false;
  $rides = array_merge($rides, $new_rides);
  $offset += 50;
}

$member_data = array();

// Get the data for each ride from this month.
foreach ($rides as $ride) {

  $ride_id = $ride["id"];
  $ride_url = "http://www.strava.com/api/v1/rides/$ride_id";
  $response = json_decode(file_get_contents($ride_url), true);

  $member_id = $response["ride"]["athlete"]["id"];

  if (array_key_exists($member_id, $member_data)) {
    $member = &$member_data[$member_id];
  } else {
    $member = array();
    $member["total_elevation"] = 0;
    $member["average_elevation"] = 0;
    $member["number_of_rides"] = 0;
    $member["athlete"] = $response["ride"]["athlete"]["name"];
    $member_data[$member_id] = $member;
  }

  // Update elevation and ride statistics.
  $ride_elevation = $response["ride"]["elevationGain"];
  $member["total_elevation"] += $ride_elevation;
  $member["number_of_rides"] += 1;
  $member["average_elevation"] = $member["total_elevation"] / $member["number_of_rides"];
}

// Custom comparator.
function cmp($x, $y) {
  return $y["total_elevation"] - $x["total_elevation"];
}

usort($member_data, "cmp");

echo json_encode($member_data);

?>
