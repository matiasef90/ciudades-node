const { inputCiudad, pausa, menu, optionCiudades, ciudadHistorial } = require('./helpers/inquirer');
const fs = require('fs');
require('colors');

const ciudadApp = (async() => {
    let historial = [];
    const dataBase = fs.existsSync('./db/historial.txt');
    if(dataBase) {
        data = fs.readFileSync('./db/historial.txt');
        historial = JSON.parse(data);
    }
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
                    status,
                } = await optionCiudades(ciudades);
                if(status) {
                    console.log(`${'Ciudad:'.green} ${nombre}`.white);
                    console.log(`${'Clima:'.green} ${description}`.white);
                    console.log(`${'Maxima:'.green} ${temp_max}`.white);
                    console.log(`${'Mínima:'.green} ${temp_min}`.white);
                    console.log(`${'Latitud:'.green} ${lat}`.white);
                    console.log(`${'Longitud:'.green} ${lon}`.white);
                    if(historial.length === 6) historial.pop()
                    historial.unshift(nombre);
                    await pausa();
                }
                break;
            case 2:
                const ciudadHist = await ciudadHistorial(historial);
                if(ciudadHist.status) {
                    console.log(`${'Ciudad:'.green} ${ciudadHist.nombre}`.white);
                    console.log(`${'Clima:'.green} ${ciudadHist.description}`.white);
                    console.log(`${'Maxima:'.green} ${ciudadHist.temp_max}`.white);
                    console.log(`${'Mínima:'.green} ${ciudadHist.temp_min}`.white);
                    console.log(`${'Latitud:'.green} ${ciudadHist.lat}`.white);
                    console.log(`${'Longitud:'.green} ${ciudadHist.lon}`.white);
                    await pausa();
                }
                break;
            default:
                break;
            }
    } while (menuOption !== 0);
    const dir = './db';
    if(!fs.existsSync(dir)) fs.mkdirSync(dir);
    fs.writeFileSync('./db/historial.txt', JSON.stringify(historial));
    console.clear();
})();