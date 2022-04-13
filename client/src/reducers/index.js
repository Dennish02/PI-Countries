
const initialSatate = {
    countries: [],
    country:[],
}



function rootReducer (state= initialSatate, action){
    switch( action.type){
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload
            }

        case 'GET_CONTRIES_BY_CONTINENT':
            const allCountries = state.countries
            const statusFilter = action.payload === 'Todos'? allCountries :
                                 allCountries.filter(e => e.continent === action.payload)
            return{
                ...state,
                countries: statusFilter
            }

        case 'ORDER_COUNTRIES_AZ_BY_NAME':
           
            return{

            }
        case 'VIEW_COUNTRY_INFO':
            return{
                ...state,
                country: action.payload
            }
        default:
            return state;
    }

}
export default rootReducer;