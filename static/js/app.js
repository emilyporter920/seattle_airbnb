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

  // Dropdown for Bedroom Number
  var select = '';
  for (i=1;i<=7;i++){
    select += '<option val=' + i + '>' + i + '</option>';
  }
  $('#selBedroom').html(select);

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

  // // http://jsfiddle.net/6vvfr/12/

  // // Filter for JSON Listing values (this works in interacting with it - doesn't filter it)
  // var a = 'https://raw.githubusercontent.com/emilyporter920/seattle_airbnb/main/data.json';

  // $("#selAccomodation").change(function () {
  //   $('#selID').empty().append($('<option></option>').val('--Listing ID--').html('--Listing ID --'));
  //   var matchVal = $("#selAccommodation option:selected").text();
  //   var matchVal2 = $("#selBedroom option:selected").text();
  //   a.filter(function (airbnb) {
  //       if (airbnb.accommodates == matchVal & airbnb.bedrooms == matchVal2) {
  //           $("#selID").append($('<option></option>').val(airbnb.listing_id).html(airbnb.listing_id));
  //       }
  //   });
  // });

  // $('#selID').change(function () {
  //   //alert($(this).val());
  //   //var getModelval = $('#model').val();
  //   $('#selID').val($(this).val());
  //   //$('#size').val(.val(id));

  // });


  // //https://www.encodedna.com/javascript/practice-ground/default.htm?pg=cascading_select_dropdown_list_using_json_data
  // $(document).ready(function () {

  //   let airbnbdata = [];
    
  // 	// Fill the first dropdown with data.
  //   $.getJSON('../../data.json', function (data) {

    
  //       let airbnblisting = [];

  //       $.each(data, function (index, value) {
  //           airbnblisting.push(value.Type);
  //           airbnbdata = data;
  //       });

  //       // Remove duplicates. We want unique bird types.
  //       airbnblisting = Array.from(new Set (arr_bird_type));
        
  //       // ref (https://www.encodedna.com/javascript/remove-duplicates-in-javascript-array-using-es6-set-and-from.htm)

  //       $.each(airbnblisting, function (index, value) {
  //           // Fill the first dropdown with unique bird types.
  //           $('#selBedroom').append('<option value="' + value + '">' + value + '</option>');
  //       });
                
  //   });
    
  //   $('#selBedroom').change(function () {
  //       let type = this.options[this.selectedIndex].value;

  //       let filterData = airbnbdata.filter(function(value) {
  //           return value.Type === type;
  //       });

  //   // Wouldn't we need two?
  //   // $('#sel').change(function () {
  //   //   let type = this.options[this.selectedIndex].value;
  
  //   //   let filterData = airbnbdata.filter(function(value) {
  //   //       return value.Type === type;
  //   //   });

  //       $('#selBedroom')
  //           .empty()
  //           .append('<option value=""> Listing ID </option>');

  //       $.each(filterData, function (index, value) {
  //           // Now, fill the second dropdown list with bird names.
  //           $('#selID').append('<option value="' + value.ID + '">' + value.Name + '</option>');
  //       });
        
  //   });
  // });

//   // Filtering based on bedroom number (this works in interacting with it - doesn't filter it)
//   $('document').ready(function () { // Line 1
//     $('#selBedroom').on('change',function () { // Line 2
//         $('#selID').empty().append('<option value="null">-SELECT-</option>'); // Line 3
//         var countryid = $(this).val(); //Line 4
//         var href = 'https://raw.githubusercontent.com/emilyporter920/seattle_airbnb/main/data.json' + countryid //Line 5
//         $.get(href, function (country, status) { // Line 6
//             var states = country.states; // Line 7
//             for (var i = 0; i <= states.length-1; i++) { // Line 8
//                 $('#selID').append('<option value="' + states[i].listing_id + '">' + states[i].name + '</option>'); // Line 9
//             }
//         })
//     })
// })

var subjectObject = 'https://raw.githubusercontent.com/emilyporter920/seattle_airbnb/main/data.json'

window.onload = function() {
  var accomodatesSel = document.getElementById("selAccommodates");
  var bedroomSel = document.getElementById("selBedroom");
  var idSel = document.getElementById("selID");
  for (var x in subjectObject) {
    accomodatesSel.options[accomodatesSel.options.length] = new Option(x, x);
  }

  accomodatesSel.onchange = function() {
    //empty Chapters- and Topics- dropdowns
    idSel.length = 1;
    bedroomSel.length = 1;

    //display correct values
    for (var y in subjectObject[this.value]) {
      bedroomSel.options[bedroomSel.options.length] = new Option(y, y);
    }
  }
  bedroomSel.onchange = function() {
    //empty Chapters dropdown
    idSel.length = 1;

    //display correct values
    var z = subjectObject[accomodatesSel.value][this.value];
    for (var i = 0; i < z.length; i++) {
      idSel.options[idSel.options.length] = new Option(z[i], z[i]);
    }
  }
}