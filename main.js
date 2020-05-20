const axios = require("axios");

//get open weather api key
const OPEN_WEATHER_API_KEY = require("./config/openweatherKey").key

//open wather api url
const OPEN_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather"
 
/**
 * Get city current time and weather information using city name and postal code
 * @param {string} cityName
 * @param {string} postalAddress - defaults to null
 * @param {Date} currentDate - defaults to null
 * @returns {Promise}
 */
module.exports = function getCityTimeAndWeather(cityName,postalAddress=null,currentDate=null){
   //ensure at least a city name is provided 
   if(!cityName){
      //returns a rejected promise
      return Promise.reject('A city name is expected')
   }

   //use the current date time if no date/time is provided
   if(!currentDate)
      currentDate = new Date(); 

   //retrieve weather information from open weather map using city name
   return axios({
      method: 'get',
      url: OPEN_WEATHER_URL,
      params: {
         q: cityName,
         appid:OPEN_WEATHER_API_KEY,
         units:'metric'
      },
   })
   .then((response)=>{
      //return response data from server
      return response.data;
   })
   .then(response=>{
      //get weather information from api response
      const temperature = response.main.temp
      const weatherDescription = response.weather.length > 0 ? response.weather[0].description : "";
      const humidity = response.main.humidity
      const pressure = response.main.pressure
      const windSpeed = response.wind.speed

      //api time is the offset in seconds from UTC. convert to milliseconds
      const timezoneMsOffset = response.timezone * 1000

      //add timezone offset to current UTC time and generate new time for given city
      //current Date.getTime returns the UTC timestamp in ms
      let cityTime = new Date(currentDate.getTime() + timezoneMsOffset).toUTCString()

      //construct weather information
      const weather = "Weather Information: "+ temperature + "°C, " + weatherDescription 
                  + " Wind:"+windSpeed+" m/s" +" Humidity:"+humidity+"%"

      //return full string
      return cityName + ": " + cityTime + " " + weather
   })
}
