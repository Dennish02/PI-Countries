const { Router } = require('express');
const router = Router();

const {
    getActivitieByName, 
    postActivity,
    deletedActivity} = require('../controladores')
    
/* GET /countries/{idPais}:
    Obtener el detalle de un país en particular
    Debe traer solo los datos pedidos en la ruta de detalle de país
    Incluir los datos de las actividades turísticas correspondientes
*/
    router.get('/:value', getActivitieByName);

/* POST /activity:
   Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
   Crea una actividad turística en la base de datos
*/
    router.delete('/:idPais/:idActividad', deletedActivity)

    router.post('/', postActivity);

    module.exports = router;