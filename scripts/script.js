

var longitude = 0.0;
var latitude = 0.0;
var count = 0;
var i =0;
var place_name_log = new String(" ");
var saved_place_count=0;
// console.log(localStorage.getItem("locations"));
console.log("hello")
const storedPlacesStr= localStorage.getItem('locations');
let storedPlacesObj=null;
let storedPlaces = new Map();
if (storedPlacesStr) {
  try {
    storedPlacesObj = JSON.parse(storedPlacesStr);

    storedPlaces= new Map(Object.entries(storedPlacesObj));
    // saved_place_count = storedPlaces.size
  } catch (e) {
    console.error('Failed to parse locations from localStorage:', e);
  }
}

console.log(localStorage.getItem("locations"));
//const storedPlaces= new Map(Object.entries(storedPlacesObj));
console.log(storedPlaces)


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
        //var temp = file.main.temp;
        //console.log(file);
        console.log(data);
        checkPlaceInStorage()
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


        for(let i=0;i<6;i++){
        
        let temp = `day${i+1}-temp`
        let weather = `day${i+1}-weather`
        let humidity = `day${i+1}-humidity`
        let pressure = `day${i+1}-pressure`
        displayForecastInfo(forecast_data,temp,weather, humidity,pressure,i);
        }
    }catch (error){
        // console.error('Error fetching data:', error);
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
    var pressure = data.main.pressure;
    var humidity = data.main.humidity;
    
    let icon = data.weather[0].icon;
    
    // const climate_time_box= document.getElementById("weather-image");
    
    // climate_time_box.innerHTML = `<img alt="icon" src="http://openweathermap.org/img/w/${icon}.png" width="100" height="100" />`
    
    
    console.log(typeof(icon))
    const current_temp = document.getElementById("current-temp");
    const temp_feels_like = document.getElementById("temp-feels-like");
    const current_weather = document.getElementById("current-weather");
    // const current_weather_description = document.getElementById("current-weather-description");
    const current_pressure = document.getElementById("current-pressure");
    const current_humidity = document.getElementById("current-humidity");
    current_temp.innerHTML =temp;
    temp_feels_like.innerHTML = tempfeelslike;
    current_weather.innerHTML  = weather;
    // current_weather_description.innerHTML = weatherdesc;
    current_pressure.innerHTML = pressure;
    current_humidity.innerHTML = humidity;
    // console.log(temp);

    // console.log(data);
    // console.log(name);
    // console.log(weather);
    // console.log(icon);
    decidingBackground(icon)
}
function decidingBackground(icon){
    let icons_map = new Map([["01d",0],["02d",1],["03d",2],["04d",3],["09d",4],["10d",5],["11d",6],["13d",7],["50d",8],["01n",9],["02n",10],["03n",11],["04n",12],["09n",13],["10n",14],["11n",15],["13n",17],["50n",18]])
    const insert_arr = ["./images/clearsky.jpg","./images/sky.jpg","./images/sky.jpg","./images/sky.jpg","./images/rainfall.jpg","./images/rainfall.jpeg","./images/thunderstorm.jpeg","./images/snowfall.jpg","./images/mist.jpg","./images/clearnightsky.jpg","./images/nightclouds.jpg","./images/nightclouds.jpg","./images/nightclouds.jpg","./images/rainfall.jpeg","./images/rainfall.jpeg","./images/thunderstorm.jpg","./images/snowfall.jpg","./images/mist.jpg"]
    let id = icons_map.get(icon)
    let img_insert = insert_arr[id];
    console.log("EXECUTED")
    document.getElementById("body").style.backgroundImage = `url(${img_insert})`;
    
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
    console.log(position);
    latitude = (position.coords.latitude).toFixed(3);
    longitude = (position.coords.longitude).toFixed(3);
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
    map.setZoom(6);
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

    place_name_log = name;
    // console.log("the place is");
    // initMap(latitude,longitude);
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
    console.log("hide")
    if(!exists ) {
        // document.add_place_btn.style.visibility = 'visible';
        // document.add_place_btn.hidden = false
        add_place_btn.style.display = "block" 
        document.getElementById("add-place-btn").hidden = false
        console.log("hide")
        
    } else {
        console.log("Coordinate already exists.");
        // document.add_place_btn.style.visibility = 'hidden';
        // body.classList.add("show")
        document.getElementById("add-place-btn").hidden = true
        add_place_btn.style.display = "none" 
        console.log("show")
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
        
        
        console.log(storedPlaces.get(newCoordStr));
        console.log("hello");
        console.log(localStorage.getItem("locations"));
        showSavedPlaces()
        addPlaceCard()
    }
    else{
        window.alert("Only 10 places allowed")
    }
    

    
    
}
var remove_place_btn = document.getElementById("header-logo");
remove_place_btn.addEventListener("click", (e) => {
    console.log("cleared")
    storedPlaces.clear()
    localStorage.setItem("locations", JSON.stringify(Object.fromEntries(storedPlaces)));
    // saved_place_count = 0;
    
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
        
        // console.log(place);
        // console.log(lat1)
        // console.log(lng1)

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lng1}&appid=56ce703a41415e8c6aee4f9d2bf5ca01`;
        
        promises.push(await fetch(url))
        // console.log("promises array");
        // console.log(promises);
        values.push(value);
        keys.push(key)
        // calls.push(url);
        
    }
    // const response1 = Promise.all(promises);
    // const data1 = response1.json()
    // return data1;
    
    Promise.all(promises).then( result => {
        
        
        let index = 0;
        let cards = document.querySelectorAll(".saved-place-box");
        console.log("inside promise all");
        console.log(result);
        result.forEach((e, index) => {
            getDatafromPromise(e,cards[index],index,values[index],keys[index])
            
            
        });
    });
}
async function getDatafromPromise(p,card,index,val,key){
    
    card.innerHTML = "";
    console.log("inside data getting");
    let data = await p.json();
    let name = val
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let icon = data.weather[0].icon;
    console.log(temp)

    const clear_btn = document.createElement("div")
    clear_btn.className = "clear-place-button"
    clear_btn.innerText = "Remove Place"
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

    const temp_node = document.createTextNode(`Temperature: ${temp}`);
    const humidity_node = document.createTextNode(`Humidity: ${humidity}`);
    const name_node = document.createTextNode(`${name}`);

    humidity_element.appendChild(humidity_node)
    temp_element.appendChild(temp_node);
    name_element.appendChild(name_node);
    name_and_icon_element.appendChild(name_element)
    name_and_icon_element.appendChild(climate_time_element)
    
    
    card.appendChild(name_and_icon_element)
    card.appendChild(temp_element)
    card.appendChild(humidity_element)
    card.appendChild(clear_btn)
    clear_btn.addEventListener('click' ,()=>{
        console.log(key)
        console.log(typeof(key))
        if (storedPlaces.has(key)) {
            console.log("key exists")
        }
        storedPlaces.delete(key)

        localStorage.setItem("locations", JSON.stringify(Object.fromEntries(storedPlaces)));
        console.log(storedPlaces)
        card.remove();
        add_place_btn.style.display = "block"
        
    })
    card.addEventListener('click' ,()=>{
        let place = key;        
        let coords = place.replace(/[\(\) ]/g,'').split(',');
        latitude = coords[0]
        longitude = coords[1]
        const modal_place_name = document.getElementById("modal-place-name");
        modal_place_name.innerText = val
        // getCurrentData();
        // getFutureData();
        let modal_container = document.querySelector(".modal-container")
        modal_container.style.display = "block";
        getModalData();
        
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
            console.log("MODAL")
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
        // let tempfeelslike = data.main.feels_like;
        let weather = data.weather[0].main;
        // let weatherdesc = data.weather[0].description;
        let pressure = data.main.pressure;
        let humidity = data.main.humidity;
    
        let icon = data.weather[0].icon;
    
    
        modal_weather_image.innerHTML = `<img alt="icon" src="http://openweathermap.org/img/w/${icon}.png" width="100" height="100" />`
        modal_temperature.innerHTML = `Temperature  :  ${temp}`
        modal_weather.innerHTML = `Weather  :  ${weather}`
        modal_pressure.innerHTML = `Pressure  :  ${pressure}`
        modal_humidity.innerHTML = `Humidity  :  ${humidity}`


    }
    // console.log(card[i]);
    // card[i].htmlContent = `<p>${data}</p>`
    console.log(data);
    console.log(".")
    
    
    
}
// function deleteSavedPlace(){
//         
// }
// async function getPromise(url){
//     const promise = await fetch(url);
//     // const promise = await promise1.json();
//     console.log("inside promise all");
//     return promise;

// }

// function actuallyShowSavedPlaces(){
//     showSavedPlaces();
// }
function showPlaceCardsOnLoad(){

    let container= document.querySelector(".saved-places-container");
    container.innerHTML = ""

    for(i=0;i<storedPlaces.size;i++){
        // console.log("SAVED PLACES")
        
        var input = document.createElement("div");
        
        input.className = "saved-place-box swiper-slide"; 
       
        // input.id = saved_place_count;
        container.prepend(input);
    }
    
}
function addPlaceCard(){
    // saved_place_count = saved_place_count+1;
    var container= document.querySelector(".saved-places-container");
    var input = document.createElement("div");
    
    input.className = "saved-place-box swiper-slide"; 
    
    // input.id = saved_place_count;
    container.prepend(input);
    console.log("container");
    console.log(container);
    // input.addEventListener('click',()=>{
        
    // })
}

// const swiper = new Swiper('.swiper',{
//             modules: [Navigation, Pagination],
//             direction : 'horizontal',
//             navigation :{
//                 nextEl :'swiper-button-next',
//                 prevEl:'swiper-btn-prev'
//             }
// })
