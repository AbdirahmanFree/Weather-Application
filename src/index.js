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
    catch{
        console.error("Bad city input")
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
   todayHigh.textContent = `H: ${todayWeatherHigh}°`

   const todayWeatherLow = todayWeather.tempmin
   todayLow.textContent =  `L: ${todayWeatherLow}°`

   const todayWeatherConditions = todayWeather.conditions
   todaysConditions.textContent = todayWeatherConditions

   const description = todayWeather.description
   todayDescription.textContent = description
   const hourlyData = todayWeather.hours
   hourlyCard(hours)
   

}

function hourlyCard(hours){

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






