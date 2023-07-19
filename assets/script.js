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
            // above function is used to get ISS coordinates
        })
        .then(function (data) {
            var satCords = document.querySelector(".cords");
            // above variable is used to display ISS coordinates by selecting the class in the html
            latCord = Number(data.latitude);
            lonCord = Number(data.longitude);
            // above variables are used to store the ISS coordinates by converting them to numbers
            satCords.textContent = "Latitude: " + latCord + " / Longitude: " + lonCord;
            // satCords is used to display the ISS coordinates on the page
            var locLat = document.querySelector('#lat')
            var locLon = document.querySelector('#lon')
            // above variables select the latitude and longitude elements in the html
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
// above variables are used to store the city coordinates
var cityInput = document.querySelector('#user-city');
var cityFormEl = document.querySelector('.city-form');
// here the variables are used to select the city input and city form elements in the html using the class and id
var citySubmit = function (event) {

    event.preventDefault();
    var city = cityInput.value.trim();
    cityInput.value = "";
    // cityInput.value.trim() is used to remove any spaces from the city name
    // cityInput.value = ""; is used to clear the city input field after the city name is submitted
    // above variables are used to get the city name from the user input
    if (city) {
        console.log(city);
        getCity(city);
        loadSearchHistory();
        // loadSearchHistory(); is placed here so that the search history is updated when a new city is searched
    }
};
cityFormEl.addEventListener('submit', citySubmit);

var searchHistory = [];
// array to store searched cities, the array will be populated by the search history items
// the variable is placed outside of the function so that it can be accessed by the displaySearchHistory function (scope)
var getCity = function (city) {
    var geoRequest = "https://www.mapquestapi.com/geocoding/v1/address?key=xA9mxXLhrWpVTjmbArNX6dzhxdpac5jF&location=" + city + "&outFormat=json"
    // above variable is used to get city coordinates by using the mapquest api
    fetch(geoRequest)
        // the fetch request is used to get the city coordinates from the mapquest api
        .then(function (response) {

            return response.json()
        })
        .then(function (data) {
            console.log(data)
            cityLat = data.results[0].locations[0].displayLatLng.lat;
            cityLon = data.results[0].locations[0].displayLatLng.lng;
            // above function is used to get city coordinates
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
        // variable below is the current search history entry
        var searchEntry = searchHistory[i];
        // variable below is the city name
        var cityName = searchEntry.city;
        // adding list items to search history
        var listItem = document.createElement("li");
        listItem.textContent = cityName;
        // adding event listener to search history list items
    };
    // this is where the list items are added to the page
    searchHistoryContainer.appendChild(listItem);
}
// below function loads search history from local storage
var loadSearchHistory = function () {
    var savedSearchHistory = localStorage.getItem("searchHistory");
    if (savedSearchHistory) {
        searchHistory = JSON.parse(savedSearchHistory);
        // conditional to make sure search history is not empty
    }
    displaySearchHistory();
};
loadSearchHistory();
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
    // above is the radius of the earth
    lat1 *= Math.PI / 180;
    lon1 *= Math.PI / 180;
    lat2 *= Math.PI / 180;
    lon2 *= Math.PI / 180;
    // above the coordinates are converted to radians
    var lonDif = (lon2 - lon1) / 2;
    var latDif = (lat2 - lat1) / 2;
    // above the difference between the coordinates is calculated
    var abd = (Math.sin(latDif)) ** 2 + Math.cos(lat1) * Math.cos(lat2) * (Math.sin(lonDif)) ** 2
    var distance = 2 * radius * Math.asin(Math.sqrt(abd));
    return distance
    // above the distance is calculated using the haversine formula and the result is returned
}
//Calculates the distance between the ISS and the user's input
var distanceCalc = function () {
    var distance = haversine(latCord, lonCord, cityLat, cityLon);
    document.querySelector('#distance').textContent = distance.toFixed(2)
    console.log(distance);
};

var cityMarker;
var neswPoint = "";

var findDirection = function() {

    var direction = "";
    // above variable is used to store the direction
    if (latCord > cityLat) {
        direction += "North ";
    } else if (latCord < cityLat) {
        direction += "South ";
    }
    // above if statement checks if the ISS is north or south of the city
    if (lonCord > cityLon) {
        direction += "East";
    } else if (lonCord < cityLon) {
        direction += "West";
    }
    // above if statement checks if the ISS is east or west of the city
    console.log("Direction: " + direction);
    // the direction is logged to the console

    neswPoint=direction


      if (cityMarker) {
        map.removeLayer(cityMarker);
    }

    cityMarker = L.marker([cityLat, cityLon])
        .bindTooltip(neswPoint, { permanent: true, direction: 'center' })
        .addTo(map);
};





