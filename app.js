const { getCiudad } = require('./helpers/queries');

const ciudad = (async() => {
    let ciudad = await getCiudad('San Martin');
    console.log(ciudad);
})();
