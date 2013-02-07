
$(function() {
  var params = getURLParams();
  var club_id = params["club_id"];
  var club_name = decodeURIComponent(params["name"]);
  $("#club_name").html(club_name + " Leaderboard");
  console.log(club_id);
  rank(club_id);
});


// Retrieves, orders, and displays the athletes for this club.
function rank(club_id) {
  $.ajax({
    type: "POST",
    url: "leaderboard.php",
    data: {'club_id': club_id},
    success: function(response) {
      var membersData = JSON.parse(response);
      console.log(membersData);
      $("#loading").hide();
      $("table#leaderboard").append('<tr><th>Rank</th><th>Athlete</th><th>Total</th><th>Average</th><th>Ride Count</th></tr>');
      for (var i = 0; i < membersData.length; i++) {
        var memberData = membersData[i];
        $("table#leaderboard").append(memberDataRow(memberData, i+1));
      }
    },
    error: function(response) {
             console.log("ERROR!" + response);
           }
  });
}

// Returns a row for the given member and rank value.
function memberDataRow(memberData, rank) {
  return '<tr><td>' + rank + '</td><td>' + memberData.athlete + '</td><td>' + memberData.total_elevation.toFixed(1) + 'm</td><td>' + memberData.average_elevation.toFixed(1) + 'm</td><td>' + memberData.number_of_rides+ '</td></tr>';
}

function getURLParams() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}
