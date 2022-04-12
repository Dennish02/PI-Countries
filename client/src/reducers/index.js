
const initialSatate = {
    countries: [],
}



function rootReducer (state= initialSatate, action){
    switch( action.type){
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload
            }

        case 'GET_CONTRIES_BY_CONTIENT':
            return{
                
            }

        case 'ORDER_COUNTRIES_AZ_BY_NAME':
            return{

            }

        default:
            return state;
    }

}
export default rootReducer;