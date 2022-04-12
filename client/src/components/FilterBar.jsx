import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getCounttries,getCountruByContienet,orderByName } from "../actions";
//import {Link} from 'react-router-dom';

export default function FilterBar(){
    const dispatch= useDispatch()
    const allCountries = useSelector((state)=> state.countries)

    useEffect(()=>{
        dispatch(getCounttries());
    },[])

    function handleSelect(e){
        e.preventDefault();
        dispatch(getCountruByContienet())
    }
    function renderAll(e){
        e.preventDefault();
        dispatch(getCounttries())
    }
    function handleClick(e){
        e.preventDefault();
        dispatch(orderByName())
    }
    return (
        <div>
            <div>
                <label for="continent">filtrar por contiente:</label>
                <select name="continent" id="continent" form="carform">
                    <option onSelect={renderAll} value="Todos">Todos</option>
                    <option onSelect={handleSelect} value="South America">South America</option>
                    <option onSelect={handleSelect} value="North America">North America</option>
                    <option onSelect={handleSelect} value="Europe">Europe</option>
                    <option onSelect={handleSelect} value="Asia">Asia</option>
                    <option onSelect={handleSelect} value="Africa">Africa</option>
                    <option onSelect={handleSelect} value="Oceania">Oceania</option>
                    <option onSelect={handleSelect} value="Antarctica">Antarctica</option>
                </select>

            </div>
            <div>
                <label for="poblacion">Cantidad de Poblacion:</label>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendete</option>
                </select>    
            </div>
            <div>
                <label for="alfabetico">Orden Alfaético:</label>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendete</option>
                </select>
            </div>
           

             
        </div>
    )
}