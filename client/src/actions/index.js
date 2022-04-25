import axios from "axios";




export function getCounttries(){
    return async function(dispatch){
        var json = await axios ("/countries");
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
   
}
export function getCountriesByName(value){
    return async function(dispatch){
        let json = await axios(`/countries?name=${value}`)
        return dispatch({
            type: 'GET_COUNTRY_BY_NAME',
            payload: json.data
        })
    }
}
export function getActivities(value){
    return async function(dispatch){
        var json= await axios ("/activity/"+ value)
        
        try {
            return dispatch({
                type: 'FILTER_BY_ACTIVITY',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
       
    }
}
export function getCountruByContienet(payload){
        return {
            type:'GET_CONTRIES_BY_CONTINENT',
            payload
        }
}

export function orderByName(payload){
    return{
            type: 'ORDER_COUNTRIES_AZ_BY_NAME',
            payload
        }
    
}
export function orderByPopulation(payload){
    return{
        type: 'ORDER_COUNTRIES_BY_POPULATION',
        payload
    }
}
export function getCounty(idPais){
    return async function (dispatch){
        let json = await axios(`/countries/${idPais}`)
        return dispatch({
            type: 'VIEW_COUNTRY_INFO',
            payload: json
        })
    }
}
export function exportExercise(payload){
    return async function(){
        
        const json = await axios.post("/activity", payload)
        return json;
    }
}
export function deleteExcercise(payload){
    const {idPais, idActivity} = payload
    return async function(dispatch){
        
        const json = await axios.delete(`/activity/${idPais}/${idActivity}`)
        
        return dispatch({
            type: 'DELETE_EXERCISE',
            payload: json
        })
    }
}
