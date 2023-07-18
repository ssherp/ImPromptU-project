var map = L.map('map').setView([0, 0], 3);

var lmark;
var myIcon = L.icon({
    iconUrl: './assets/image/astronaut.png',
    iconSize: [60, 60]

});
//Creates map element onto the page
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'

}).addTo(map);
// Changes the marker's location everytime the ISS coordinates update
var updateMarker = function (newLat, newLng) {


    lmark.setLatLng([newLat, newLng]);
    map.panTo([newLat, newLng], animate = true);
};

var latCord;
var lonCord;

var requestIssUrl = 'https://api.wheretheiss.at/v1/satellites/25544';
function issFetch() {

    fetch(requestIssUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var satCords = document.querySelector(".cords");
            latCord = Number(data.latitude);
            lonCord = Number(data.longitude);
            satCords.textContent = "Latitude: " + latCord + " / Longitude: " + lonCord;
            var locLat = document.querySelector('#lat')
            var locLon = document.querySelector('#lon')
            locLat.textContent = latCord.toFixed(2);
            locLon.textContent = lonCord.toFixed(2);
            console.log(latCord, lonCord)

            if (!lmark) {
                lmark = L.marker([latCord, lonCord], { icon: myIcon }).addTo(map)
            }
            if (cityLat && cityLon && latCord && lonCord) {
                distanceCalc();
                findDirection();
            }
            //distanceCalc();
            updateMarker(latCord, lonCord)
            sunRise(latCord, lonCord)
        })
};

issFetch();


setInterval(function () { $(".time").text(dayjs().format("MMM DD YYYY  H:mm:ss")) },
    1000);
setInterval(issFetch, 5000)

// function getCity(){ //add search info city 

var cityLat;
var cityLon;


var cityInput = document.querySelector('#user-city');
var cityFormEl = document.querySelector('.city-form');

var citySubmit = function (event) {

    event.preventDefault();
    var city = cityInput.value.trim();
    cityInput.value = "";
    if (city) {
        console.log(city);
        getCity(city);
        loadSearchHistory();
    }
};


cityFormEl.addEventListener('submit', citySubmit);

var searchHistory = []; 
// array to store searched cities

var getCity = function (city) {
    var geoRequest = "https://www.mapquestapi.com/geocoding/v1/address?key=xA9mxXLhrWpVTjmbArNX6dzhxdpac5jF&location=" + city + "&outFormat=json"
    fetch(geoRequest)
        .then(function (response) {

            return response.json()
        })
        .then(function (data) {
            console.log(data)
            cityLat = data.results[0].locations[0].displayLatLng.lat;
            cityLon = data.results[0].locations[0].displayLatLng.lng;

            //  cityLocation(cityLat,cityLon)



        })
// updating function to add city to search history
// and update the search history list
// this is done by updating the searchHistory array
        var searchEntry = {
            city: city,
            lat: cityLat,
            lon: cityLon
        };
        searchHistory.push(searchEntry);
// stores search history in local storage
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
};
// created a function to display search history
var displaySearchHistory = function () {
    var searchHistoryContainer = document.querySelector("#search-history");
    searchHistoryContainer.innerHTML = "";
    // adding a list item for each search history entry
    for (var i = 0; i < searchHistory.length; i++) {
        var searchEntry = searchHistory[i];
        var cityName = searchEntry.city;
// adding list items to search history
        var listItem = document.createElement("li");
        listItem.textContent = cityName;
// adding event listener to search history list items
        listItem.addEventListener("click", function () {
            cityLat = searchEntry.lat;
            cityLon = searchEntry.lon;
            distanceCalc();
            findDirection();
        });
        
        // this is where the list items are added to the page
        searchHistoryContainer.appendChild(listItem);
    }
};
// below function loads search history from local storage
var loadSearchHistory = function () {
    var savedSearchHistory = localStorage.getItem("searchHistory");
    if (savedSearchHistory) {
        searchHistory = JSON.parse(savedSearchHistory);
        // conditional to make sure search history is not empty
    }
    displaySearchHistory();
};

// added above so that search history is displayed on page load


function sunRise(latCord, lonCord) {

// function to get sunrise and sunset times
    var sunRequest = "https://api.sunrise-sunset.org/json?lat=" + latCord + "&lng=" + lonCord + "&date=today"
    fetch(sunRequest)
        .then(function (response) {
// fetch request to get sunrise and sunset times

            return response.json()
        })
        .then(function (data) {
            console.log(data)
            var issRise = document.querySelector(".sun-rise")
            var issSet = document.querySelector(".sun-set")
// .then function to display sunrise and sunset times

            issRise.textContent = data.results.sunrise;
            issSet.textContent = data.results.sunset;
        })
};

var haversine = function (lat1, lon1, lat2, lon2) {
    var radius = 6371; //kilometers
    lat1 *= Math.PI / 180;
    lon1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    lon2 *= Math.PI / 180;
    var lonDif = (lon2 - lon1) / 2;
    var latDif = (lat2 - lat1) / 2;
    var abd = (Math.sin(latDif)) ** 2 + Math.cos(lat1) * Math.cos(lat2) * (Math.sin(lonDif)) ** 2
    var distance = 2 * radius * Math.asin(Math.sqrt(abd));
    return distance
}
//Calculates the distance between the ISS and the user's input
var distanceCalc = function () {
    var distance = haversine(latCord, lonCord, cityLat, cityLon);
    document.querySelector('#distance').textContent = distance.toFixed(2)
    console.log(distance);
};

var findDirection = function() {
    var direction = "";
    if (latCord > cityLat) {
        direction += "North ";
    } else if (latCord < cityLat) {
        direction += "South ";
    }
    if (lonCord > cityLon) {
        direction += "East";
    } else if (lonCord < cityLon) {
        direction += "Wast";
    }
    console.log("Direction:" + direction);
};




