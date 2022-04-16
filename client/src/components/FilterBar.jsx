import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {getCountruByContienet, orderByName, getActivities, orderByPopulation } from "../actions";

//import {Link} from 'react-router-dom';

export default function FilterBar({setCurrentPage}){

    const dispatch= useDispatch()
    
    

    const [activity, setActivity] = useState('')
    const [poblacion, setPoblacion] = useState('')
    const [orden, setOrden] = useState('')

  

    //filtrar por continente
    function handleFilterByContinent(e){
        e.preventDefault();
        dispatch(getCountruByContienet(e.target.value))
        setCurrentPage(1);
    }
   //buscar por actividad
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getActivities(activity))
        setCurrentPage(1);
        setActivity('')
    }
    
   function handleInputChange (e){
    const { target } = e;
    setActivity(target.value)
   }
   //orden por nombre
   function handleOrderCountries(e){
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
    }
    //orden por poblacion
    function handleOrderByPopulation(e){
        dispatch(orderByPopulation(e.target.value))
        //setCurrentPage(1);
        setPoblacion(`Ordenado por ${e.target.value}`)
        console.log(e.target.value);
    }
    return (
        <div>
            <div>
           
                <label htmlFor="filtroContinente">filtrar por contiente:</label>               
                <select  onChange={e=> handleFilterByContinent(e)} name="continent" id="filtroContinente" form="carform">
                    <option disabled selected="selected" >--Seleccionar--</option>
                    <option value="Todos">Todos</option>
                    <option value="South America">South America</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Antarctica">Antarctica</option>
                </select>
               
            </div>
            <div>
               
                <label htmlFor="cantidadPoblacion">Cantidad de Poblacion:</label>
                <select id="cantidadPoblacion" onChange={e=> handleOrderByPopulation(e)}>
                <option disabled selected="selected" >--Seleccionar--</option>
                    <option value="def">Default</option>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendete</option>
                </select>    
            </div>
            <div>
            <label htmlFor="ordenAlfabetico">Orden Alfaético:</label>
                <select id="ordenAlfabetico" value={orden} onChange={e=> handleOrderCountries(e)} >
                   
                    <option selected="selected" value="def">Default</option>
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                </select>
            </div>
            <div>
                <label htmlFor="actividad">Por Actividad:</label>
                   <form  onSubmit={handleSubmit}>
                   <input value={activity} onChange={handleInputChange} placeholder="buscar actividad" type="text" />
                   <button type="submit">Buscar</button>
                   </form>
                  
                    
            </div>

             
        </div>
    )
}