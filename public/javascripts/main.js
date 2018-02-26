function startApp(){
    navigator.geolocation.getCurrentPosition(function (position) {
        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        let distanceArray=[]
        for (let i=0; i<placesArray.length; i++){
            let distanceKM= distanceInKmBetweenEarthCoordinates(center.lat, center.lng, placesArray[i].location.coordinates[1], placesArray[i].location.coordinates[0])
            let placeHTML = ""
            placeHTML+=`<div class="place-container">
            <figure class="crop-image">
                <img src=${placesArray[i].picPath}>
            </figure>
            <div class="rating-container">
            <p class="place-name">${placesArray[i].name}</p>`
            let avgRating = 0
            let musicCount = 0
            let crowdCount = 0
            placesArray[i].reviews.forEach(function(review){
                avgRating+=review.rating/placesArray[i].reviews.length;
                musicCount+=review.music/placesArray[i].reviews.length; 
                crowdCount+=review.crowded/placesArray[i].reviews.length;
            })
            placeHTML+=`<p>Night Rating: ${avgRating}</p>`
            for(var s=0; s<avgRating; s++){
                if (avgRating-1<s){
                    placeHTML+=`<span class="fas fa-star-half"></span>`
                 }else {
                     placeHTML+`<span class="fas fa-star"></span>`
                }
             }
            placeHTML+=`<p class="distance">Dist: ${Math.round(distanceKM * 100) / 100}km</p></div>`
            placeHTML+=`<div class="emotions-container">`
            if (musicCount <1.5){
                placeHTML+=`<span>Music:<img src="images/top40.png"></span>`
            } else if (musicCount<2.5) {
                placeHTML+=`<span>Music: <img src="images/reggaeton.png"></span>`
            } else {
                placeHTML+=`<span>Music: <img src="images/electronic.png"></span>`
            }
            
            if (crowdCount <1.5){
                placeHTML+=`<span>Crowd:<img src="images/fullCrowd.png"></span>`
                } else if (musicCount<2.5) {
                    placeHTML+=`<span>Crowd:<img src="images/averageCrowd.png"></span>`
                } else {
                    placeHTML+=`<span>Crowd:<img src="images/empty.png"></span>`
            }
            placeHTML+="</div></div>"
            distanceArray.push({distance: distanceKM, name: placesArray[i].name, html: placeHTML});

        }
        distanceArray.sort(function(a,b){
            return a.distance-b.distance;
        })
        if (distanceArray[0].distance<0.1){
            let current = "<p>It looks like you are in "+distanceArray[0].name+"</p><p>Tell us how it is!</p>";
            document.getElementById("currentContainer").innerHTML=current
        }
        distanceArray.forEach(function(element){
            document.getElementsByTagName("body")[0].innerHTML+=element.html;
        })
      });
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