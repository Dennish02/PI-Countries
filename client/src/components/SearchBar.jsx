import React from "react";
import { useState } from "react";
import { useDispatch} from 'react-redux';
import { getCountriesByName} from '../actions'
import { Link } from 'react-router-dom';
import '../styles/searchbar.css'
export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const expresionesName = /^[a-zA-ZÁ-ÿ\s]{2,40}$/;
    const [errores, setErrores] = useState({});
     //const {errors, handleKeyUp, handleReset} = useParams()
  

     function handleKeyUp(e) {
        expresionesName.test(e.target.value)? setErrores({}):
         setErrores({ error: "Colocar mas de dos caracteres y solo letras y espacios" }) 
    }
   
    function handleReset(e){
        e.target.value === '' && setErrores({})   
     }
   

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
                    onKeyUp={handleKeyUp} 
                    name="buscar" 
                    value={name}
                    onBlur={handleReset}
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