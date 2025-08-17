

var longitude = 0.0;
var latitude = 0.0;
var count = 0;
var i =0;
var place_name_log = new String(" ");
var saved_place_count=0;

const storedPlacesStr= localStorage.getItem('locations');
let storedPlacesObj=null;
let storedPlaces = new Map();
if (storedPlacesStr) {
  try {
    storedPlacesObj = JSON.parse(storedPlacesStr);

    storedPlaces= new Map(Object.entries(storedPlacesObj));
  } catch (e) {
    console.error('Failed to parse locations from localStorage:', e);
  }
}




function start(){
    initMap();
    searchPlace();
}


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
    showPlaceCardsOnLoad();
    showSavedPlaces()

}

function geocodeLatLng(geocoder,map,infoWindow,latitude,longitude){
   
    const latlng = {
        lat:parseFloat(latitude),
        lng:parseFloat(longitude)
    };
    

    geocoder.geocode({location:latlng})
    .then((response) =>{
        showCurrentPlace(response);
        
            map.setZoom(8);
            
        
            const marker = new google.maps.marker.AdvancedMarkerElement({
                map,
                position: latlng,
               
            });
            map.panTo(latlng);
        
    })
    
    
    
}

function showCurrentPlace(response){
    const place_name = document.getElementById("place-name");
    
    for(var k =0;k<response.results.length;k++){
        for (var i=0; i<response.results[k].address_components.length; i++){
           for (var j=0; j<response.results[k].address_components[i].types.length; j++){
                if (response.results[k].address_components[i].types[k]=="sublocality"){
                    var name = response.results[k].address_components[i].long_name;
                }
            }
        }
    }

    place_name.innerHTML = name;
    place_name_log = name;
}



async function getCurrentData(){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=56ce703a41415e8c6aee4f9d2bf5ca01`;
    
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        checkPlaceInStorage();
        displayClimateInfo(data);
    }catch (error){
    }
}

async function getFutureData(){
    const url2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=56ce703a41415e8c6aee4f9d2bf5ca01`;
    try{
        const forecast_response = await fetch(url2);
        if(!forecast_response.ok){
            throw new Error(`Response status: ${forecast_response.status}`);
        }

        const forecast_data = await forecast_response.json();
        


        for(let i=0;i<6;i++){
        
        let temp = `day${i+1}-temp`
        let weather = `day${i+1}-weather`
        let humidity = `day${i+1}-humidity`
        let pressure = `day${i+1}-pressure`
        displayForecastInfo(forecast_data,temp,weather, humidity,pressure,i);
        }
    }catch (error){
        console.error(error.message);
    }
}
function getDayIndex(){
    const now = new Date();
    let day_index = now.getDay()%7;
    return day_index;
}


function displayClimateInfo(data){
    const days_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    day_index = getDayIndex();
    let day = document.getElementById(`current-day-title`)
    day.innerHTML = days_of_week[day_index];

    var temp = (data.main.temp -273.0).toFixed(2);
    var tempfeelslike = (data.main.feels_like-273).toFixed(2);
    var weather = data.weather[0].main;
    var weatherdesc = data.weather[0].description;
    var pressure = data.main.pressure+ " hPa";
    var humidity = data.main.humidity + " %";
    
    let icon = data.weather[0].icon;
    
    const current_temp = document.getElementById("current-temp");
    const temp_feels_like = document.getElementById("temp-feels-like");
    const current_weather = document.getElementById("current-weather");
    const current_pressure = document.getElementById("current-pressure");
    const current_humidity = document.getElementById("current-humidity");
    current_temp.innerHTML =temp;
    temp_feels_like.innerHTML = tempfeelslike;
    current_weather.innerHTML  = weather;
    current_pressure.innerHTML = pressure;
    current_humidity.innerHTML = humidity;
    
    decidingBackground(icon)
    decidingTheme(icon)
}
function decidingBackground(icon){
    let icons_map = new Map([["01d",0],["02d",1],["03d",2],["04d",3],["09d",4],["10d",5],["11d",6],["13d",7],["50d",8],["01n",9],["02n",10],["03n",11],["04n",12],["09n",13],["10n",14],["11n",15],["13n",17],["50n",18]])
    const insert_arr = ["./images/clearsky.jpg","./images/sky.jpg","./images/sky.jpg","./images/sky.jpg","./images/rainfall.jpg","./images/rainfall.jpg","./images/thunderstorm.jpeg","./images/snowfall.jpg","./images/mist.jpg","./images/clearnightsky.jpg","./images/nightclouds.jpg","./images/nightclouds.jpg","./images/nightclouds.jpg","./images/rainfall1.jpeg","./images/rainfall1.jpeg","./images/thunderstorm.jpg","./images/snowfall.jpg","./images/mist.jpg"]
    let id = icons_map.get(icon)
    let img_insert = insert_arr[id];
    
    document.getElementById("body").style.backgroundImage = `url(${img_insert})`;
    
}
function decidingTheme(icon){
    let decidingArray= ["01n","02n","03n","04n","09n","10n","11n","13n","50n"];
    const exists = decidingArray.includes(icon)
    const body = document.querySelector("body");
    
    if(exists){
        body.classList.add("dark-theme")
        
    }
}

