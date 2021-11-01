const { inputCiudad, pausa, menu, optionCiudades } = require('./helpers/inquirer');
const { getCiudad, getWeather } = require('./helpers/queries');
require('colors');

const ciudadApp = (async() => {
    let menuOption;
    do {
        console.clear();
        console.log("=============================".green);
        console.log("       CIUDAD     APP        ".white);
        console.log("=============================".green);
        menuOption = await menu();
        switch (menuOption) {
            case 1:
                const ciudades = await inputCiudad();
                const {
                    nombre,
                    description,
                    temp_max,
                    temp_min,
                    lat,
                    lon,
                } = await optionCiudades(ciudades);
                console.log(`Ciudad: ${nombre}`);
                console.log(`Clima: ${description}`);
                console.log(`Maxima: ${temp_max}`);
                console.log(`Mínima: ${temp_min}`);
                console.log(`Latitud: ${lat}`);
                console.log(`Longitud: ${lon}`);
                await pausa();
                break;
            case 2:
                const response = await getWeather(-33,-68);
                console.log(response);
            }
    } while (menuOption !== 0);
    console.clear();
})();