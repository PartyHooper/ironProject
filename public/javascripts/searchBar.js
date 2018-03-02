function startMap(){
    var input = document.getElementById("searchBar");
  
      function autocomplete(input){
          const dropdown = new google.maps.places.Autocomplete(input);
          dropdown.addListener("place_changed", ()=>{
              const place = dropdown.getPlace();
  
              document.getElementById("latitude").value = place.geometry.location.lat()
              document.getElementById("longitude").value = place.geometry.location.lng()
              
          })
      }
      autocomplete(input);
  }
  
  startMap()
  
  $(document).ready(function() {
    $(window).keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
        return false;
      }
    });
  });