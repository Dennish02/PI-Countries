import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getCounttries, getCountruByContienet, orderByName, getActivities, orderByPopulation } from "../actions";

//import {Link} from 'react-router-dom';

export default function FilterBar(){
    const dispatch= useDispatch()
    const allCountries = useSelector((state)=> state.countries)
    const [activity, setActivity] = useState('')
    
    const [poblacion, setPoblacion] = useState([])
    const [orden, setOrden] = useState('')
    useEffect(()=>{
        dispatch(getCounttries());
    },[])
    //filtrar por continente
    function handleFilterByContinent(e){
        e.preventDefault();
        dispatch(getCountruByContienet(e.target.value))
    }
   //buscar por actividad
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getActivities(activity))
    }
    
   function handleInputChange (e){
    const { target } = e;
    setActivity(target.value)
   }
   //orden por nombre
   function handleOrderCountries(e){
    dispatch(orderByName(e.target.value))
    //setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
    }
    //orden por poblacion
    function handleOrderByPopulation(e){
        dispatch(orderByPopulation(e.target.value))
    }
    return (
        <div>
            <div>
           
                <label for="continent">filtrar por contiente:</label>               
                <select onChange={e=> handleFilterByContinent(e)} name="continent" id="continent" form="carform">
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
                <label>Cantidad de Poblacion:</label>
                <select onChange={e=> handleOrderByPopulation(e)}>
                    <option value="def">Default</option>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendete</option>
                </select>    
            </div>
            <div>
                <label>Orden Alfaético:</label>
                <select onChange={e=> handleOrderCountries(e)} >
                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                </select>
            </div>
            <div>
                <label for="actividad">Por Actividad:</label>
                   <form onSubmit={handleSubmit}>
                   <input value={activity} onChange={handleInputChange} placeholder="buscar actividad" type="text" />
                   <button type="submit">Buscar</button>
                   </form>
                  
                    
            </div>

             
        </div>
    )
}