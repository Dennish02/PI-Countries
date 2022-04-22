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
module.exports ={
    getApiInfo , getDbInfo
}