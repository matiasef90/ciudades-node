require('dotenv').config();
const axios = require('axios');

const keySpott = process.env.KEY_SPOTT_API;

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

const wather = 'https://openweathermap.org/current';

module.exports = {
    getCiudad,
}