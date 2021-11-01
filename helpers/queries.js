require('dotenv').config();
const axios = require('axios');

const keySpott = process.env.KEY_SPOTT_API;
const keyOpenWeather = process.env.KEY_OPEN_WEATHER_API;

const getCiudad = async (nombre) => {
    const parametros = {
        url: 'https://spott.p.rapidapi.com/places/autocomplete',
        method: 'GET',
        params: {
            limit: 5,
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
        if (data.length !== 0) {
            return data.map((el, index) =>({
                id: index + 1,
                nombre: `${el.name}, ${el.adminDivision1.name}, ${el.country.name}`,
                lat: el.coordinates.latitude,
                lon: el.coordinates.longitude,
            }));
        }
        return [{nombre: 'No se encontraron resultados', id: 0 }];
    } catch (Error) {
        console.log(Error);
    }
};

const getWeather = async (lat, lon) => {
    const parametros = {
        url: 'http://api.openweathermap.org/data/2.5/weather',
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
        return {
            description: data.weather[0].description,
            temp_max: data.main.temp_max,
            temp_min: data.main.temp_min,
        };
    } catch (Error) {
        console.log(Error);
    }
};

module.exports = {
    getCiudad,
    getWeather,
}