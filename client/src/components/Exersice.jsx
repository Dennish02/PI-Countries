import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { exportExercise, getCounttries } from "../actions";
import { Link } from 'react-router-dom';
import estilos from '../styles/Exercise.module.css'

export default function PostExercise() {
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.allCountries)//para seleccionaar el id
    const [errors, setErrors] = useState(false);  
    const [activity, setActivity] = useState({
        name: "",
        difficulty: '',
        duration: "",
        season: "",
        country: [],
    })
    const [errores, setErrores] = useState({});
    const expresionesName = /^[a-zA-ZÁ-ÿ\s]{2,40}$/
    const [name, setName] = useState('')
    const [duration, setDuration] = useState('')
    

    useEffect(() => {
        dispatch(getCounttries());
    }, [dispatch])
   
    function handleKetUp(e){
      if(expresionesName.test(e.target.value)){
          setErrores({})
      }else{
         setErrores({error : "Colocar mas de dos caracteres y solo letras y espacios"}) 
      }
  }
    
    function handleBlur(e) {
        e.target.value === ''&& setErrores({})
        setActivity({
            ...activity,
            [e.target.name]: e.target.value,
        })
    }
    //seleccionar temporada
    function handleSelectSeason(e) {
        setActivity({
            ...activity,
            season: e.target.value
        })
    }
    //seleccionar países
    function handleSelect(e) {
        const valor = e.target.value
        const id = countries.find(e=> {
            if(e.name === valor){
                return e.id
            }
            
        })
        if(activity.country.includes(id.id)){
            alert('ya seleccionaste este País')
        }else{
            setActivity({
                ...activity,
                country: [...activity.country, id.id]
            })
        }
    }

    //deleted
    function handleDelete (e){
        console.log(e);
       // const id = e.target.innerText
        setActivity({
            ...activity,
            country: activity.country.filter(el => el !== e)
        })
    }
    //clear
  
    function handleSubmit(e) {
        e.preventDefault()
        if (
            activity.name !== "" &&
            activity.duration !== "" &&
            activity.country.length !== 0 &&
            activity.season !== "" &&
            activity.difficulty !== ""
        ) {
            setErrors(false)
            dispatch(exportExercise(activity))
            setActivity({
                name: "",
                difficulty: "",
                duration: "",
                season: "",
                country: []
            })
            alert('Actividad Creada')
            
        } else {
            setErrors(true)
        }

    }


    return (
        <div className={estilos.contenedor}>
            <Link to='/countries'><button className="button">Ir a Inicio</button></Link>
            <h2>Crear actividad</h2>
            <form onSubmit={e => handleSubmit(e)}>
            <div className={estilos.formulario}>
                <div>
                   
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        className={estilos.input}
                        id="nombre"
                        value={name}
                        name='name'
                        onChange={(e) => setName(e.target.value)}
                        onKeyUp={handleKetUp}
                        onBlur={handleBlur}
                        placeholder="Nombre actividad"
                        type="text"
                        required
                        
                    />
                   
                    {errores && (
                       <small className={estilos.error}>  {errores.error}</small>
                    )}
                    
                </div>
                <div>
                    <label htmlFor="duracion">Dificultad:</label>
                    <select
                        className={estilos.select} 
                        id="duracion" 
                        value={activity.difficulty} 
                        name="difficulty" 
                        onChange={handleBlur}
                    >
                        <option defaultValue disabled="disabled">--Seleccionar--</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="duracion">Duración:</label>
                    <input
                        className={estilos.select}
                        id="duracion"
                        value={duration}
                        name='duration'
                        onBlur={handleBlur}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="Duración"
                        type="time"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="temporada">Temporada:</label>
                    <select className={estilos.select} id="temporada" onChange={handleSelectSeason} required>
                        <option  defaultValue disabled="disabled">--Seleccionar--</option>
                        <option value="Verano">Verano</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Invierno">Invierno</option>
                        <option value="Primavera">Primavera</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="seleccionar">Seleccionar País:</label>
                    <select className={estilos.select} id="seleccionar" onChange={handleSelect} required>
                      
                        {countries.map(e => (
                            <option key={e.name} value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    <div className={estilos.paises}>
                    {activity.country.map(el =>
                        (<div className={estilos.pais} key={el}>
                            <p >{el}</p>
                            <button className={estilos.button}onClick={()=>handleDelete(el)}>✖️</button>
                            </div>
                        ))}
                    </div>
                  
                </div>
                </div>
                <button className="button" type="submit">Crear</button>
            </form>
            <small>
            {errors && (
                <p>Todos los campos son obligatorios</p>
            )
            }             
            </small>
           

        </div>
    )
}
