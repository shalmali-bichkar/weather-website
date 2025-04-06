var longitude = 0.0;
var latitude = 0.0;



function initMap(){
    const map = new google.maps.Map(document.getElementById("map"),{
        zoom: 1,
        center:{
            lat:40.731,
            lng:-73.997

        },
        mapId: "DEMO_MAP_ID",
    });

    const geocoder =new google.maps.Geocoder();

    const infowindow = new google.maps.InfoWindow();

    geocodeLatLng(geocoder,map,infowindow,latitude,longitude);
}

function geocodeLatLng(geocoder,map,infoWindow,latitude,longitude){
    //const input = ;
    //const latlngstr = input.split(",",2);
    //const latlng = {
        //lat:parseFloat(latlngStr[0]),
        //lng:parseFloat(latlngStr[1])
    //}
    const latlng = {
        lat:parseFloat(latitude),
        lng:parseFloat(longitude)
    };
    

    geocoder.geocode({location:latlng})
    .then((response) =>{
        showCurrentPlace(response);
        
            map.setZoom(8);
            
            console.log("location");
            const marker = new google.maps.marker.AdvancedMarkerElement({
                map,
                position: latlng,
               
            });
            map.panTo(latlng);
        
    })
}

function showCurrentPlace(response){
    const place_name = document.getElementById("place-name");
    console.log("location is");
    console.log(response);
    console.log(response.results[0].formatted_address);
    for(var k =0;k<response.results.length;k++){
        for (var i=0; i<response.results[k].address_components.length; i++){
           for (var j=0; j<response.results[k].address_components[i].types.length; j++){
                if (response.results[k].address_components[i].types[k]=="sublocality"){
                    console.log(response.results[k].address_components[i].long_name);
                    var name = response.results[k].address_components[i].long_name;
                }
            }
        }
    }
    place_name.innerHTML = name;
}

async function getCurrentData(){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=56ce703a41415e8c6aee4f9d2bf5ca01`;
    
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        //var temp = file.main.temp;
        //console.log(file);
        // console.log(data);
        displayClimateInfo(data);
    }catch (error){
        console.error(error.message);
    }
}

async function getFutureData(){
    const url2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=56ce703a41415e8c6aee4f9d2bf5ca01`;
    // const url2= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=56ce703a41415e8c6aee4f9d2bf5ca01`;
    try{
        const forecast_response = await fetch(url2);
        if(!forecast_response.ok){
            throw new Error(`Response status: ${forecast_response.status}`);
        }

        const forecast_data = await forecast_response.json();
        
        console.log(forecast_data);
        console.log(forecast_data.list[0].main.temp);
        console.log(forecast_data.list[1].main.temp);

        displayForecastInfo(forecast_data);
        
    }catch (error){
        // console.error('Error fetching data:', error);
        console.error(error.message);
    }
}



function displayClimateInfo(data){
    
    var temp = data.main.temp;
    var tempfeelslike = data.main.feels_like;
    var weather = data.weather[0].main;
    var weatherdesc = data.weather[0].description;
    var pressure = data.main.pressure;
    var humidity = data.main.humidity;
    
    var icon = data.weather[0].icon;
    
    const climate_time_box= document.getElementById("weather-image");
    
    climate_time_box.innerHTML = `<img alt="icon" src="http://openweathermap.org/img/w/${icon}.png" width="100" height="100" />`
    

    
    const current_temp = document.getElementById("current-temp");
    const temp_feels_like = document.getElementById("temp-feels-like");
    const current_weather = document.getElementById("current-weather");
    const current_weather_description = document.getElementById("current-weather-description");
    const current_pressure = document.getElementById("current-pressure");
    const current_humidity = document.getElementById("current-humidity");
    current_temp.innerHTML =temp;
    temp_feels_like.innerHTML = tempfeelslike;
    current_weather.innerHTML  = weather;
    current_weather_description.innerHTML = weatherdesc;
    current_pressure.innerHTML = pressure;
    current_humidity.innerHTML = humidity;
    // console.log(temp);

    // console.log(data);
    // console.log(name);
    // console.log(weather);
    // console.log(icon);
}

