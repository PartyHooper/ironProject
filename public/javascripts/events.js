let distanceArray=[]
function startApp(){
        const center = {
          lat: 19.3978821,
          lng: -99.1716711
        };
        distanceArray=[]
        for (let i=0; i<eventsArray.length; i++){
            let distanceKM= distanceInKmBetweenEarthCoordinates(center.lat, center.lng, eventsArray[i].location.coordinates[1], eventsArray[i].location.coordinates[0])

            let placeHTML = ""
            placeHTML+=`<a href="/events/${eventsArray[i]._id}"><div class="place-container">
            <figure class="crop-image">
                <img src=${eventsArray[i].picPath}>
            </figure>
            <div class="rating-container">
            <p class="place-name">${eventsArray[i].name}</p>`
            placeHTML+=`<p class="distance">Dist: ${Math.round(distanceKM * 100) / 100}km</p></div>`
            placeHTML+="</div></a>"
            distanceArray.push({distance: distanceKM, name: eventsArray[i].name, html: placeHTML, id: eventsArray[i]._id});

        }
        if (distanceArray.length>0){
            distanceArray.sort(function(a,b){
                return a.distance-b.distance;
            })
            distanceArray.forEach(function(element){
                document.getElementsByTagName("body")[0].innerHTML+=element.html;
            })
        }
        
        $("#loading").hide();
  }

  startApp()
  
  function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  
  function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    const earthRadiusKm = 6371;
  
    let dLat = degreesToRadians(lat2-lat1);
    let dLon = degreesToRadians(lon2-lon1);
  
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
  
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
  }