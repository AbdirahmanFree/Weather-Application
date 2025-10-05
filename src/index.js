const baseWeatherUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
const additionalWeatherUrl = "?unitGroup=metric&key=K3SUUA68HPDGPGSYTU2DVYDJZ&contentType=json"
const baseGiphyUrl = "https://api.giphy.com/v1/gifs/translate?api_key=FtiT4Blu5M6pJUiaLvNLnQegTn9UP1yE&s="

const image = document.getElementById("background");


 async function getCityWeatherDataPromise(city){
    const url =  `${baseWeatherUrl}${city}${additionalWeatherUrl}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    return data;
}



async function setBackgroundPromise(city){
    const query = `${city} `
    const url = `${baseGiphyUrl}${encodeURIComponent(query)}`;
    console.log(url)
    
    const response = await fetch(url);
    const imageJson = await response.json()
    console.log(imageJson)
    const src = imageJson.data.images.original.url
    image.src = src
    
    
    
   
    
    
}
getCityWeatherDataPromise("Toronto")
setBackgroundPromise("London")






