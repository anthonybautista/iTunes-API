function getTunes(term) {
  $("#results").empty();
  $.get( `https://itunes.apple.com/search?term=${term}&limit=25`, function( data ) {
    if (data.resultCount > 0) {
      $("#results").append(
          `<tr>
            <th>Type</th>
            <th>Artist</th>
            <th>Collection Name</th>
            <th>Track Name</th>
      </tr>`);
      data.results.forEach(addItem)
    } else {
      $("#results").append("<p>No Results</p>");
    }
  }, "json" );
}

function addItem(item) {
  let type = item.wrapperType ? item.wrapperType : 'None';
  let artist = item.artistName ? item.artistName : 'None';
  let collection = item.collectionName ? item.collectionName : 'None';
  let track = item.trackName ? item.trackName : 'None';

  $("#results").append(`
    <tr>
        <td>${type}</td>
        <td>${artist}</td>
        <td>${collection}</td>
        <td>${track}</td>
    </tr>
  `);
}


$(function() {
  $("#searchButton").on('click', function() {
    getTunes($("#search").val().replace(" ","+"));
  })

  $("#search").on('keydown',function(e) {
    if(e.which === 13) {
      getTunes($("#search").val().replace(" ","+"));
    }
  });
});