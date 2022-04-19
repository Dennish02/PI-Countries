import React from "react";
import { useState } from "react";
import { useDispatch} from 'react-redux';
import { getCountriesByName} from '../actions'
import { Link } from 'react-router-dom';
import '../styles/searchbar.css'
export default function SearchBar({handleKetUp, errores}) {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    
    function handleSubmit(e) {
            e.preventDefault();
            if(name && name.length > 1 && errores !== {}){
                dispatch(getCountriesByName(name))
                setName('')
            }else{
                alert('completar el campo')
                setName('')
            } 
            
    }
    

   
    return (
        <div className="container__search">
            <nav className="nav">
                <Link to='/countries'>
                <h1 className="titulo">Países</h1>
                </Link>  

                    
            </nav>
            <Link className="link" to='/activity'>Crear actividad</Link>
            <div className="searchBar">
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    className="form__input"
                    onKeyUp={handleKetUp} 
                    name="buscar" 
                    value={name} 
                    onChange={e=>setName(e.target.value)} 
                    placeholder="Buscar País" 
                    type="text" 
                />
                <button className="button" type="submit">Buscar</button>
            </form>
            <small className="small">
            {errores && (
                        <p>{errores.error}</p>
                    )}
            </small>
           
            </div>
           
        </div>
    )
}