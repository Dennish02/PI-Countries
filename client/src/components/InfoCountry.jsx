import React from "react";
import { getCounty } from "../actions";


import { useSelector} from 'react-redux';


export default function InfoCountry({id}){
    
    const country = useSelector((state)=> state.country)

    console.log(country)
    return (
        <div>
            <h2>detalle</h2>
            
           
            
        </div>
    )
}