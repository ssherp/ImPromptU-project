
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