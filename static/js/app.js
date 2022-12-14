// from data.js

const tableData = data;
const filterKeys = [   
  "listing_id", 
  "listing_url",
  "city",
  "state",
  "zipcode",
  "latitude",
  "longitude",
  "accommodates",
  "bathrooms",
  "bedrooms",
  "beds",
  "price",
  "review_scores_rating"
]

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

function addFilterValue(filters, idElement, elementValue) {
  filters[idElement] = elementValue;
  filters._count++;
}

function removeFilterValue(filters, idElement) {
  delete filters[idElement];
  filters._count--;
}

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
      // filters[idElement] = elementValue;
      // filters._count++;
      addFilterValue(filters, idElement, elementValue);
    }
    
    else {
      removeFilterValue(filters, idElement);
      // delete filters[idElement];
      // filters._count--;
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
      if (filterKeys.includes(key)){
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


  const inputs = document.querySelectorAll("input");

  // console.log(inputs);
  
  inputs.forEach(filter => {
    if (filter.value && filter.name){
      addFilterValue(filters, filter.name, filter.value);
    }

    filterTable();
  })

