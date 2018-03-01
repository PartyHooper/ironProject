window.onload = function() {
    console.log("hola")
    var search= document.getElementById("searchInput")
search.onclick = busqueda



function busqueda(){
    console.log("hola2")
    var listen = document.getElementById("myInput")
    var input = listen.value;
    var places = placesArray;
    var filtered = [];
    console.log(input)
    return filtered = places.map(place=>{
        if(place.name==input){
            let newURL = "/"+place._id
            console.log(newURL)
            window.location.href = newURL;
        }
    })
}   
  };
