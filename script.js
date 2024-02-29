// Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
const apiKey = "29f1f4f209124a0d96052136232710";
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast`;

async function fetchWeather(city) {
  const response = await fetch(
    `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`
  );
  const data = await response.json();
  return data;
}

async function updateWeather(city) {
  try {
    const weatherData = await fetchWeather(city);
    const currentWeather = weatherData.list[0];
    const forecast = weatherData.list.slice(1, 6); // Extracting the next 5 days forecast

    // Update current weather
    document.querySelector(
      ".weather-icon"
    ).style.backgroundImage = `url('https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png')`;
    document.querySelector(".weather-description").textContent =
      currentWeather.weather[0].description;
    document.querySelector(".temperature").textContent = `${Math.round(
      currentWeather.main.temp
    )}°C`;

    // Update forecast
    const forecastContainer = document.querySelector(".forecast-info");
    forecastContainer.innerHTML = "";
    forecast.forEach((day) => {
      const forecastItem = document.createElement("div");
      forecastItem.classList.add("forecast-item");
      forecastItem.innerHTML = `
                <div>${new Date(day.dt * 1000).toLocaleDateString("en-US", {
                  weekday: "short",
                })}</div>
                <div>${Math.round(day.main.temp)}°C</div>
                <div>${day.weather[0].description}</div>
                <div><img src="https://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }.png" alt="${day.weather[0].description}"></div>
            `;
      forecastContainer.appendChild(forecastItem);
    });
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

// Initial load
updateWeather("London"); // Provide default city or let user enter one
