let temp1save, temp2save = 0;
let weather = {
  apiKey: "e1b292964b3c86ad361260f80c9496e0",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const temp2 = temp * 1.8 + 32;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;

    !document.querySelector("#checkbox").checked ? document.querySelector(".temp").innerText = temp + "℃" :
    document.querySelector(".temp").innerText = temp2 + "℉";
    temp1save = temp;
    temp2save = temp2;

    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Nashik");

function onTempChange() {
  !document.querySelector("#checkbox").checked ? 
  document.querySelector(".temp").innerText = temp1save + "℃" :
  document.querySelector(".temp").innerText = temp2save + "℉";
}


//clock code
function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let meridian = "AM";

  if (hh == 0) {
    hh = 12;
  }
  if (hh > 12 && mm > 0) {
    hh = hh - 12;
    meridian = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss;

  document.getElementById("time").innerText = time;
  document.getElementById("session").innerHTML = meridian;

  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}

currentTime();

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Day = new Date();

let dayName = day[Day.getDay()];
let monthName = month[Day.getMonth()];
let dateNo = Day.getDate();
let descript = dayName + " , " + monthName + " " + dateNo;
document.querySelector(".day").innerText = descript;
