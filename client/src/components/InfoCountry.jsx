import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCounty} from "../actions";
import { Link, useParams } from 'react-router-dom';
import estilos from '../styles/InfoCountry.module.css';

export default function InfoCountry(){
    const {id} = useParams();
    const dispatch = useDispatch()
    const country = useSelector((state)=> state.country)
   

    useEffect(()=>{
        dispatch(getCounty(id))
    }, [])
  
     return (
         <div className={estilos.contenedor}>
             <Link to='/countries'><button className="button" >Volver</button></Link>
             {
                 country.data ?
                     <div className={estilos.contenedorContenido}>
                         <div className={estilos.contenedorInfo}>
                         <img className={estilos.img} src={country.data.flag} />
                         <div className={estilos.texto}>
                             <h2>{country.data.name}</h2>
                             <p><span>Continente:</span>{` ${country.data.region}`}</p>
                             <p><span>Subregion:</span>{` ${country.data.subregion}`}</p>
                             <p><span>Código País:</span>{` ${country.data.id}`}</p>
                             <p><span>Capital:</span>{` ${country.data.capital}`}</p>
                             <p> <span>Población:</span>{` ${country.data.population}`}</p>
                             <p><span>Área:</span>{` ${country.data.area}`} <small>km2</small> </p>
                             
                         </div>
                         </div>
                       
                         
                         <div className={estilos.contenedorActividades}>
                             <h4>Actividades registradas en este país</h4>
                             <div className={estilos.actividades}>
                                 {country.data.exercises.length > 0 ? country.data.exercises.map(e =>
                                     <div className={estilos.actvidad} key={e.id}>
                                         <p><span>Nombre:</span> {e.name}</p>
                                         <p><span>Dificultad:</span> {e.difficulty}</p>
                                         <p><span>Duración:</span> {e.duration}</p>
                                         <p><span>Temporada:</span> {e.season}</p>
                                     </div>

                                 ) : <p className={estilos.error} >Este país no tiene actividad </p>}
                             </div>

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