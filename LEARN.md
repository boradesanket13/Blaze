This is the documentation to learn how to built this app, to undestand completely go through the complete LEARN.md file.

Making this simple Weather App built using vanilla JavaScript & Open Weather API. 
It gives the current weather info of all the cities in the world as soon as you enter the city name.

This process of building is divided into steps:

Step:1 ->

Selecting an API for our APPSelecting an API for our APP.
To show the weather data we need it to fetch it from somewhere, here come the "OpenWeather" API for our rescue.
It is free and allows us use it's data for aour app, for which you need to register to their site ![Open Weather](https://openweathermap.org/).

- Create your account.
- Select a free package.
- Make sure to register for API key.

Step:2 ->

After getting API key now built the structure of app using html,
design it with using diffrent icons as per your preference ![ionicons](https://ionic.io/ionicons).
create a div and card to show the weather data, add data sections where temp, windspeed,humidity will be shown.
add sliders to change the temp from celcius to farenheight.
add a button for light and dark theme mode.

Step:3 ->

Now add the backgrouond image for every search.
when you search a city its related images will be new background for our app, if no image image is found the a default image will be shown.
all the images are searched from !["unsplash"](https://unsplash.com/images). 

Step:4 ->

Adding the JavaScript!

- Selecting all the elements of HTML.
- Adding API key to .js file.
- Fetching the data from the URL : Fetch method calls the raw data from the API in the form of JSON. Next we convert the JSON data to
  object so that we can access the data by using package-lock.json().
- convert the data in object to access the thing we wanted.



