const axios = require('axios');

const { Country, Exercise } = require('../db')

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await apiUrl.data.map(s => {

        return {
            id: s.cca3,
            name: s.translations.spa.common,
            capital: s.capital && s.capital[0],
            population: s.population,
            flag: s.flags && s.flags[1],
            area: s.area,
            continent: s.continents && s.continents[0],
            region: s.region,
            subregion: s.subregion,
        }


    });

    return apiInfo;
}

const getDbInfo = async () => {
    return await Country.findAll({
        include: {
            model: Exercise,
            attributes: ['name', 'difficulty', 'duration', 'season', 'id'],
            through: {
                attributes: [],
            }
        },
    });
}

const getCountries = async (req, res) => {
    const name = req.query.name //para saber si hay algo por query

    let countriesAll = await getDbInfo();

    if (countriesAll.length === 0) {
        // console.log('listo');
        countriesAll = await getApiInfo();
        countriesAll.forEach(e => {
            // let { name, capital[0], population, flag, continent[0]} = element;
            Country.findOrCreate({
                where: {
                    id: e.id,
                    name: e.name,
                    capital: e.capital ? e.capital : 'No Capital',
                    population: e.population,
                    flag: e.flag,
                    area: e.area,
                    continent: e.continent,
                    region: e.region ? e.region : 'No Region',
                    subregion: e.subregion  ? e.subregion : 'No Region',
                }
            })
        });

    } else if (name) {
        let countryName = await countriesAll.filter(a => a.name.toLowerCase().includes(name.toLowerCase()))
        try {
            res.status(200).send(countryName)
        } catch (error) {
            res.status(404).send(error)
        }   
    } else {
        res.status(200).send(countriesAll)
    }
}

const getCountriesById = async (req, res) => {
    const { idPais } = req.params;
    let countriesAll = await getDbInfo();
    if (idPais) {
        let countryInfo = await countriesAll.find(a => a.id.toLowerCase() === idPais.toLowerCase())
        res.status(200).send(countryInfo)
    } else {
        res.status(404).send('no hay ciudad con ese id')
    }
}

const getActivitieByName =  async (req, res) => {
    const { value } = req.params;
    const getCountries = await getDbInfo();

    const filter = getCountries.filter(c => {
        let countryAct = c.exercises.map(el => el.name.toLowerCase());
        return countryAct.includes(value.toLowerCase()) ? c : null
    })
    try {
        res.status(200).send(filter)
    } catch (error) {
        res.status(404).send(error)
    }
}

const postActivity = async (req, res) => {
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
    let activity = await Exercise.create({
        name,
        difficulty,
        duration,
        season,
    });

    let idCountries = await Country.findAll({
        where: { id: country }
    })

    activity.addCountry(idCountries)
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
}
module.exports ={
    getApiInfo , 
    getDbInfo, 
    getCountries,
    getCountriesById,
    getActivitieByName,
    postActivity
}