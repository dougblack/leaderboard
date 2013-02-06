
$(function() {
  var club_id = getClubId();
  console.log(club_id);
  $.ajax({
    type: "POST",
    url: "members.php",
    data: {'club_id': club_id},
    success: function(response) {
      var responseObject = JSON.parse(response);
      var clubName = responseObject["club"]["name"];
      var members = responseObject["members"];
      getEfforts(members);
    },
    error: function(response) {
              console.log("ERROR!" + response);
           }

  });
});

function getClubId() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars["club_id"];
}

function getEfforts(members) {
  $.ajax({
    type: "POST",
    url: "leaderboard.php",
    data: {'members': JSON.stringify(members)},
    success: function(response) {
      console.log(response);
    },
    error: function(response) {
             console.log("ERROR!" + response);
           }
  });
}