function displayForecastInfo(data){
    var day1_temp_info = data.list[0].main.temp;
    var day2_temp_info = data.list[1].main.temp;
    var day3_temp_info = data.list[2].main.temp;
    var day4_temp_info = data.list[3].main.temp;
    var day5_temp_info = data.list[4].main.temp;
    var day6_temp_info = data.list[5].main.temp;

    const day1_temp = document.getElementById("day1-temp");
    const day2_temp = document.getElementById("day2-temp");
    const day3_temp = document.getElementById("day3-temp");
    const day4_temp = document.getElementById("day4-temp");
    const day5_temp = document.getElementById("day5-temp");
    const day6_temp = document.getElementById("day6-temp");

    day1_temp.innerHTML = day1_temp_info;
    day2_temp.innerHTML = day2_temp_info;
    day3_temp.innerHTML = day3_temp_info;
    day4_temp.innerHTML = day4_temp_info;
    day5_temp.innerHTML = day5_temp_info;
    day6_temp.innerHTML = day6_temp_info;

    var day1_weather_info = data.list[0].weather[0].main;
    var day2_weather_info = data.list[1].weather[0].main;
    var day3_weather_info = data.list[2].weather[0].main;
    var day4_weather_info = data.list[3].weather[0].main;
    var day5_weather_info = data.list[4].weather[0].main;
    var day6_weather_info = data.list[5].weather[0].main;


    const day1_weather = document.getElementById("day1-weather");
    const day2_weather = document.getElementById("day2-weather");
    const day3_weather = document.getElementById("day3-weather");
    const day4_weather = document.getElementById("day4-weather");
    const day5_weather = document.getElementById("day5-weather");
    const day6_weather = document.getElementById("day6-weather");

    day1_weather.innerHTML = day1_weather_info;
    day2_weather.innerHTML = day2_weather_info;
    day3_weather.innerHTML = day3_weather_info;
    day4_weather.innerHTML = day4_weather_info;
    day5_weather.innerHTML = day5_weather_info;
    day6_weather.innerHTML = day6_weather_info;


    var day1_humidity_info = data.list[0].main.humidity;
    var day2_humidity_info = data.list[1].main.humidity;
    var day3_humidity_info = data.list[2].main.humidity;
    var day4_humidity_info = data.list[3].main.humidity;
    var day5_humidity_info = data.list[4].main.humidity;
    var day6_humidity_info = data.list[5].main.humidity;    

    const day1_humidity = document.getElementById("day1-humidity");
    const day2_humidity = document.getElementById("day2-humidity");
    const day3_humidity = document.getElementById("day3-humidity");
    const day4_humidity = document.getElementById("day4-humidity");
    const day5_humidity = document.getElementById("day5-humidity");
    const day6_humidity = document.getElementById("day6-humidity");

    day1_humidity.innerHTML = day1_humidity_info;
    day2_humidity.innerHTML = day2_humidity_info;
    day3_humidity.innerHTML = day3_humidity_info;
    day4_humidity.innerHTML = day4_humidity_info;
    day5_humidity.innerHTML = day5_humidity_info;
    day6_humidity.innerHTML = day6_humidity_info;

    var day1_pressure_info = data.list[0].main.pressure;
    var day2_pressure_info = data.list[1].main.pressure;
    var day3_pressure_info = data.list[2].main.pressure;
    var day4_pressure_info = data.list[3].main.pressure;
    var day5_pressure_info = data.list[4].main.pressure;
    var day6_pressure_info = data.list[5].main.pressure;

    const day1_pressure = document.getElementById("day1-pressure");
    const day2_pressure = document.getElementById("day2-pressure");
    const day3_pressure = document.getElementById("day3-pressure");
    const day4_pressure = document.getElementById("day4-pressure");
    const day5_pressure = document.getElementById("day5-pressure");
    const day6_pressure = document.getElementById("day6-pressure");
    
    day1_pressure.innerHTML = day1_pressure_info;
    day2_pressure.innerHTML = day2_pressure_info;
    day3_pressure.innerHTML = day3_pressure_info;
    day4_pressure.innerHTML = day4_pressure_info;
    day5_pressure.innerHTML = day5_pressure_info;
    day6_pressure.innerHTML = day6_pressure_info;

}

const successCallback = (position)=> {
    console.log(position);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(longitude);
    getCurrentData();
    getFutureData();
    
    initMap();
    // console.log("the place is");
    // initMap(latitude,longitude);
};

const errorCallback = (position) => {
    console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


function searchPlace(){
    var input = document.getElementById('search');
    autocomplete = new google.maps.places.Autocomplete(input, {types:['geocode']});
    autocomplete.addListener('place_changed', show);
}

function addMarker(){
    const map = new google.maps.Map(document.getElementById("map"),{
        zoom: 1,
        center:{
            lat:40.731,
            lng:-73.997

        },
        mapId: "DEMO_MAP_ID",
    });

    map.setZoom(6);
    const latlng = {
        lat:parseFloat(latitude),
        lng:parseFloat(longitude)
    };
    const marker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: latlng,
       
    });
    map.panTo(latlng);
}

function show(){
    
    var place =  autocomplete.getPlace();
    var name = place.name;
    
    console.log("place");
    console.log(place);
    console.log(place.name);
    latitude = place.geometry.location.lat();

    
    longitude = place.geometry.location.lng();
    console.log(latitude);

    
    // console.log("the place is");
    // initMap(latitude,longitude);
    const place_name = document.getElementById("place-name");
    place_name.innerHTML = name;

    getCurrentData();
    getFutureData();
    addMarker();
    
}
function addPlace(){
    
}
// function addPlace(){
//     var container= document.querySelector(".saved-places-container");
//     var input = document.createElement("place");
    
//     input.className = "saved-place-box"; 
//     container.appendChild(input);

// }
// var btn = document.getElementById("add-place-btn");
// btn.addEventListener("click", event => addPlace());