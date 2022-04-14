
const initialSatate = {
    countries: [],
    allCountries: [],
    activities:[],
}



function rootReducer (state= initialSatate, action){
    switch( action.type){
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }

        case 'GET_CONTRIES_BY_CONTINENT':
            let allCountries = state.allCountries
            const statusFilter = action.payload === 'Todos'? allCountries :
                                 allCountries.filter(e => e.continent === action.payload)
            return{
                ...state,
                countries: statusFilter
            }

        case 'ORDER_COUNTRIES_AZ_BY_NAME':
            const contriesByOrder = state.allCountries
            const statusOrder = action.payload 
            return{
               
            }
        case 'VIEW_COUNTRY_INFO':
            return{
                ...state,
                country: action.payload
            }
        case 'FILTER_BY_ACTIVITY':
            let countries = state.allCountries
            const actividades = action.payload;
            console.log(actividades)
            const paisesByActivity = countries.forEach(e => e.exercise === actividades)
            console.log(paisesByActivity);
           /* const paisesMatch = actividades.forEach(e => {
                e.country.toLoweCase() === paises.id.toLoweCase()
            });
            console.log(paisesMatch)*/
            //const filtroActividades  
            return {
                ...state,
               countries: paisesByActivity
            }
        default:
            return state;
    }

}
export default rootReducer;