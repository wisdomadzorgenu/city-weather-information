const getCityTimeAndWeather = require("./main")

//array of city information and postal codes
let locationInfo = [
   {location:'Paris',postalCode:''},
   {location:'New York',postalCode:''},
   {location:'Moscow',postalCode:''},
   {location:'Los Angeles',postalCode:''},
   {location:'Tokyo',postalCode:''},
   {location:'London',postalCode:''},
   {location:'Nairobi',postalCode:''},
   {location:'São Paulo',postalCode:''},
   {location:'Pluto',postalCode:''},
   {location:'Accra',postalCode:''},
   {location:'Kuala Lumpur',postalCode:''}
]

//bulkPromise for tracking all promise executions
let bulkProm = []

//default current time
const currentDate = new Date()

//loop through array of locations and retrieve corresponding city information
for(let i=0; i<locationInfo.length; i++){
   //retrieve location information
   const cityName = locationInfo[i].location,
   postalCode = locationInfo[i].postalCode

   //get city time and weather information for provided city
   let prom = getCityTimeAndWeather(cityName,postalCode,currentDate)
      .then(info=>{
         console.log(info)
      })
      .catch(err=>{
         if(err && err.response && err.response.data && err.response.data.message)
            console.log(cityName+": " + err.response.data.message)
         else
            console.log(err)
      })

   //push into bulk promise
   bulkProm.push(prom)
}

//execute all promises concurrently
Promise.all(bulkProm)
   .then((res)=>{
      //do nothing for now
   })