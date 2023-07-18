# SKY FINDER

## Description

Sky Finder is an interactive web application that allows users to track the current location of the International Space Station (ISS) in real-time. The application displays the longitude and latitude of the ISS, its speed, altitude, and the corresponding location on the ground. Additionally, users can input their current location to calculate the distance between their location and the ISS's current ground position. The application also provides information about the sunrise and sunset times at the ISS's location.
<br>[visit the Deployed site](https://ssherp.github.io/SkyFinder-project/)

## Features

*	Real-time tracking of the ISS's location on a map.
*	Display of ISS's longitude and latitude coordinates.
*	Display of ISS's speed and altitude.
*	Input field to enter the user's location and calculate the distance from the ISS.
*	Display of sunrise and sunset times at the ISS's location.
*	Search history functionality to store and display previously searched locations.


## Usage

1.	Upon opening the application, the current location of the ISS will be displayed on the map.
2.	The latitude and longitude coordinates of the ISS will be shown in the "ISS Location" card.
3.	The speed and altitude of the ISS will be displayed in their respective cards.
4.	To calculate the distance between the user's location and the ISS, enter the city name in the "Your Location" input field and click the "Search" button.
5.	The distance between the user's location and the ISS will be displayed in kilometers.
6.	The sunrise and sunset times at the ISS's location will be shown in the "Current Sunrise/Sunset Times at the ISS" card.
7.	The search history will be displayed below the input section, showing previously searched city names. Clicking on a city name will recalculate the distance and update the display.

![SkyFinder site screenshot](./assets/image/screencapture-SkyFinder.png)
## Technologies Used

*   HTML
*	CSS (Bulma framework)
*	JavaScript
*	Leaflet.js (JavaScript library for interactive maps)
*	Day.js (JavaScript library for date and time manipulation)


## Contributors:

### Timothy Su
* [[Portfolio](https://timothysu1.github.io/portfolio-timothysu/)
* [LinkedIn](https://www.linkedin.com/in/timothysu1/)
### Sonam Sherpa
* [Portfolio](htps://ssherp.github.io/portfolio/)
* [LinkedIn](https://www.linkedin.com/in/sonam-sherpa-306559280)
### Sam Thomas
* [Portfolio](https://figuri.github.io/figuri-portfolio/)
* [LinkedIn](https://www.linkedin.com/in/samuel-thomas-b82614183/)


## credits:

*	Leaflet.js: https://leafletjs.com/
*	Bulma CSS Framework: https://bulma.io/
*	Day.js: https://day.js.org/
*	OpenStreetMap: https://www.openstreetmap.org/
*	Where The ISS At? API: https://wheretheiss.at/
*	MapQuest Geocoding API: https://www.mapquestapi.com/geocoding/
*	Sunrise-Sunset API: https://sunrise-sunset.org/api
*   astronaut-image: https://www.flaticon.com/free-icon/astronaut_2026502?related_id=2026523&origin=search
*   Haversine Formula: https://en.wikipedia.org/wiki/Haversine_formula


## learning Point:

One of the key learning points from this project is the integration of APIs to fetch real-time data. The project demonstrates how to make API requests using `fetch()` to obtain the ISS coordinates, sunrise and sunset times, and geolocation data. It highlights the importance of handling asynchronous operations and utilizing promises to handle API responses.

<br>Additionally, the project showcases the use of mapping libraries like Leaflet.js to visualize and interact with geographical data. It provides insights into working with maps, markers, and icons, as well as implementing map tile layers to display map data from external sources.

<br>Overall, this project offers valuable hands-on experience in working with APIs, asynchronous programming, and mapping libraries, which are essential skills for web development and data visualization.

<br>This project provided valuable learning opportunities in working collaboratively as a group and effectively utilizing GitHub for version control and collaboration. Here are some key points regarding group work and GitHub:
1.	Collaborative Workflow: The project required collaboration and coordination among group members. It taught us how to divide tasks, assign responsibilities, and work together to achieve project goals. We learned the importance of effective communication, task delegation, and regular progress updates.
2.	Branching and Merging: GitHub facilitated collaboration by allowing us to work on separate branches for different features or tasks. We learned how to create branches, make changes, and merge them back into the main branch. This approach ensured that everyone could work independently and merge their contributions seamlessly.
3.	Pull Requests and Code Reviews: We utilized GitHub's pull request feature to review and discuss code changes. This allowed us to provide feedback, suggest improvements, and ensure code quality. We learned how to review pull requests, leave comments, and address feedback before merging changes.
4.	Conflict Resolution: During collaborative work, conflicts may arise when merging changes from different branches. We learned how to resolve conflicts by carefully comparing and merging conflicting code. This process helped us develop skills in conflict resolution and merging code changes smoothly.
5.	Version Control: GitHub served as a reliable version control system throughout the project. It allowed us to track changes, revert to previous versions if needed, and maintain a comprehensive project history. We learned the importance of committing changes frequently and writing meaningful commit messages.

<br>Overall, working as a group and utilizing GitHub for collaboration provided us with valuable experience in collaborative software development, effective communication, version control, and code organization. These skills are essential for successful teamwork and are widely applicable in professional software development environments.
