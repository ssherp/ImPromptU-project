
var map = L.map('map').setView([51.505, -0.09], 13);

var requestUrl = 'http://api.open-notify.org/iss-now.json';

fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var givenTime = document.querySelector(".time");
        var satCords = document.querySelector(".cords");
        var normalTime = dayjs.unix(data.timestamp);
        console.log(data);
        givenTime.textContent = normalTime;

        setInterval(function () {
            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    var latCord = data.iss_position.latitude;
                    var lonCord = data.iss_position.longitude;
                    satCords.textContent = "Latitude: " + latCord + " / Longitude: " + lonCord;
                });
        }, 1000);

        setInterval(function () {
            $(".time").text(dayjs().format("MMM DD YYYY  H:mm:ss"));
        }, 1000);

        // cityLocation(latCord, lonCord);
    });
        //  function cityLocation(lat, lon)








