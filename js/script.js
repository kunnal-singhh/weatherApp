let form=document.querySelector('form');
form.addEventListener('submit',async function(event){
    event.preventDefault();
    let inputField=document.querySelector('input');
    let city_name=inputField.value;
    inputField.value='';
    console.log(city_name);
    const URL=`http://api.weatherapi.com/v1/current.json?key=605f37885d154036920210551252010&q=${city_name}&aqi=yes`;
    let weatherIcon=document.querySelector('.weather-icon');
    let locationField=document.querySelector('.location');
    let temperatureField=document.querySelector('.temperature');
    let humidityField=document.querySelector('.humidity');
    let conditionField=document.querySelector('.condition');
    try{
    const response= await fetch(URL);
     if (!response.ok) throw new Error("Failed to fetch conversion rate");
    const data= await response.json();
    console.log(data)
    let iconUrl=data.current.condition.icon;
    weatherIcon.src=iconUrl;
    let state=data.location.region;
    let country=data.location.country;
    city_name=data.location.name;
    locationField.textContent=`${city_name}, ${state}, ${country}`;
    let temperature = data.current.temp_c;
    temperatureField.textContent=`${temperature}°C`;
    let humidity = data.current.humidity;
    humidityField.textContent=`${humidity}%`;
    let condition = data.current.condition.text;
    conditionField.textContent=`${condition}`;
    console.log(temperature);
    console.log(humidity);
    console.log(condition)
}
  catch(error){
    locationField.innerHTML = `"${city_name}"<span class="text-danger"> not found.</span> Please try again.`;
    temperatureField.textContent='';
    humidityField.textContent='';
    conditionField.textContent='';
    weatherIcon.src='';
    
    console.error('Error fetching weather data:', error)};
});

let dark=false;
let toggle = document.querySelector('.toggle');
let header = document.querySelector('header');
let links=document.querySelectorAll('a');
let container=document.querySelector('.container');
let infoCard=document.querySelector('.info-card');
let logoName=document.querySelector('.logo-name');
toggle.addEventListener("click", function() {
    let body = document.querySelector('body');
    if(!dark){
    body.style.setProperty("background-color", "black");
     body.style.setProperty("color", "white");
     header.classList.remove('bg-light');
     header.classList.add('bg-dark');
     logoName.style.setProperty("color", "white");
     header.style.setProperty("color", "white");
     infoCard.style.setProperty("background-color", "white");
     infoCard.style.setProperty("color", "black");
     toggle.innerHTML='<i class="fa-solid fa-sun fa-xl"></i>';
     toggle.classList.remove('text-dark');
     toggle.classList.add('text-light');
     links.forEach(link => {
            link.classList.remove('text-dark');
            link.classList.add('text-light');
        });
    dark=true;
    } else {
    body.style.setProperty("background-color", "white");
        body.style.setProperty("color", "black");
     header.classList.remove('bg-dark');
     header.classList.add('bg-light');
     header.style.setProperty("color", "black");
     logoName.style.setProperty("color", "black");
     toggle.innerHTML='<i class="fa-solid fa-moon fa-xl"></i>';
        toggle.classList.remove('text-light');
        toggle.classList.add('text-dark');
         links.forEach(link => {
            link.classList.remove('text-light');
            link.classList.add('text-dark');
        });
    dark=false;
    }
});
  


