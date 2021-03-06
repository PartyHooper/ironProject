let distanceArray=[]
function startApp(){
        const center = {
          lat: 19.3978821,
          lng: -99.1716711
        };
        distanceArray=[]
        for (let i=0; i<placesArray.length; i++){
            let distanceKM= distanceInKmBetweenEarthCoordinates(center.lat, center.lng, placesArray[i].location.coordinates[1], placesArray[i].location.coordinates[0])

            let placeHTML = ""
            placeHTML+=`<div class="place-container">
            <a href="/${placesArray[i]._id}">
            <figure class="crop-image">
                <img src=${placesArray[i].picPath}>
            </figure></a>
            <div class="rating-container">
            <p class="place-name">${placesArray[i].name}</p>`
            let avgRating = 0
            let musicCount = []
            let crowdCount = 0
            placesArray[i].reviews.forEach(function(review){
                avgRating+=review.rating/placesArray[i].reviews.length;
                crowdCount+=review.crowded/placesArray[i].reviews.length;
                let exists=false;
                musicCount.map(function(music){
                    if (music.genre===review.music){
                        music.count++;
                        exists=true;
                    }
                })
                if (!exists){
                    musicCount.push({genre: review.music, count: 1})
                }
            })
            musicCount.sort(function(a,b){
                return b.count - a.count;
            })
            if (placesArray[i].reviews.length>0){
            placeHTML+=`<p>Night Rating: ${avgRating}</p>`
            for(var s=0; s<avgRating; s++){
                if (avgRating-1<s){
                    placeHTML+=`<span class="fas fa-star-half"></span>`
                 } else {
                     placeHTML+=`<span class="fas fa-star"></span>`
                }
             }
            } else {
                placeHTML+=`<p>No updates yet</p>`
            }
            placeHTML+=`<p class="distance">Dist: ${Math.round(distanceKM * 100) / 100}km</p></div>`
            if (placesArray[i].reviews.length>0){
            placeHTML+=`<div class="emotions-container">`
            placeHTML+=`<span>Currently playing:<img src="images/${musicCount[0].genre}.png"></span>`
            
            if (crowdCount <1.5){
                placeHTML+=`<span>Crowd:<img src="images/fullCrowd.png"></span>`
                } else if (crowdCount<2.5) {
                    placeHTML+=`<span>Crowd:<img src="images/averageCrowd.png"></span>`
                } else {
                    placeHTML+=`<span>Crowd:<img src="images/empty.png"></span>`
            }
            placeHTML+="</div>"
            }
            placeHTML+="</div>"
            distanceArray.push({distance: distanceKM, name: placesArray[i].name, html: placeHTML, id: placesArray[i]._id});

        }
        if (distanceArray.length>0){
            distanceArray.sort(function(a,b){
                return a.distance-b.distance;
            })
    
            if (distanceArray[0].distance<0.1){
                let current = "<a href='/"+distanceArray[0].id+"/review'><p>It looks like you are at "+distanceArray[0].name+"</p><p>Tell us how it is!</p></a>";
                document.getElementById("locationContainer").innerHTML=current
            }
            distanceArray.forEach(function(element){
                document.getElementById("infoContainer").innerHTML+=element.html;
            })
        }
        
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