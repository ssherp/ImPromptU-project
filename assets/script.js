var map = L.map('map').setView([0, 0], 3);

var lmark;
var myIcon = L.icon({
    iconUrl: './assets/image/astronaut.png',
    iconSize: [60, 60]

});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'

}).addTo(map);

var updateMarker = function (newLat, newLng) {
    if (lmark) {
        lmark.setLatLng([newLat, newLng]);
    } else {
        lmark = L.marker([newLat, newLng], { icon: myIcon }).addTo(map);
    }
    map.panTo([newLat, newLng], { animate: true });
};

var requestIssUrl = 'http://api.open-notify.org/iss-now.json';
function issFetch() {

    fetch(requestIssUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var satCords = document.querySelector(".cords");
            var latCord = parseFloat(data.iss_position.latitude);
            var lonCord = parseFloat(data.iss_position.longitude);
            satCords.textContent = "Latitude: " + latCord + " / Longitude: " + lonCord;
            updateMarker(latCord, lonCord);
        })
}

issFetch();


setInterval(function () {
    $(".time").text(dayjs().format("MMM DD YYYY  H:mm:ss"))
},
    1000);
setInterval(issFetch, 5000)

var cityLat;
var cityLon;

// function getCity(){ //add search info city 
var geoRequest = "https://www.mapquestapi.com/geocoding/v1/address?key=xA9mxXLhrWpVTjmbArNX6dzhxdpac5jF&location=Washington&outFormat=json"
fetch(geoRequest)
    .then(function (response) {

        return response.json()
    })
    .then(function (data) {
        console.log(data)
        cityLat = data.results[0].locations[0].displayLatLng.lat;
        cityLon = data.results[0].locations[0].displayLatLng.lng;
        calculateDistanceToISS();
    })

    function calculateDistanceToISS() {
        fetch(requestIssUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            var issLat = parseFloat(data.iss_position.latitude);
            var issLon = parseFloat(data.iss_position.longitude);
            var distance = haversine(cityLat, cityLon, issLat, issLon);
            console.log('Distance between the city and the ISS:', distance.toFixed(2), 'mi');

          });
      }
    
var sunRequest = "https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today"
fetch(sunRequest)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
        //cityRise
    })

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