const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const currentWeatherTitle = document.querySelector("#currentWeatherTitle");
const currentWeatherDescription = document.querySelector(
    "#currentWeatherDescription",
);
const currentWeatherDegree = document.querySelector("#currentWeatherDegree");
const forecastWeather = document.querySelector("#forecastWeather");
const humidity = document.querySelector("#humidityPercent");
const wind = document.querySelector("#wind");
const errorDiv = document.querySelector("#error");
const errorMsg = document.querySelector("#error-msg");
const loadingDiv = document.querySelector("#loading");
const recentDiv = document.querySelector("#recent");
const celsiusBtn = document.querySelector("#celsius");
const farenheitBtn = document.querySelector("#farenheit");
const currentWeatherIcon = document.querySelector("#currentWeatherIcon");
const content = document.querySelector("#content");
const apiKey = "92e1baa063ef5ecfe5594d36c4cdc8ab";

let currTempMetric = 0;
let isC = true;

async function fetchCurrentWeather(city) {
        const results = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
        );
        const data = await results.json();
        if (data.cod !== 200) {
            throw new Error(data.message);
        }
        console.log(data)
        return data;
}

async function fetchForecastWeather(city) {
        const results = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`,
        );
        const data = await results.json();
        if (data.cod !== "200") {
            throw new Error(data.message);
        }
        return data;
}

function displayCurrentWeather(currentWeather) {
    currentWeatherTitle.textContent = currentWeather.name;
    currentWeatherDescription.textContent = currentWeather.weather[0].description;
    currentWeatherDegree.textContent = `${Math.round(currentWeather.main.temp)}°`;
    humidity.textContent = `${Math.round(currentWeather.main.humidity)}%`;
    wind.textContent = `${Math.round(currentWeather.wind.speed)} km/h`;
    currentWeatherIcon.src = `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`;
    currTempMetric = Math.round(currentWeather.main.temp);
    content.classList.remove("hidden");
}

function displayForecast(forecast) {
    forecastWeather.innerHTML = "";
    const dailyForecasts = forecast.list.filter(item =>
        item.dt_txt.includes("12:00:00"),
    );
    dailyForecasts.forEach(day => {
        const card = document.createElement("div");
        card.classList.add(
            "rounded-xl",
            "p-4",
            "bg-blue-200/30",
            "flex",
            "flex-col",
            "items-center",
            "space-y-2",
        );
        card.innerHTML = `
            <p class="text-gray-300 text-sm">${new Date(day.dt_txt).toLocaleDateString("en", { weekday: "short" })}</p>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png"/>
            <div class="flex flex-row space-x-3 items-center">
                <p class="text-white font-semibold">${Math.round(day.main.temp_max)}°</p>
                <p class="text-gray-300 text-sm">${Math.round(day.main.temp_min)}°</p>
            </div>
        `;
        forecastWeather.appendChild(card);
    });
}

function showError(msg) {
    errorDiv.classList.remove("hidden");
    errorMsg.textContent = msg;
}

function hideError() {
    errorDiv.classList.add("hidden");
    errorMsg.textContent = "";
}

function showLoading() {
    loadingDiv.classList.remove("hidden");
}

function hideLoading() {
    loadingDiv.classList.add("hidden");
}

function convertCtoF() {
    farenheitBtn.classList.add("bg-blue-500");
    celsiusBtn.classList.remove("bg-blue-500");
    currentWeatherDegree.textContent = `${Math.round(currTempMetric * 1.8 + 32)}°`;
    isC = false;
}

function convertFtoC() {
    celsiusBtn.classList.add("bg-blue-500");
    farenheitBtn.classList.remove("bg-blue-500");
    currentWeatherDegree.textContent = `${Math.round(currTempMetric)}°`;
    isC = true;
}

function saveToLocalStorage(city) {
    let recentCities = getRecentCitiesFromLocalStorage();
    const cityNameLower = city.trim().toLowerCase();
    if (!recentCities.includes(cityNameLower)) {
        recentCities.push(cityNameLower);
        localStorage.setItem("cities", JSON.stringify(recentCities));
    }
}

function getRecentCitiesFromLocalStorage() {
    let recentCitiesFromStorage;
    if (localStorage.getItem("cities") === null) {
        recentCitiesFromStorage = [];
    } else {
        recentCitiesFromStorage = JSON.parse(localStorage.getItem("cities"));
    }

    return recentCitiesFromStorage;
}

async function searchWeather() {
    try {
        const citySearched = searchInput.value;
        showLoading();
        const weatherResults = await fetchCurrentWeather(citySearched);
        const forecastResults = await fetchForecastWeather(citySearched);
        hideLoading();
        displayCurrentWeather(weatherResults);
        displayForecast(forecastResults);
        convertFtoC();
        saveToLocalStorage(citySearched);
        displayRecentCities();
        hideError()
    } catch (error) {
        hideLoading();
        showError(error.message);
    }
}

function loadLastCity() {
    const lastCity = getRecentCitiesFromLocalStorage().slice(-1)[0];
    if (lastCity) {
        searchInput.value = lastCity;
        searchWeather();
    } else {
        searchInput.value = "";
    }
}

function displayRecentCities() {
    const recentCities = getRecentCitiesFromLocalStorage().slice().reverse();
    recentDiv.innerHTML = "";
    recentCities.forEach(city => {
        const recentCityBtn = document.createElement('button')
        recentCityBtn.textContent = city.charAt(0).toUpperCase() + city.slice(1);
        recentCityBtn.classList.add(
            "px-3", "py-1", "rounded-full", "bg-white/20",
            "text-white", "text-sm", "hover:bg-white/40", "cursor-pointer"
        );
        recentCityBtn.addEventListener("click", () => {
            searchInput.value = city;
            searchWeather();
        });
        recentDiv.appendChild(recentCityBtn);
    })
}

function init() {
    loadLastCity();
    displayRecentCities()
    searchBtn.addEventListener("click", searchWeather);
    searchInput.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            searchWeather();
        }
    });
    celsiusBtn.addEventListener("click", convertFtoC);
    farenheitBtn.addEventListener("click", convertCtoF);
}

document.addEventListener("DOMContentLoaded", init);
