
$(function() {
  $("input#search_button").click(function() {
    console.log("clicked");
    var queryString = $("input#club_name").val();
    console.log(queryString);
    $("table#search_results_table").html("");
    searchClubs(queryString);
    return false;
  });
});

function searchClubs(queryString) {
  
  $.ajax({
    type: "POST",
    url: "search.php",
    data: {'queryString': queryString},
    success: function(response) {
      console.log(response);
      var responseObject = JSON.parse(response);
      var clubs = responseObject['clubs'];
      for (var i = 0; i < clubs.length; i++) {
        var club = clubs[i];
        $('table#search_results_table').append(searchResultRow(club));
      }
    },
    error: function(response) {
             console.log("ERROR" + response);
           }
  });

}

function searchResultRow(club) {
  return '<tr><td><a href="leaderboard.html?club_id=' + club.id + '">' + club.name + '</a></td></tr>';
}
