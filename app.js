const { inputCiudad, pausa, menu, optionCiudades } = require('./helpers/inquirer');
require('colors');

const ciudad = (async() => {
    console.clear();
    console.log("=============================".green);
    console.log("       CIUDAD     APP        ".white);
    console.log("=============================".green);
    let menuOption;
    do {
        const menuOption = await menu();
        switch (menuOption) {
            case 1:
                const ciudades = await inputCiudad();
                const ciudad = await optionCiudades(ciudades);
                console.log(ciudad);
                await pausa();
                break;
            case 0:
                await pausa();
                break;
            }
    } while (menuOption !== 0);
})();