const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apiKey = "1555bd78353efdd74c4bc58c9c07cd67";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Enter a city");
  }
});

async function getWeatherData(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiURL);
  console.log(response);

  return await response.json();
}

function displayWeatherInfo(data) {
  console.log(data);
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityD = document.createElement("h1");
  const tD = document.createElement("p");
  const humidityD = document.createElement("p");
  const descD = document.createElement("p");
  const weatherD = document.createElement("p");

  cityD.textContent = city;
  tD.textContent = `🌡️ ${(temp - 273.15).toFixed(1)}`;
  humidityD.textContent = `Humidity: ${humidity}`;
  descD.textContent = description;
  weatherD.textContent = getWeatherEmoji(id);

  cityD.classList.add("cityD");
  tD.classList.add("tD");
  humidityD.classList.add("humidityD");
  descD.classList.add("descD");
  weatherD.classList.add("weatherD");

  card.appendChild(cityD);
  card.appendChild(tD);
  card.appendChild(humidityD);
  card.appendChild(descD);
  card.appendChild(weatherD);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈️";
    case weatherId >= 300 && weatherId < 400:
      return "🌧️";
    case weatherId >= 500 && weatherId < 600:
      return "☔";
    case weatherId >= 600 && weatherId < 700:
      return "🐻‍❄️";
    case weatherId >= 700 && weatherId < 800:
      return "🌫️";
    case weatherId === 800:
      return "🌞";
    case weatherId >= 801 && weatherId < 810:
      return "☁️";
    default:
      return "🤔";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("error-display");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
