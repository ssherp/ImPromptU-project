
var map = L.map('map').setView([51.505, -0.09], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'



}).addTo(map);
var lmark = L.marker([10, 10]).addTo(map)

function moveISS() {
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function (data) {
        var lat = data['iss_position']['latitude'];
        var lon = data['iss_position']['longitude'];

        // See leaflet docs for setting up icons and map layers
        // The update to the map is done here:
        iss.setLatLng([lat, lon]);
        isscirc.setLatLng([lat, lon]);
        map.panTo([lat, lon], animate = true);
    });
    setTimeout(moveISS, 5000);
}



var requestUrl = 'http://api.open-notify.org/iss-now.json';
function issFetch() {
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
         var satCords = document.querySelector(".cords");
        var latCord = data.iss_position.latitude;
        var lonCord = data.iss_position.longitude;
        satCords.textContent = "Latitude: " + latCord + " / Longitude: " + lonCord;
    })}
// cityLocation(latCord, lonCord);
setInterval (function(){$(".time").text(dayjs().format("MMM DD YYYY  H:mm:ss"))},
         1000)
setInterval(issFetch,5000)
//  function cityLocation(lat, lon)

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

    console.log(distance);
}