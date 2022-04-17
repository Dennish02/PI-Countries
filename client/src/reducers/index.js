import img from '../img/Ups2.jpg'
const initialSatate = {
    countries: [],
    allCountries: [],
    country:{},
    order: []
}



function rootReducer (state= initialSatate, action){
    switch(action.type){
        case 'GET_COUNTRIES':
           
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
            
        case 'GET_COUNTRY_BY_NAME':
            let countryName = action.payload
            let noCountrie = [{name: '',
                                 continent: 'Ningún país tiene ese nombre',
                                 flag: img}]
            let hayOsi = countryName.length !== 0 ? action.payload : noCountrie
            return {
                ...state,
                countries: hayOsi
            }

        case 'GET_CONTRIES_BY_CONTINENT':
            let allCountries = state.allCountries
            const statusFilter = action.payload === 'Todos'? state.allCountries :
                                 allCountries.filter(e => e.continent === action.payload)
            return{
                ...state,
                countries: statusFilter
            }

        case 'ORDER_COUNTRIES_AZ_BY_NAME':
            let todos = state.allCountries
            let statusOrder 
            if(action.payload === 'def')statusOrder=todos;
        
             statusOrder = action.payload === 'asc'? state.allCountries.sort(((a, b) => {
                                if(a.name > b.name) {
                                    return 1;
                                }
                                if(b.name > a.name) {
                                    return -1;
                                }
                                return 0;
                                })):
                                state.countries.sort(((a, b) => {
                                if(a.name > b.name) {
                                    return -1;
                                }
                                if(b.name > a.name) {
                                    return 1;
                                }
                                return 0;
                                }))           
            return{
               ...state,
               countries: statusOrder
            }

            case 'ORDER_COUNTRIES_BY_POPULATION':
                let countriesTotal = state.allCountries;
                let populationOrder
                if(action.payload === 'def') populationOrder = state.allCountries;
                if(action.payload === 'asc') populationOrder = countriesTotal.sort(((a,b) => a.population - b.population));
                if(action.payload === 'des') populationOrder = countriesTotal.reverse(((a, b) => a.population - b.population))

                return{
                   ...state,
                   countries: populationOrder
                }

        case 'VIEW_COUNTRY_INFO':
            
            return{
                ...state,
                country: action.payload
            }
        case 'FILTER_BY_ACTIVITY':
            let countryFilter = action.payload
            let mensajeError = [{name: '',
                                 continent: 'Ningún país tiene esa actividad, ¿Desea Crearla?',
                                 flag: img}]
            let hayOno = countryFilter.length !== 0 ? action.payload : mensajeError
            return {
                ...state,
                countries: hayOno
            }
        case 'POST_EXERCISE':
            return{
                ...state,
            }
        default:
            return state;
    }

}
export default rootReducer;