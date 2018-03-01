function showTotal(){
    let placeHTML = ""
    placeHTML+=`
    <div class="rating-container">
    <p class="place-name">${place.name}</p>`
    let avgRating = 0
    let musicCount = []
    let crowdCount = 0
    place.reviews.forEach(function(review){
        avgRating+=review.rating/place.reviews.length;
        crowdCount+=review.crowded/place.reviews.length;
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
    if (place.reviews.length>0){
    placeHTML+=`<p>Night Rating: ${avgRating}</p>`
    for(var s=0; s<avgRating; s++){
        if (avgRating-1<s){
            placeHTML+=`<span class="fas fa-star-half"></span>`
         } else {
             placeHTML+=`<span class="fas fa-star"></span>`
        }
     }
    } else {
        placeHTML+=`<p>No reviews yet</p>`
    }
    placeHTML+=`</div>`
    if (place.reviews.length>0){
    placeHTML+=`<div class="emotions-container">`
    placeHTML+=`<span>Music:</span>`
    musicCount.forEach(function(elem){
        placeHTML+=`<span><img src="images/${elem.genre}.png"><p>x${elem.count}</p></span>`
    })

    
    if (crowdCount <1.5){
        placeHTML+=`<span>Crowd:</span><span><img src="images/fullCrowd.png"></span>`
        } else if (crowdCount<2.5) {
            placeHTML+=`<span>Crowd:</span><span><img src="images/averageCrowd.png"></span>`
        } else {
            placeHTML+=`<span>Crowd:</span><span><img src="images/empty.png"></span>`
    }
    placeHTML+="</div>"
    }

    document.getElementById("totalReview").innerHTML=placeHTML;
}

showTotal();