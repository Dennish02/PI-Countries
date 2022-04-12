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
export function getCountruByContienet(value){
    return async function(dispatch){
        var json= await axios("http://localhost:3001/countries");
        const arr= json.data.filter(e => e.continent === value)
        return dispatch({
            type:'GET_CONTRIES_BY_CONTIENT',
            payload: arr
        })
    }
}
export function orderByName(){
    return async function(dispatch){
        let json= await axios("http://localhost:3001/countries");
        const orden = json.data.name.sort()
        return dispatch({
            type: 'ORDER_COUNTRIES_AZ_BY_NAME',
            payload: orden
        })
    }
}