import img from '../img/Ups2.jpg'
const initialSatate = {
    countries: [],
    allCountries: [],
    paracontinente:[],
    country:[],
    order: [],
    error:[]
}



function rootReducer (state= initialSatate, action){
    switch(action.type){
        case 'GET_COUNTRIES':
           
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload,
                paracontinente: action.payload,
            }
            
        case 'GET_COUNTRY_BY_NAME':
            let countryName = action.payload
            let noCountrie = [{id:2,
                                error: 'Ningún país tiene ese nombre',
                                 img: img}]
            let hayOsi = countryName.length !== 0 ? action.payload : noCountrie
            return {
                ...state,
                countries: hayOsi
            }

        case 'GET_CONTRIES_BY_CONTINENT':
            //let LoCountries = state.allCountries
            const statusFilter =  state.allCountries.filter(e => e.region === action.payload)             
            return{
                ...state,
                countries: statusFilter
            }

        case 'ORDER_COUNTRIES_AZ_BY_NAME':
            //let todos = state.allCountries
              
            let statusOrder  = action.payload === 'AZ'? state.countries.sort(((a, b) => {
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
                let countriesTotal = state.countries;
                let populationOrder = action.payload === 'Ascendente'? countriesTotal.sort(((a,b) => a.population - b.population)):
                countriesTotal.sort(((a, b) => b.population - a.population))

    
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
            let mensajeError = [{id:1,
                                 error: 'Ningún país tiene esa actividad, ¿Desea Crearla?',
                                 img: img}]
            let hayOno = countryFilter.length !== 0 ? action.payload : mensajeError
            return {
                ...state,
                countries: hayOno
            }
        case 'POST_EXERCISE':
            return{
                ...state,
            }
        case 'DELETE_EXERCISE':
                return{
                    ...state,
                    country: action.payload
                }
        default:
            return state;
    }

}
export default rootReducer;