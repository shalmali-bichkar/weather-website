function searchPlace(){
    var input = document.getElementById('search');
    autocomplete = new google.maps.places.Autocomplete(input, {types:['geocode']});
    autocomplete.addListener('place_changed', show);
}
// var latitude =0.0;
// var longitude =0.0;

function initMap(){
    // const map = new google.maps.Map(document.getElementById('map'),{
    //     center:{
    //         lat:40.731,
    //         lng:-73.997

    //     }
    // });

    //onst geocoder =new google.maps.Geocoder();

    //const infowindow = new google.maps.InfoWindow();

    //geocodeLatLng(geocoder,map,infowindow,latitude,longitude);
}

