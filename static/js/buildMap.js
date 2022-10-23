// default seattle coords
// centered tableData coords
const seattle = new google.maps.LatLng(47.61922313, -122.3357037);

// create map, center on Seattle
const map = new google.maps.Map(document.getElementById("map"), {
  zoom: 11,
  center: seattle,
});

// create empty list for markers 
markers = []

//create marker
function createMarker(row){
   let marker = new google.maps.Marker({
    position: {
      lat: parseFloat(row.latitude), 
      lng: parseFloat(row.longitude)
    },
    label: prediction
  });
  marker.content = row

  return marker;
}

// add marker
function addMarkers(markers){
  for (let marker of markers){
    marker.setMap(map);

    let contentString = `
    <h3 class="marker">${marker.content.listing_id}</h3>
    <p class="marker">Bedrooms: ${marker.content.bedrooms}</p>
    <p class="marker">Bathrooms: ${marker.content.bathrooms}</p>
    `
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });
  
  }
}

// clear markers
function removeMarkers(markers){
  for (let marker of markers){
    marker.setMap(null);
  }
}