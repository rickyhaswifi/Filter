// function myFunction() {
//   var locationValue = document.getElementById("mySelect").value;
//   // console.log(locationValue);
// }


// const search = document.getElementById('search')
// search.addEventListener('input', () => searchList(search.value))

// ID of the Google Spreadsheet
 var spreadsheetID = "1PQJSCErV-r-yxTuYxYzMfWLX3ncboRJpLNU_aWatF-4";
 
 // Make sure it is public or set to Anyone with link can view 
 var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
 
// make JSON call to Google Data API
$.getJSON(url, function(data, locationValue) {

  // set global html variable
  var html = '';

  // var locationValue = document.getElementById("mySelect");
  // locationValue.addEventListener('change', function myFunction() {
  //   console.log(locationValue.value);
  // })
// function myFunction() {
// }

  // build table headings
  html += '<div class="card--container">';

  var entry = data.feed.entry;
  // console.log(entry)
  // var locationValue = document.getElementById("mySelect");
  // locationValue.addEventListener('change', function myFunction() {
  //   // console.log(locationValue.value);
  // })
  // Location Filter
  // var locationValue = document.getElementById("mySelect");
  // locationValue.addEventListener('change', function myFunction() {
  //   locationFiltered = entry.filter( function(person) {
  //     return (person.gsx$location.$t === locationValue.value)
  //   })
  //   console.log(locationValue.value);
  // })
  // // console.log(locationFiltered)
  
  // // Display
  // for (var i = 0; i < locationFiltered.length; i++) {
  //   html += `
  //   <div class="card-item">
  //     <img src="${locationFiltered[i]['gsx$img']['$t']}"/>
  //     <h4>${locationFiltered[i]['gsx$firstname']['$t']}</h4>
  //     <h4>Location: ${locationFiltered[i]['gsx$location']['$t']}</h4>
  //     <h4>Role: ${locationFiltered[i]['gsx$type']['$t']}</h4>
  //   </div>
  //   `;
  // }
  // html += '</div>';
  
  // const search = document.getElementById('search')
  // search.addEventListener('keyup', function searchList(search) {
  //   console.log(search.value)
  // })
    // if (search.value < 1 ) {
    //   document.getElementById('searchOutput').innerHTML = search.value
    // }
    // else {
    //   for (var i = 0; i < entry.length; i++) {
    //     var locationValue = document.getElementById("mySelect").value;
    //     // const locationValues = document.getElementById("mySelect").value;
    //     console.log(
    //       (entry[i]['gsx$location']['$t'] === locationValue) ? null : locationValue
    //     )
    //   html += `
    //   <div class="card-item">
    //     <img src="${entry[i]['gsx$img']['$t']}"/>
    //     <h4>${entry[i]['gsx$firstname']['$t']}</h4>
    //     <h4>Location: ${entry[i]['gsx$location']['$t']}</h4>
    //     <h4>Role: ${entry[i]['gsx$type']['$t']}</h4>
    //   </div>
    //   `;
    // }
    // html += '</div>';
    // }
  
    for (var i = 0; i < entry.length; i++) {
      var locationValue = document.getElementById("mySelect").value;
      // const locationValues = document.getElementById("mySelect").value;
      console.log(
        (entry[i]['gsx$location']['$t'] === locationValue) ? null : locationValue
      )
    html += `
    <div class="card-item sort">
      <img src="${entry[i]['gsx$img']['$t']}"/>
      <h4>${entry[i]['gsx$firstname']['$t']}</h4>
      <h4>Location: ${entry[i]['gsx$location']['$t']}</h4>
      <h4>Role: ${entry[i]['gsx$type']['$t']}</h4>
    </div>
    `;
  }
  html += '</div>';

  // output html
  $('.people-api').html(html);
});

// loading animation
var loading = $('.loading');
loading.hide();
$(document)
  .ajaxStart(function() {
    loading.show();
  })
  .ajaxStop(function() {
    loading.hide();
  });