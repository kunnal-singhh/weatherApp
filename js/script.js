let form = document.querySelector('form');

let weatherIcon = document.querySelector('.weather-icon');
let locationField = document.querySelector('.location');
let temperatureField = document.querySelector('.temperature');
let humidityField = document.querySelector('.humidity');
let conditionField = document.querySelector('.condition');

let button = document.querySelector('button');

function showLoading(cityName) {

    locationField.innerHTML =
        `<i class="text-black-50">Loading ${cityName} location...</i>`;

    temperatureField.innerHTML =
        `<i class="text-black-50">Loading temperature...</i>`;

    humidityField.innerHTML =
        `<i class="text-black-50">Loading humidity...</i>`;

    conditionField.innerHTML =
        `<i class="text-black-50">Loading condition...</i>`;

    weatherIcon.src =
        "reshot-icon-weather-VAUPX2QFJK.svg";

    button.disabled = true;
    button.textContent = "Loading...";
}

function showError(cityName) {

    locationField.innerHTML =
        `"${cityName}" <span class="text-danger">not found.</span>`;

    temperatureField.innerHTML =
        `<span class="text-danger">--</span>`;

    humidityField.innerHTML =
        `<span class="text-danger">--</span>`;

    conditionField.innerHTML =
        `<span class="text-danger">--</span>`;

    weatherIcon.src =
        "reshot-icon-weather-VAUPX2QFJK.svg";
}

function resetButton() {

    button.disabled = false;
    button.textContent = "Search";
}

form.addEventListener('submit', async function (event) {

    event.preventDefault();

    let inputField = document.querySelector('input');

    let city_name = inputField.value.trim();

    if (!city_name) return;

    inputField.value = '';

    showLoading(city_name);

    try {

        const URL =
            `http://api.weatherapi.com/v1/current.json?key=605f37885d154036920210551252010&q=${city_name}`;

        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        weatherIcon.src =
            data.current.condition.icon;

        locationField.textContent =
            `${data.location.name}, ${data.location.region}, ${data.location.country}`;

        temperatureField.textContent =
            `${data.current.temp_c}°C`;

        humidityField.textContent =
            `${data.current.humidity}%`;

        conditionField.textContent =
            data.current.condition.text;

    }

    catch (error) {

        console.error(error);

        showError(city_name);
    }

    finally {

        resetButton();
    }
});





let dark = false;

let toggle = document.querySelector('.toggle');
let header = document.querySelector('header');
let links = document.querySelectorAll('a');
let infoCard = document.querySelector('.info-card');
let logoName = document.querySelector('.logo-name');

let loadingText =
    document.querySelectorAll('.loadingText');

let span = document.querySelectorAll(
    '.location, .temperature, .humidity, .condition'
);

toggle.addEventListener("click", function (event) {

    event.preventDefault();

    let body = document.querySelector('body');

    if (!dark) {

        body.style.backgroundColor = "black";
        body.style.color = "white";

        header.classList.remove('bg-light');
        header.classList.add('bg-dark');

        header.style.color = "white";

        logoName.style.color = "white";

        infoCard.style.backgroundColor = "black";
        infoCard.style.color = "white";

        infoCard.classList.remove('black-shadow');
        infoCard.classList.add('white-shadow');

        toggle.innerHTML =
            '<i class="fa-solid fa-sun fa-xl"></i>';

        toggle.classList.remove('text-dark');
        toggle.classList.add('text-light');

        links.forEach((link) => {

            link.classList.remove('text-dark');
            link.classList.add('text-light');
        });

        loadingText.forEach((txt) => {

            txt.classList.remove('text-black-50');
            txt.classList.add('text-white-50');
        });

        span.forEach((t) => {

            t.classList.remove('span-light');
            t.classList.add('span-dark');
        });

        dark = true;

    } else {

        body.style.backgroundColor = "white";
        body.style.color = "black";

        header.classList.remove('bg-dark');
        header.classList.add('bg-light');

        header.style.color = "black";

        logoName.style.color = "black";

        infoCard.style.backgroundColor = "white";
        infoCard.style.color = "black";

        infoCard.classList.remove('white-shadow');
        infoCard.classList.add('black-shadow');

        toggle.innerHTML =
            '<i class="fa-solid fa-moon fa-xl"></i>';

        toggle.classList.remove('text-light');
        toggle.classList.add('text-dark');

        links.forEach((link) => {

            link.classList.remove('text-light');
            link.classList.add('text-dark');
        });

        loadingText.forEach((txt) => {

            txt.classList.remove('text-white-50');
            txt.classList.add('text-black-50');
        });

        span.forEach((t) => {

            t.classList.remove('span-dark');
            t.classList.add('span-light');
        });

        dark = false;
    }
});