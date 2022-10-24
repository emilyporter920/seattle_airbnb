// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters={
  _count: 0
};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let changedElement=d3.select(this);
    // 4b. Save the value that was changed as a variable.
    let elementValue=changedElement.property("value");

    // Verify that it is saving elementValue
    console.log(elementValue);

    // 4c. Save the id of the filter that was changed as a variable.
    let idElement=changedElement.attr("id");

    // Verify that it is saving idElement
    console.log(idElement);
  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementValue) {
      filters[idElement] = elementValue;
      filters._count++;
    }
    
    else {
      delete filters[idElement];
      filters._count--;
    }

    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    let filteredData=tableData;
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values (Object.entries() means it will return an array of a given objects [key, value])
    Object.entries(filters).forEach(([key, value])=> {
      if (key != "_count"){
        filteredData=filteredData.filter(row=>row[key]==value);
      }
    })

    // if _count is not empty, create marker for each item in filteredData
    // else clear markers
    removeMarkers(markers);
    markers = [];

    if (filters._count > 0){
      for (let row of filteredData){
        markers.push(createMarker(row));
      }
      addMarkers(markers);
      console.log(filters);

    }
    
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);

  $(document).ready(function(){
    
  })

  // Dropdown for Accommodation Number
  var select = '';
  for (i=1;i<=16;i++){
    select += '<option val=' + i + '>' + i + '</option>';
  }
  $('#selAccomodation').html(select);

  // Dropdown for IDs
  $("#selID").on("click", function() {
    let dropdown = $('#selID');

    dropdown.empty();
    
    dropdown.append('<option selected="true" disabled></option>');
    dropdown.prop('selectedIndex', 0);
    
    const url = 'https://raw.githubusercontent.com/emilyporter920/seattle_airbnb/main/data.json';
    
    // Populate dropdown with list of provinces
    $.getJSON(url, function (data) {
      $.each(data, function (key, entry) {
        dropdown.append($('<option></option>').attr('value', entry.listing_id).text(entry.listing_id));
      })
    });

    $('#selID').val("value")
  
  });

  // Dropdown for Month
  var select = '';
  for (i=1;i<=12;i++){
    select += '<option val=' + i + '>' + i + '</option>';
  }
  $('#selMonth').html(select);

  // http://jsfiddle.net/6vvfr/12/

  // Filter for JSON Listing values
  var a = 'https://raw.githubusercontent.com/emilyporter920/seattle_airbnb/main/data.json';

  $("#selAccomodation").change(function () {
    $('#selID').empty().append($('<option></option>').val('--Listing ID--').html('--Listing ID --'));
    var matchVal = $("#selAccommodation option:selected").text();
    a.filter(function (airbnb) {
        if (airbnb.accommodates == matchVal) {
            $("#selID").append($('<option></option>').val(airbnb.accommodates).html(airbnb.accommodates));
        }
    });
  });

  $('#selID').change(function () {
    //alert($(this).val());
    //var getModelval = $('#model').val();
    $('#selID').val($(this).val());
    //$('#size').val(.val(id));

  });