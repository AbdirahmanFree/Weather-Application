import "./style.css"
const baseWeatherUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const additionalWeatherUrl = "?unitGroup=metric&key=K3SUUA68HPDGPGSYTU2DVYDJZ&contentType=json"
const giphyUrl ="https://api.giphy.com/v1/gifs/k3CeSrt9IZ6aorWCy1?api_key=FtiT4Blu5M6pJUiaLvNLnQegTn9UP1yE"

const image = document.getElementById("background");
const container = document.getElementById("container")



 async function getCityWeatherDataPromise(city){
    const url =  `${baseWeatherUrl}${city}${additionalWeatherUrl}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return data;
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
setBackgroundPromise("London")






