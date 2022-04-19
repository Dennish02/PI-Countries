import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCounty} from "../actions";
import { Link, useParams } from 'react-router-dom';


export default function InfoCountry(){
    const {id} = useParams();
    const dispatch = useDispatch()
    const country = useSelector((state)=> state.country)
   

    useEffect(()=>{
        dispatch(getCounty(id))
    }, [])
  
     return (
         <div>
             <Link to='/countries'><button>Volver</button></Link>
               {  
                country.data? 
                    <div> 
                    <h2>{country.data.name}</h2>
                    <p><span>Continente:</span>{` ${country.data.continent}`}</p>
                    <p><span>Capital:</span>{` ${country.data.capital}`}</p>
                    <p> <span>Poblacion:</span>{` ${country.data.population}`}</p>
                    <p><span>Área:</span>{` ${country.data.area}`} <small>km2</small> </p>
                    <img src={country.data.flag}/>
                    <div>{country.data.exercises.length > 0 ? country.data.exercises.map(e=>
                        <div key={e.id}>
                        <h4>Nombre:{e.name}</h4>
                        <p>Dificultad:{e.difficulty}</p>
                        <p>Duración:{e.duration}</p>
                        <p>Temporada:{e.season}</p>
                        </div>
                        
                        ) :<div><p>Este país no tiene actividad</p> </div>}
                    </div>
                    
                </div> 
                
               
                  : <p>Cargando...</p>
                 } 
             
         </div>
     )
}

/**
 * 
 *  <div>{country.data.exercises?.map(e=>{
                        <div key={e.id}>
                            <div>Nombre:{e.name}</div>
                            <div>Dificultad:{e.difficulty}</div>
                            <div>Duración:{e.duration}</div>
                            <div>Temporada:{e.season}</div>
                        </div>
                    })}</div>
 */