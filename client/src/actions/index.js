import axios from "axios";




export function getCounttries(){
    return async function(dispatch){
        var json = await axios ("http://localhost:3001/countries");
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
   
}
export function getActivities(value){
    return async function(dispatch){
        var json= await axios ("http://localhost:3001/activities/"+ value)
       
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
export function getCounty(id){
    return async function (dispatch){
        let json = await axios("http://localhost:3001/countries/"+id)
        return dispatch({
            type: 'VIEW_COUNTRY_INFO',
            payload: json
        })
    }
}
