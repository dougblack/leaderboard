
$(function() {
  // Binding for search button.
  $("input#search_button").click(function() {

    var query_string = $("input#club_name").val();

    // Clear old results.
    $("table#search_results_table").html("");
    search_clubs(query_string);

    return false;

  });
});

// Search Strava API for clubs with matching names.
function search_clubs(query_string) {
  
  $.ajax({
    type: "POST",
    url: "search.php",
    data: {'query_string': query_string},
    success: function(response) {

      var response_object = JSON.parse(response);
      var clubs = response_object['clubs'];
      
      if (clubs.length == 0) {
        $('table#search_results_table').append('<tr><td style="color: black"><a>No search results.</a></td></tr>');
        return;
      }

      for (var i = 0; i < clubs.length; i++) {
        var club = clubs[i];
        $('table#search_results_table').append(search_result_row(club));
      }

    },
    error: function(response) {
             console.log("ERROR" + response);
           }
  });

}

// Returns a table row for the given club.
function search_result_row(club) {
  return '<tr><td><a href="leaderboard.html?club_id=' + club.id + '&name=' + club.name +'">' 
    + club.name + '</a></td></tr>';
}