function displayForecastInfo(data,temp,weather,humidity,pressure,i){
    const now = new Date();
    let day_index = (now.getDay()+i+1)%7;
    
    const days_of_week = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S'];
    
        let day = document.getElementById(`day${i+1}-title`)
        day.innerHTML = days_of_week[day_index];

        let day_temp_info = (data.list[i].main.temp-273).toFixed(1);
        let day_temp = document.getElementById(temp);
        day_temp.innerHTML = day_temp_info;

        let day_weather_info = data.list[i].weather[0].main;
        let day_weather = document.getElementById(weather);
        day_weather.innerHTML = day_weather_info;

        let day_humidity_info = data.list[i].main.humidity
        let day_humidity = document.getElementById(humidity);
        day_humidity.innerHTML = day_humidity_info;

        let day_pressure_info = data.list[i].main.pressure;
        let day_pressure = document.getElementById(pressure);
        day_pressure.innerHTML = day_pressure_info;
        
    
   

}

const successCallback = (position)=> {
    latitude = (position.coords.latitude).toFixed(3);
    longitude = (position.coords.longitude).toFixed(3);
    
    getCurrentData();
    getFutureData();
    
    initMap();
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
    map.setZoom(6);
}

function show(){
    
    var place =  autocomplete.getPlace();
    var name = place.name;
    latitude = place.geometry.location.lat();
    longitude = place.geometry.location.lng();
    

    place_name_log = name;
    const place_name = document.getElementById("place-name");
    place_name.innerHTML = name;


    getCurrentData();
    getFutureData();
    addMarker();
    
    
}

var add_place_btn = document.getElementById("add-place-btn");
function checkPlaceInStorage(){
    const newCoord = [parseFloat(latitude).toFixed(3),parseFloat(longitude).toFixed(3)]

    const newCoordStr = newCoord.toString();
    
    const exists = storedPlaces.has(newCoordStr);
   
    if(!exists ) {
        add_place_btn.style.display = "block" 
        document.getElementById("add-place-btn").hidden = false
        
    } else {
        document.getElementById("add-place-btn").hidden = true
        add_place_btn.style.display = "none" 
       
    }
}

add_place_btn.addEventListener("click", event => addPlace());
function addPlace(){
    if(storedPlaces.size<10){
        add_place_btn.style.display = "none"
        let name = (document.getElementById("place-name")).innerText  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        const newCoord = [parseFloat(latitude).toFixed(3),parseFloat(longitude).toFixed(3)]
    
        const newCoordStr = newCoord.toString();
    
        storedPlaces.set(newCoordStr, name);
        localStorage.setItem("locations", JSON.stringify(Object.fromEntries(storedPlaces)));
        
        showSavedPlaces()
        addPlaceCard()
    }
    else{
        window.alert("Only 10 places allowed")
    }
    

    
    
}
var remove_place_btn = document.getElementById("header-logo");
remove_place_btn.addEventListener("click", (e) => {
    
    storedPlaces.clear()
    localStorage.setItem("locations", JSON.stringify(Object.fromEntries(storedPlaces)));
    
    
});

