// JavaScript
var API_KEY = "9d709792281c3c298c41cc4acc281b86"
// API key and endpoint
const API_KEY = '9d709792281c3c298c41cc4acc281b86';  
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// DOM Elements
const searchInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');
const historyList = document.getElementById('history');

// Event listeners
searchButton.addEventListener('click', getWeather);
historyList.addEventListener('click', getHistoryWeather);

// Functions  
async function getWeather(event) {

  // Get city from input
  const city = searchInput.value;
  
  // API call
  const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`);
  const weatherData = await response.json();

  // Display current weather and 5 day forecast
  displayCurrentWeather(weatherData);
  displayForecast(weatherData);

  // Add to search history
  addToHistory(city);
}

// Display current weather
function displayCurrentWeather(data) {
  // Display city, date, icon, temp, humidity, wind
  const current = data.list[0];

  const html = `
    <h2>${current.name} (${new Date().toLocaleDateString()})</h2>
    <img src="https://openweathermap.org/img/w/${current.weather[0].icon}.png"">
    <p>Temp: ${current.main.temp}°F</p>
    <p>Humidity: ${current.main.humidity}%</p>
    <p>Wind Speed: ${current.wind.speed} mph</p>
  `;

  currentWeather.innerHTML = html;
}

// Display 5 day forecast
function displayForecast(data) {

  const forecastData = data.list.filter(reading => reading.dt_txt.includes('15:00:00'));

  let html = '';

  forecastData.forEach(day => {
    html += createForecastCard(day);
  });

  forecast.innerHTML = html;

}

// Create forecast card
function createForecastCard(reading) {
  const date = new Date(reading.dt_txt);
  const temp = reading.main.temp;
  const iconUrl = `https://openweathermap.org/img/w/${reading.weather[0].icon}.png`;

  return `
    <div class="weather-day">
      <h3>${date.toLocaleDateString('en-us', {weekday: 'long'})}</h3>
      <img src="${iconUrl}">
      <p>Temp: ${temp}°F</p>
    </div>
  `;
}  

// Add city to search history
function addToHistory(city) {
  const html = `<li>${city}</li>`;
  historyList.innerHTML += html;
}

// Get weather for city in history
function getHistoryWeather(event) {
  const city = event.target.textContent; 
  getWeather(city); 
}