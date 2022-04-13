import React from "react";
import { getCounty } from "../actions";

import { useEffect,} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Country from "./Country";

export default function InfoCountry(){
    const dispatch= useDispatch()
    const country = useSelector((state)=> state.country)

    useEffect(()=>{
        dispatch(getCounty());
    },[])

    return (
        <div>
            <h2>detalle</h2>
            <div>
                {country?.forEach(e=>{
                    return (
                        <Country name={e.name} flag={e.flag} continent={e.continent}/>
                    )
                    
                })
                     
                }
            
            </div>
            
        </div>
    )
}