async function showSavedPlaces(){
    let place;
    
    let promises =[];
    let keys = [];
    let values = [];
    const calls =[];
    for (const [key, value] of storedPlaces) {
        place = key;        
        let coords = place.replace(/[\(\) ]/g,'').split(',');
        let lat1 = coords[0]
        let lng1 = coords[1]
        

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lng1}&appid=56ce703a41415e8c6aee4f9d2bf5ca01`;
        
        promises.push(await fetch(url))
        values.push(value);
        keys.push(key)
        
    }
    
    Promise.all(promises).then( result => {
        let index = 0;
        let cards = document.querySelectorAll(".saved-place-box");
        result.forEach((e, index) => {
            getDatafromPromise(e,cards[index],index,values[index],keys[index])
            
            
        });
    });
}
async function getDatafromPromise(p,card,index,val,key){
    
    card.innerHTML = "";
    let data = await p.json();
    let name = val
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let icon = data.weather[0].icon;

    const buttons_container = document.createElement("div")
    buttons_container.className = "buttons-container"
    
   

    const clear_btn = document.createElement("div")
    clear_btn.className = "clear-place-button"
    clear_btn.innerText = "Remove Place"

    const know_more_btn = document.createElement("div")
    know_more_btn.className = "know-more-button"
    know_more_btn.innerText = "Know More"

    const temp_element = document.createElement("div");
    temp_element.className = "saved-place-temp-box"
    const humidity_element = document.createElement("div");
    humidity_element.className = "saved-place-humidity-box"
    const name_and_icon_element = document.createElement("div");
    name_and_icon_element.className = "saved_place_name_and_icon_box"
    const name_element = document.createElement("div");
    name_element.className = "saved-place-name-box"
    const climate_time_element= document.createElement("div");
    climate_time_element.className = "saved-place-weather-image";
    climate_time_element.innerHTML = `<img alt="icon" src="http://openweathermap.org/img/w/${icon}.png" width="80" height="80" />`
    
    const temp_node = document.createTextNode(`Temperature: ${temp} \u00B0C`);
    const humidity_node = document.createTextNode(`Humidity: ${humidity} %`);
    const name_node = document.createTextNode(`${name}`);

    humidity_element.appendChild(humidity_node)
    temp_element.appendChild(temp_node);
    name_element.appendChild(name_node);
    name_and_icon_element.appendChild(name_element)
    name_and_icon_element.appendChild(climate_time_element)
    
    buttons_container.appendChild(know_more_btn)
    buttons_container.appendChild(clear_btn)
    

    card.appendChild(name_and_icon_element)
    card.appendChild(temp_element)
    card.appendChild(humidity_element)
    card.appendChild(buttons_container)
    
    clear_btn.addEventListener('click' ,()=>{
        
        if (storedPlaces.has(key)) {
            console.log("key exists")
        }
        storedPlaces.delete(key)

        localStorage.setItem("locations", JSON.stringify(Object.fromEntries(storedPlaces)));
        
        card.remove();
        add_place_btn.style.display = "block"
        
    })
    know_more_btn.addEventListener('click' ,()=>{
        
            let place = key;        
            let coords = place.replace(/[\(\) ]/g,'').split(',');
            latitude = coords[0]
            longitude = coords[1]
            const modal_place_name = document.getElementById("modal-place-name");
            modal_place_name.innerText = val
            let modal_container = document.querySelector(".modal-container")
            modal_container.style.display = "block";
            getModalData();
        
    })
   

    card.addEventListener('mouseenter', function() {
        
        
            card.classList.add('hovered')
        
        
    })
    card.addEventListener('mouseleave', function(){
        card.classList.remove('hovered')
        
    })
    const modal_close_btn = document.getElementById("modal-close-btn")
    modal_close_btn.addEventListener('click',()=>{
         let modal_container = document.querySelector(".modal-container")
        modal_container.style.display = "none";
        
    })

    async function getModalData(){
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=56ce703a41415e8c6aee4f9d2bf5ca01`;
    
        try{
            const response = await fetch(url);
            if(!response.ok){
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();
            
            addModalData(data);
        }catch (error){
            console.error(error.message);
        }

    }
    function addModalData(data){
        let modal_container = document.querySelector(".modal-container")
        let modal_place_name = document.querySelector(".modal-place-name")
        let modal_weather_image = document.querySelector(".modal-weather-image")
        let modal_temperature = document.querySelector(".modal-temperature")
        let modal_weather = document.querySelector(".modal-weather")
        let modal_pressure = document.querySelector(".modal-pressure")
        let modal_humidity = document.querySelector(".modal-humidity")

        let temp = data.main.temp;
        let weather = data.weather[0].main;
        let pressure = data.main.pressure;
        let humidity = data.main.humidity;
    
        let icon = data.weather[0].icon;
    
    
        modal_weather_image.innerHTML = `<img alt="icon" src="http://openweathermap.org/img/w/${icon}.png" width="100" height="100" />`
        modal_temperature.innerHTML = `Temperature  :  ${temp}`
        modal_weather.innerHTML = `Weather  :  ${weather}`
        modal_pressure.innerHTML = `Pressure  :  ${pressure}`
        modal_humidity.innerHTML = `Humidity  :  ${humidity}`


    }
   
    
    
    
}

function showPlaceCardsOnLoad(){

    let container= document.querySelector(".saved-places-container");
    container.innerHTML = ""

    for(i=0;i<storedPlaces.size;i++){
        
        var input = document.createElement("div");
        
        input.className = "saved-place-box swiper-slide"; 
       
        container.prepend(input);
    }
    
}
function addPlaceCard(){
    var container= document.querySelector(".saved-places-container");
    var input = document.createElement("div");
    
    input.className = "saved-place-box swiper-slide"; 
    
    container.prepend(input);
   
}


