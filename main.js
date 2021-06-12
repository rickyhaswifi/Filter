// ID of the Google Spreadsheet
var spreadsheetID = "1PQJSCErV-r-yxTuYxYzMfWLX3ncboRJpLNU_aWatF-4";
// Make sure it is public or set to Anyone with link can view 
var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
var peopleData;
var selectedLocation;
var selectedRole;
var locationOptions;
var roleOptions;
$.getJSON(url, function(data) {
  peopleData = data.feed.entry;
  const locations = new Set();
  const roles = new Set();
  for (var i = 0; i < peopleData.length; i++) {
    locations.add(peopleData[i]['gsx$location']['$t']);
    roles.add(peopleData[i]['gsx$role']['$t']);
  }
  locationOptions = Array.from(locations).sort();
  roleOptions = Array.from(roles).sort();
  locationOptions.unshift('-');
  roleOptions.unshift('-');
  createLocationSelect();
  createRoleSelect();
  renderPeople();
});
function createLocationSelect() {
  $('#Select-Menu-Location').append(
    $(document.createElement('label')).prop({
        for: 'Location'
    })
  ).append(
    $(document.createElement('select')).prop({
        id: 'locationSelect',
        name: 'location'
    })
  )
  for (const l of locationOptions) {
    $('#locationSelect').append($(document.createElement('option')).prop({
        value: l,
        text: l
    }))
  }
  const locationSelect = document.getElementById("locationSelect")
  locationSelect.addEventListener('change', function(e) {
    const selected = locationOptions[e.target.selectedIndex];
    selectedLocation = selected === '-' ? null : selected;
    renderPeople();
  })
}
function createRoleSelect() {
  $('#Select-Menu-Role').append(
    $(document.createElement('label')).prop({
        for: 'Role Type'
    })
  ).append(
    $(document.createElement('select')).prop({
        id: 'roleSelect',
        name: 'role'
    })
  )
  for (const r of roleOptions) {
    $('#roleSelect').append($(document.createElement('option')).prop({
        value: r,
        text: r
    }))
  }
  const roleSelect = document.getElementById("roleSelect")
  roleSelect.addEventListener('change', function(e) {
    const selected = roleOptions[e.target.selectedIndex];
    selectedRole = selected === '-' ? null : selected;
    renderPeople();
  })
}
function renderPeople() {
  const filteredPeople = peopleData.filter( function(person) {
    if (selectedLocation && selectedRole) return (person.gsx$location.$t === selectedLocation && person.gsx$role.$t === selectedRole)
    else if (selectedLocation) return person.gsx$location.$t === selectedLocation
    else if (selectedRole) return person.gsx$role.$t === selectedRole
    else return person
  });
  let html = '<div class="card--container test-list">';
  for (var i = 0; i < filteredPeople.length; i++) {
    html += `
    <div class="card-item">
    <img src="${filteredPeople[i]['gsx$img']['$t']}"/>
    <h4>${filteredPeople[i]['gsx$name']['$t']}, ${filteredPeople[i]['gsx$notes']['$t']}</h4>
    <h4>Location: ${filteredPeople[i]['gsx$location']['$t']}</h4>
    <h4>Role: ${filteredPeople[i]['gsx$role']['$t']}</h4>
    </div>
    `;
  }
  html += '</div>';
  $('.people-api').html(html);
}
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