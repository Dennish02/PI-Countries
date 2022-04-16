const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');

const { Country, Exercise, Countryexercise }= require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const  getApiInfo = async ()=>{
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await apiUrl.data.map( s => {
       
        return {
                id: s.cca3,
                name: s.translations.spa.common,
                capital: s.capital && s.capital[0],
                population: s.population,
                flag: s.flags && s.flags[1],
                area: s.area,
                continent: s.continents && s.continents[0],  
        }
        
       
    });

    return apiInfo;
}

const getDbInfo = async ()=> {
    return await Country.findAll({
        include:{
            model: Exercise,
            attributes: ['name','difficulty','duration','season','id'],
            through:{
                attributes:[],
            }
        },
    });
}
const getAllCountries = async ()=>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    await postDb();
    const todo = apiInfo.concat(dbInfo);
    return todo;
}
const getExercise = async ()=>{
    const allExercise = await Exercise.findAll()
    return allExercise
}

/* GET /countries:
    En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
    Obtener un listado de los paises.
*/
router.get('/countries',async (req,res)=>{
    const name= req.query.name //para saber si hay algo por query

    let countriesAll = await getDbInfo();

    if(countriesAll.length === 0){
       // console.log('listo');
        countriesAll = await getApiInfo();
        countriesAll.forEach(e => {
          // let { name, capital[0], population, flag, continent[0]} = element;
            Country.findOrCreate({
              where:  {
                id: e.id,
                name: e.name, 
                capital: e.capital ?  e.capital : 'No Capital',
                population: e.population, 
                flag: e.flag,
                area: e.area, 
                continent: e.continent }
            })
        });
        
    }else if(name){
        let countryName = await countriesAll.filter( a => a.name.toLowerCase().includes(name.toLowerCase())) 
        countryName.length ? 
        res.status(200).send(countryName):
        res.status(404).send('No existe la ciudad');
    }else{
       
       res.status(200).send(countriesAll)
    }
})
/* GET /countries/{idPais}:
    Obtener el detalle de un país en particular
    Debe traer solo los datos pedidos en la ruta de detalle de país
    Incluir los datos de las actividades turísticas correspondientes
*/
router.get('/countries/:idPais', async (req, res)=>{
    const { idPais } = req.params;
    let countriesAll = await getDbInfo();
    if(idPais){
        let countryInfo = await countriesAll.find( a => a.id.toLowerCase() === idPais.toLowerCase()) 
        res.status(200).send(countryInfo) 
    }else{
        res.status(404).send('no hay ciudad con ese id')
    }
})
/*  GET /countries?name="...":
    Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
    Si no existe ningún país mostrar un mensaje adecuado
*/


//get activities
router.get('/activities/:value', async (req, res)=>{
    const { value } = req.params;
    const getCountries = await getDbInfo();
    
    const filter = getCountries.filter(c =>{
                  let countryAct = c.exercises.map(el => el.name.toLowerCase());
                  return countryAct.includes(value.toLowerCase())? c: null
            })
     try {
        res.send(filter) 
     } catch (error) {
         res.status(404).send(error)
     }       
    
 
})

 /* POST /activity:
    Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
    Crea una actividad turística en la base de datos
 */
router.post('/activity', async ( req, res) => {
    let { name, difficulty, duration, season, country } = req.body;
        //ARG
    /*let hayAlgo = await getDbInfo();
    if(country.length===0) res.status(404).send('Hace falta el id')
    const hayAlgoFiltro = hayAlgo.map(e=>e.id)
    console.log(country);
    let items = hayAlgo.filter(p => (
        //Sí la longitud no es la misma son diferentes
        p.length === country.length && p.every( item => country.includes(item) )
    ));

    console.log(items);*/

    //country = filtro.dataValues.id
    //almaceno
    const countries= await Country.findAll();
    const find = countries?.filter(e => e.name.toLowerCase() === country.toLowerCase())
    country = find.filter(e=>e.id)  
   let activity = await Exercise.create({
        name,
        difficulty, 
        duration,
        season,
    });
    let actividades = await Country.findAll({
            where :{ id : country}
        })

    activity.addCountry(actividades)
    //pregutno por actividades
   /*  

     let filtroActividades = await actividades.filter(e=> e.country === country);
  
     let countryId = country;
    if(!filtroActividades) res.status(404).send('no hay actividades para ese pais')
     await filtroActividades.forEach(e=>{
        let exerciseId = e.dataValues.id;

         Countryexercise.findOrCreate({
             where:{
                countryId,
                exerciseId,
             }
       
    })
     });
      */
    res.send('atividad creada')
})

module.exports = router;
