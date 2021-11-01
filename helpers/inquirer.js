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
        choices: [
            {name: '1. Buscar Ciudad', value: 1},
            {name: '2. Historial', value: 2},
            {name: '0. Salir', value: 0},
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
        choices
    }
    const { id } = await inquirer.prompt(option);
    if (id !== 0) {
        const ciudad = ciudades.find((el) => id === el.id);
        const clima = await getWeather(ciudad.lat, ciudad.lon);
        return `
        Ciudad: ${ciudad.nombre}
        Clima: ${clima.description}
        Temp. Max.: ${clima.temp_max}
        Temp. Min.: ${clima.temp_min}
        Latitud: ${ciudad.lat}
        Longitud: ${ciudad.lon}
        `
    }
    return null;
};

module.exports= {
    pausa,
    inputCiudad,
    menu,
    optionCiudades
}