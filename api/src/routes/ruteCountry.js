const { Router } = require('express');
const router = Router();
const {
    getCountries, 
    getCountriesById } = require('../controladores')


/* GET /countries:
    En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
    Obtener un listado de los paises.
*/
/*  GET /countries?name="...":
    Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
    Si no existe ningún país mostrar un mensaje adecuado
*/


router.get('/', getCountries);

router.get('/:idPais', getCountriesById);


module.exports = router;