import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import { getCountriesByName } from '../actions'

export default function SearchBar(){
    const dispatch= useDispatch()
    const [name, setName] = useState('')
    function handleInputChange (e){
        const { target } = e;
        setName(target.value)
       }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getCountriesByName(name))
        setName()
    }
    return(
        <div>
              
                <form onSubmit={handleSubmit}>
                   <input value={name} onChange={handleInputChange} placeholder="Buscar Ciudad" type="text" />
                   <button type="submit">Buscar</button>
                </form>
        </div>
    )
}