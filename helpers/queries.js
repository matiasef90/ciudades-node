require('dotenv').config();
const axios = require('axios');

const keySpott = process.env.KEY_SPOTT_API;
const keyOpenWeather = process.env.KEY_OPEN_WEATHER_API;

const getCiudad = async (nombre) => {
    const parametros = {
        url: 'https://spott.p.rapidapi.com/places/autocomplete',
        method: 'GET',
        params: {
            limit:10,
            q: nombre,
            type: 'CITY',
        },
        headers: {
          'x-rapidapi-host': 'spott.p.rapidapi.com',
          'x-rapidapi-key': keySpott,
        },
    };
    try {
        const { data } = await axios(parametros);
        return data.map((el) =>({
            nombre: `${el.name}, ${el.adminDivision1.name}, ${el.country.name}`,
            lan: el.coordinates.latitude,
            lon: el.coordinates.longitude,
        }));
    } catch (Error) {
        console.log(Error);
    }
};

const getWeather = async (lat, lon) => {
    const parametros = {
        url: 'api.openweathermap.org/data/2.5/weather',
        method: 'GET',
        params: {
            lat,
            lon,
            appid: keyOpenWeather,
            lang: 'es',
            units: 'metric',
        },
    };
    try {
        const { data } = await axios(parametros);
        return data.map((el) =>({
            description: el.weather[0].description
                .split(' ')
                .map((el) => el.toCapitalize())
                .join(' '),
            temp_max: el.main.temp_max,
            temp_min: el.main.temp_min,
        }));
    } catch (Error) {
        console.log(Error);
    }
};

module.exports = {
    getCiudad,
    getWeather,
}