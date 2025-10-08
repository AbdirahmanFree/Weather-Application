import "./style.css"
const baseWeatherUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const additionalWeatherUrl = "?unitGroup=metric&key=K3SUUA68HPDGPGSYTU2DVYDJZ&contentType=json"
const giphyUrl ="https://api.giphy.com/v1/gifs/k3CeSrt9IZ6aorWCy1?api_key=FtiT4Blu5M6pJUiaLvNLnQegTn9UP1yE"


const container = document.getElementById("container")

//Todays temperature need
const location = document.getElementById("city")
const todaysTemp = document.getElementById("temperature");
const todayHigh = document.getElementById("high")
const todayLow = document.getElementById("low")
const todaysConditions = document.getElementById("conditions")
const todayDescription = document.getElementById("description")

// input and searh
const searchBar = document.getElementById("search-bar")
const searchBtn = document.getElementById("search-btn")








async function getCityWeatherDataPromise(city){
    const url =  `${baseWeatherUrl}${city}${additionalWeatherUrl}`;
    try{
        const response = await fetch(url)
        const data = await response.json();
        console.log(data)
        parseAndShowData(data)
        return data;
    }
    catch(error){
        console.error(error)
        alert( `city "${city}" not found`)
        return
    }
    
}

function parseAndShowData(data) {
   const address = data.address
   console.log("adress", address)
   location.textContent = address
   const todayWeather = data.days[0]
   const todayWeatherTemp = todayWeather.temp
   todaysTemp.textContent = `${todayWeatherTemp}°`
   console.log(data)
   console.log(todayWeather)

   const todayWeatherHigh = todayWeather.tempmax
   todayHigh.textContent = `H: ${todayWeatherHigh}°C`

   const todayWeatherLow = todayWeather.tempmin
   todayLow.textContent =  `L: ${todayWeatherLow}°C`

   const todayWeatherConditions = todayWeather.conditions
   todaysConditions.textContent = todayWeatherConditions

   const description = todayWeather.description
   todayDescription.textContent = description
   const hourlyData = todayWeather.hours
   console.log(data.days)
   hourlyCard(hourlyData)
   tenDayForcast(data.days)

   

}

function hourlyCard(hours){
    const hoursdisplay = document.getElementById("hours");
    hoursdisplay.innerHTML = ""
    for (let i =0; i< 24;i++){
        const hour = hours[i]
        const image = document.createElement("img")
        const icon = hour.icon
        const temp = hour.temp
        const time = document.createElement("p")
        const temperature = document.createElement("p")

        if (i == 0 ){
            time.textContent = `12:00 AM`
        }
        else if(i <12){
            time.textContent = `${i}:00 AM`
        }
        else if(i == 12){
            time.textContent = `12:00 PM`
        }
        else{
            time.textContent = `${i-12}:00 PM`
        }

        
        temperature.textContent =  `${hour.temp.toFixed(1)}°C`
        

        
        const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${icon}.png`;
        image.src = iconUrl;
        time.style.gridArea = `1/${i+1}/2/${i+2}`;
        image.style.gridArea = `2/${i+1}/3/${i+2}`;
        image.style.width = '40px'
        image.style.height = '40px'
        temperature.style.gridArea = `3/${i+1}/4/${i+2}`;
        hoursdisplay.appendChild(time);
        hoursdisplay.appendChild(image);
        hoursdisplay.appendChild(temperature);
    }


}

function tenDayForcast(days){
    const tenDays = document.getElementById("daily-section")
    tenDays.innerHTML = "";
    const header = document.createElement("h3")
    header.textContent = "10 Day Forcast";
    header.classList.add("daily-header")
    tenDays.appendChild(header)
    for (let i = 0; i< 10; i++){
        const day = days[i]
        const date = document.createElement("p");
        const image = document.createElement("img");
        const minTemp = document.createElement("p");
        const maxTemp = document.createElement("p");

        const icon = day.icon
        const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${icon}.png`;
        image.src = iconUrl
        
    }
    

}



async function setBackgroundPromise(){
    
    console.log(giphyUrl)
    const response = await fetch(giphyUrl);
    const imageJson = await response.json()
    console.log(imageJson)
    const src = imageJson.data.images.original.url
    container.style.backgroundImage =  `url("${src}")`
}
getCityWeatherDataPromise("Toronto")
setBackgroundPromise()


searchBtn.addEventListener("click",() => {
    const city = searchBar.value
    getCityWeatherDataPromise(city)
})






