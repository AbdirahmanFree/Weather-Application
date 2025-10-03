const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const additionalUrl = "?unitGroup=metric&key=K3SUUA68HPDGPGSYTU2DVYDJZ&contentType=json"


 async function getCityWeatherData(city){
    url =  `${baseUrl}${city}${additionalUrl}`
    const response = await fetch(url)
    const data = await response.json()
    let weatherData = {}
    data.then(function(response){
        weatherData = response
        return weatherData
    })
}
console.log(getCityWeatherData("Toronto"))







