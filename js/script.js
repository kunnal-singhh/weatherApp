let form=document.querySelector('form');
 const options={ 
    method:"GET",
    headers:{
        "X-Api-Key": "xZY8MPPfpimcgswdnB1OyQ==563umWZb1ahGepQE"
    }
}
form.addEventListener('submit',async function(event){
    event.preventDefault();
    let inputField=document.querySelector('input');
      let weatherIcon=document.querySelector('.weather-icon');
    let locationField=document.querySelector('.location');
    let temperatureField=document.querySelector('.temperature');
    let humidityField=document.querySelector('.humidity');
    let conditionField=document.querySelector('.condition');
    let airQualityField=document.querySelector(".air-quality")
    let city_name=inputField.value;
    inputField.value='';
     airQualityField.textContent='';
    const URL=`http://api.weatherapi.com/v1/current.json?key=605f37885d154036920210551252010&q=${city_name}&aqi=yes`;
  
    try{
    const response= await fetch(URL);
     if (!response.ok) throw new Error("Failed to fetch conversion rate");
     const data= await response.json();
   
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
     const AQI_URL=`https://api.api-ninjas.com/v1/airquality?city=${city_name}`;
const aqiResponse= await fetch(AQI_URL,options);
     if (!aqiResponse.ok) throw new Error("Failed to fetch forcast data");
     const aqiData= await aqiResponse.json();
     let aqidx=aqiData.overall_aqi;
function getAqiCondition(aqi) {
    if (aqi >= 0 && aqi <= 50)
        return "Good";
    else if (aqi >= 51 && aqi <= 100)
        return "Moderate";
    else if (aqi >= 101 && aqi <= 150)
        return "Unhealthy for Sensitive Groups";
    else if (aqi >= 151 && aqi <= 200)
        return "Unhealthy";
    else if (aqi >= 201 && aqi <= 300)
        return "Very Unhealthy";
    else if (aqi >= 301)
        return "Hazardous";
    else
        return "Invalid AQI";
}
    let aqiCondition=getAqiCondition(aqidx)
   
   airQualityField.textContent=`${aqidx} , ${aqiCondition}`;
}
  catch(error){
    locationField.innerHTML = `"${city_name}"<span class="text-danger"> not found.</span> Please try again.`;
    temperatureField.textContent='';
    humidityField.textContent='';
    conditionField.textContent='';
    weatherIcon.src='';
     airQualityField.textContent='';
    
    console.error('Error fetching weather data:', error)};
});





let dark = false;
const hamburgerIcon=document.querySelector(".hamburg i")
const sideMenu = document.querySelector(".side-menu");
let toggle = document.querySelector('.toggle');
let header = document.querySelector('header');
let links = document.querySelectorAll('a');
let container = document.querySelector('.container');
let infoCard = document.querySelector('.info-card');
let logoName = document.querySelector('.logo-name');
let loadingText = document.querySelectorAll('.loadingText');
let span = document.querySelectorAll('.location, .temperature, .humidity, .condition, .air-quality');

toggle.addEventListener("click", function () {
    let body = document.querySelector('body');
    if (!dark) {
        body.style.setProperty("background-color", "black");
        infoCard.style.setProperty("background-color", "black");
        infoCard.style.setProperty("color", "white", "important");
        body.style.setProperty("color", "white");
         header.style.setProperty("background-color","black");
        logoName.style.setProperty("color", "white");
        infoCard.classList.remove('black-shadow');
        infoCard.classList.add('white-shadow');
          header.classList.remove('black-shadow');
          header.classList.add('white-shadow');
        toggle.innerHTML = '<i class="fa-solid fa-sun fa-lg"></i>';
        toggle.classList.remove('text-dark');
        toggle.classList.add('text-light');
        links.forEach(link => {
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
        hamburgerIcon.style.setProperty("color", "white");
          sideMenu.style.setProperty("background-color"," black")
        dark = true;
    } else {
        body.style.setProperty("background-color", "white");
        body.style.setProperty("color", "black");
        header.style.setProperty("background-color","white");
        logoName.style.setProperty("color", "black");
        infoCard.classList.remove('white-shadow');
        infoCard.classList.add('black-shadow');
          header.classList.remove('white-shadow');
          header.classList.add('black-shadow');
        toggle.innerHTML = '<i class="fa-solid fa-moon fa-xl"></i>';
        infoCard.style.setProperty("background-color", "white");
        infoCard.style.setProperty("color", "black", "important");

        toggle.classList.remove('text-light');
        toggle.classList.add('text-dark');
        links.forEach(link => {
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
         hamburgerIcon.style.setProperty("color", "black");

     sideMenu.style.setProperty("background-color","white");

        dark = false;
    }
});

  


hamburgerIcon.addEventListener('click',function (){ 
    sideMenu.classList.toggle('open');
});

function toggleVisibility(){ 
    if(sideMenu.classList.contains('open') &&window.innerWidth>=768 )
    { 
         sideMenu.classList.toggle('open');
    }
    // if(sideMenu.classList.contains('open') &&window.innerWidth<768 )
    // { 
    //      window.addEventListener('click',()=>{              have to add the feature that when it clicked outside the div then div disappear
    //         sideMenu.classList.toggle('open');
    //      })
    // }
  
}
toggleVisibility();
window.addEventListener('resize',toggleVisibility);



