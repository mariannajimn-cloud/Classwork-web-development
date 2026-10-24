import axios from "axios";

const getWeatherFrom = async (lat, long, cityName) =>{
    const apiUrl= 
        "https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lat}&current_weather=true";
    const response = await axios(apiUrl);
    const currentWeather = response.data;
    console.log(currentWeather);
    return `In ${cityName}, the current temp is ${currentWeather.current_weather.temperature} C `;
};
// export default getWeatherFrom;
module.exports = {getWeatherFrom};