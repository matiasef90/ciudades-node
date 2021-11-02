const inquirer = require('inquirer');
const { getCiudad, getWeather } = require('./queries');

const pausa = async() => {
    const pausa = await inquirer.prompt({
        type: 'input',
        name: 'pausa',
        message: 'Presiona ENTER para continuar',
    });
    return pausa;
}

const inputCiudad = async() => {
    const inputCiudad = {
        type: 'input',
        name: 'ciudad',
        message: 'Que ciudad deseas buscar?',
        validate: function (input) {
            if(input === '') return 'Debes ingresar una ciudad';
            return true;
        }
    }
    const { ciudad } = await inquirer.prompt(inputCiudad);
    const ciudades = await getCiudad(ciudad);
    return ciudades;
}

const menu = async() => {
    const option = {
        type: 'list',
        name: 'menu',
        message: 'OPCIONES',
        choices: [
            {name: '1. '.green + 'Buscar Ciudad'.white, value: 1},
            {name: '2. '.green + 'Historial'.white, value: 2},
            {name: '0. '.green + 'Salir'.white, value: 0},
        ]
    }
    const { menu } = await inquirer.prompt(option);
    return menu;
}

const optionCiudades = async(ciudades) => {
    const choices = ciudades.map(el => ({ name: el.nombre, value: el.id }));
    const option = {
        type: 'list',
        name: 'id',
        message: 'Selecciona una ciudad'.blue,
        choices
    }
    const { id } = await inquirer.prompt(option);
    if (id !== 0) {
        const ciudad = ciudades.find((el) => id === el.id);
        const clima = await getWeather(ciudad.lat, ciudad.lon);
        return { ...ciudad, ...clima, status: true };
    }
    return { status: false };
};

const ciudadHistorial = async (historial) => {
    const choices = historial.map((el, idx) => ({name: `${idx+1}. `.green + `${el}`.white, value: el }));
    choices.unshift({ name: '0. '.green + 'Salir'.white, value: 0 });
    const option = {
        type: 'list',
        name: 'lugar',
        message: 'Selecciona una opcion'.blue,
        choices,
    }
    const { lugar } = await inquirer.prompt(option);
    if(lugar !== 0) {
        const ciudad = await getCiudad(lugar);
        const clima = await getWeather(ciudad[0].lat, ciudad[0].lon);
        return {...ciudad[0], ...clima, status: true};
    }
    return {status: false};
};

module.exports= {
    pausa,
    inputCiudad,
    menu,
    optionCiudades,
    ciudadHistorial
}