import React from "react";
import { useState } from "react";
import { useDispatch} from 'react-redux';
import { getCountriesByName} from '../actions'

export default function SearchBar({handleKetUp, errores}) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    
    function handleSubmit(e) {
            e.preventDefault();
            if(name && name.length > 1 && errores !== {}){
                dispatch(getCountriesByName(name))
                setName()
            }else{
                alert('completar el campo')
                setName()
            } 
            
    }
    

   
    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input 
                    onKeyUp={handleKetUp} 
                    name="buscar" 
                    value={name} 
                    onChange={e=>setName(e.target.value)} 
                    placeholder="Buscar Ciudad" 
                    type="text" 
                />
                <button type="submit">Buscar</button>
            </form>
            {errores && (
                        <p>{errores.error}</p>
                    )}
        </div>
    )
}