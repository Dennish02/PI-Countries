import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getCounttries } from "../actions";
import {Link} from 'react-router-dom';
import FilterBar from "./FilterBar";
import Country from "./Country";


export default function Countries(){
    const dispatch= useDispatch()
    const allCountries = useSelector((state)=> state.countries)

    useEffect(()=>{
        dispatch(getCounttries());
    },[])
    
    return (
        <div>
            <Link to ='/activity'>Crear actividad</Link>
            <h1>Api Países</h1>
            <FilterBar/>
            <div>
            {allCountries?.map(e=>{
                return(
                    <Link to={"/countries/"+e.id}>
                     <Country name={e.name} flag={e.flag} continent={e.continent}/>
                    </Link>
                   
                )
                    
                })
            }    
            </div>
        </div>
    )
}