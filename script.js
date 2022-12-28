// import dotenv from 'dotenv';
// dotenv.config();
// console.log(process.env);

let temp1save,
	temp2save = 0,
	showTime;
let weather = {
	apiKey: 'e1b292964b3c86ad361260f80c9496e0',
	fetchWrapper: async function (url) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			this.displayAlert(error.message, () => location.reload());
		}
	},
	fetchWeather: async function (city, lat = null, lon = null) {
		if (lat && lon) {
			const data = await this.fetchWrapper(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`,
			);
			this.displayWeather(data);
		} else if (city) {
			//if user searched for a country
			// fetching data from restcountries API
			const response = await fetch(`https://restcountries.com/v3.1/name/${city}`);
			const data = await response.json();
			if (data.status !== 404) {
				this.fetchWeather(city, data[0].latlng[0], data[0].latlng[1]);
				return;
			}
			const dataWeather = await this.fetchWrapper(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`,
			);
			this.displayWeather(dataWeather);
		}
	},
	displayWeather: function (data) {
		const {
			name,
			timezone,
			main: { temp, humidity },
			wind: { speed },
			weather: [{ icon, description }],
			sys: { country },
		} = data;
		console.log(data);

		document.querySelector('.weather').style.display = 'flex';
		document.querySelector('#confirm').style.display = 'none';
		const temp2 = temp * 1.8 + 32;
		document.querySelector('.city').innerText = `Weather in ${name}`;
		document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}.png`;
		document.querySelector('.description').innerText = description;

		!document.querySelector('#checkbox').checked
			? (document.querySelector('.temp').innerText = `${temp.toFixed(2)}℃`)
			: (document.querySelector('.temp').innerText = `${temp2.toFixed(2)}℉`);
		temp1save = temp.toFixed(2);
		temp2save = temp2.toFixed(2);
		speed1 = speed.toFixed(2);
		speed2 = (speed * 0.62137).toFixed(2);

		const timeOptions = {
			hours: '2-digit',
			minutes: '2-digit',
		};
		showTime = setInterval(() => {
			let time = new Date(new Date().getTime() + timezone * 1000 + new Date().getTimezoneOffset() * 60000);
			document.querySelector('#time').innerText =
				time.toLocaleTimeString(undefined, timeOptions) + ' ' + time.toLocaleDateString();
		}, 1000);

		document.querySelector('.humidity').innerText = `Humidity: ${humidity}%`;
		document.querySelector('.wind').innerText = `Wind speed: ${speed} km/h`;
		document.querySelector('.weather').classList.remove('loading');

		fetch(`https://source.unsplash.com/1600x900/?${name}`).then((response) => {
			const url = response.url;
			if (!url.includes('source-404')) {
				document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
			}
			// Shows Default image if image on available on unsplash
			else {
				document.body.style.backgroundImage = `url('https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg')`;
			}
		});
		// console.log(process.env.APIKEY);
		document.querySelector('.flag').src = `./assets/flags/${country.toLowerCase()}.svg`;
	},
	displayAlert: function (msg, myYes = () => {}) {
		const confirmBox = document.querySelector('#confirm');
		const weatherBox = document.querySelector('.weather');
		weatherBox.style.display = 'none';
		confirmBox.style.display = 'block';
		if (msg) confirmBox.querySelector('.message').innerText = msg;
		confirmBox.querySelector('.yes').addEventListener('click', () => {
			myYes();
			weatherBox.removeAttribute('style');
			confirmBox.removeAttribute('style');
		});
	},
	search: function () {
		clearInterval(showTime);
		this.fetchWeather(document.querySelector('.search-bar').value);
		document.getElementById('search').focus();
		document.getElementById('search').value = '';
	},
};

document.querySelector('.search button').addEventListener('click', function () {
	weather.search();
});

document.querySelector('.search-bar').addEventListener('keyup', function (event) {
	if (event.key == 'Enter') {
		weather.search();
	}
});

// ask for location permission
// if granted: show user's location weather data
// if blocked: show default location weather data
navigator.geolocation.getCurrentPosition(
	(position) => {
		const { latitude, longitude } = position.coords;
		weather.fetchWeather(null, latitude, longitude);
	},
	() => weather.fetchWeather('Nashik'),
);

function onTempChange() {
	!document.querySelector('#checkbox').checked
		? ((document.querySelector('.temp').innerText = `${temp1save}℃`),
		  (document.querySelector('.wind').innerText = `Wind speed: ${speed1} km/h`))
		: ((document.querySelector('.temp').innerText = `${temp2save}℉`),
		  (document.querySelector('.wind').innerText = `Wind speed: ${speed2} mph`));
}

let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('.toggle-btn');
//check if Dark mode is enabled
// if its enabled turn it off
// else turn it on
const enableDarkMode = () => {
	document.body.classList.add('darkmode');
	localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
	document.body.classList.remove('darkmode');
	localStorage.setItem('darkMode', null);
};

darkModeToggle.addEventListener('click', () => {
	darkMode = localStorage.getItem('darkMode');
	darkMode != 'enabled' ? enableDarkMode() : disableDarkMode();
});
