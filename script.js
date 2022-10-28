function divActive() {
    document.querySelector(".weather").style.display = "flex"
    document.querySelector("#confirm").style.display = "none"
}

function functionAlert(msg, myYes) {
    document.querySelector(".weather").style.display = "none"
    var confirmBox = $("#confirm")
    confirmBox.find(".message").text(msg)
    confirmBox
        .find(".yes")
        .unbind()
        .click(function () {
            confirmBox.hide()
        })
    confirmBox.find(".yes").click(myYes)
    confirmBox.show()
}

let temp1save,
  temp2save = 0,
  showTime;
let weather = {
    apiKey: "e1b292964b3c86ad361260f80c9496e0",
    fetchWeather: function (city, lat = null, lon = null) {
        if (lat && lon) {
            fetch(
                "https://api.openweathermap.org/data/2.5/weather?lat="
                + lat + "&lon="
                + lon + "&units=metric&appid=" 
                + this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    functionAlert()
                }
                else{
                    divActive()
                }
                return response.json()
            })
            .then((data) => this.displayWeather(data))
        }
        else if (city) {
            fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    functionAlert()
                }
                else{
                    divActive()
                }
                return response.json()
            })
            .then((data) => this.displayWeather(data))
            .catch((err) => {
        this.displayAlert(err.message, () => {});
      });
    }
  },
  displayWeather: function (data) {
    const {
      name,
      timezone,
      main: { temp, humidity },
      wind: { speed },
      weather: [{ icon, description }],
    } = data;
    console.log(data);
    const temp2 = temp * 1.8 + 32;
    document.querySelector(".city").innerText = `Weather in ${name}`;
    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;

    !document.querySelector("#checkbox").checked
      ? (document.querySelector(".temp").innerText = `${temp.toFixed(2)}℃`)
      : (document.querySelector(".temp").innerText = `${temp2.toFixed(2)}℉`);
    temp1save = temp.toFixed(2);
    temp2save = temp2.toFixed(2);
    speed1 = speed.toFixed(2);
    speed2 = (speed * 0.62137).toFixed(2);

    const timeOptions = {
      hours: "2-digit",
      minutes: "2-digit",
    };
    showTime = setInterval(() => {
      let time = new Date(
        new Date().getTime() +
          timezone * 1000 +
          new Date().getTimezoneOffset() * 60000
      );
      document.querySelector("#time").innerText =
        time.toLocaleTimeString(undefined, timeOptions) +
        " " +
        time.toLocaleDateString();
    }, 1000);

    document.querySelector(".humidity").innerText = `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
  },
  displayAlert: function (msg, myYes) {
    const confirmBox = document.querySelector("#confirm");
    const weatherBox = document.querySelector(".weather");
    weatherBox.style.display = "none";
    confirmBox.style.display = "block";
    confirmBox.querySelector(".message").innerText = msg;
    confirmBox.querySelector(".yes").addEventListener("click", () => {
      myYes();
      weatherBox.removeAttribute("style");
      confirmBox.removeAttribute("style");
    });
  },
  search: function () {
    clearInterval(showTime);
    this.fetchWeather(document.querySelector(".search-bar").value);
    document.getElementById("search").focus();
    document.getElementById("search").value = "";
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search()
        }
    })

// ask for location permission
// if granted: show user's location weather data
// if blocked: show default location weather data
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    weather.fetchWeather(null, latitude, longitude);
  },
  () => weather.fetchWeather("Nashik")
);

function onTempChange() {
  !document.querySelector("#checkbox").checked
    ? ((document.querySelector(".temp").innerText = `${temp1save}℃`),
      (document.querySelector(
        ".wind"
      ).innerText = `Wind speed: ${speed1} km/h`))
    : ((document.querySelector(".temp").innerText = `${temp2save}℉`),
      (document.querySelector(
        ".wind"
      ).innerText = `Wind speed: ${speed2} mph`));
}

function reloadPage() {
  location.reload();
}

let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector(".toggle-btn");
//check if Dark mode is enabled
// if its enabled turn it off
// else turn it on
const enableDarkMode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkMode", null);
};

darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode")
    darkMode != "enabled" ?  enableDarkMode() : disableDarkMode()
})


function myFunction() {
  var element = document.getElementById("box");
  element.classList.toggle("light-mode");
  var e2 = document.getElementById("search");
  e2.classList.toggle("change");
}
