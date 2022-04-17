import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { exportExercise, getCounttries } from "../actions";
import { Link } from 'react-router-dom';


export default function PostExercise() {
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.countries)//para seleccionaar el id
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
    }, [])
   
    function handleKetUp(e){
      if(expresionesName.test(e.target.value)){
          setErrores({})
      }else{
         setErrores({error : "Colocar mas de dos caracteres y solo letras y espacios"}) 
      }
  }
    
    function handleBlur(e) {
        //añadir name y duration
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
        const id = countries.find(e => {
            if (e.name === valor) {
                return e.id
            }
        })
        setActivity({
            ...activity,
            country: [...activity.country, id.id]
        })

    }

    //deleted
    function handleDelete (e){
        e.preventDefault()
        const id = e.target.innerText
        const citi = activity.country
       

        setActivity({
            ...activity,
            country: citi.filter(e => e !== id)
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
            alert('Actividad Creada')
            setActivity({
                name: "",
                difficulty: "",
                duration: "",
                season: "",
                country: []
            })
        } else {
            setErrors(true)
        }

    }


    return (
        <div>
            <Link to='/countries'><button>Ir a Inicio</button></Link>
            <h1>Crear actividad</h1>
            <form onSubmit={e => handleSubmit(e)}>

                <div>
                    {errores && (
                        <p>{errores.error}</p>
                    )}
                    <label htmlFor="nombre">Nombre:</label>
                    <input
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

                </div>
                <div>
                    <label htmlFor="duracion">Duración:</label>
                    <select 
                        id="duracion" 
                        value={activity.difficulty} 
                        name="difficulty" 
                        onChange={handleBlur}
                    >
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
                    <select id="temporada" onChange={handleSelectSeason} required>
                        <option selected="selected" disabled>--Seleccionar--</option>
                        <option value="Verano">Verano</option>
                        <option value="Otoño">Otoño</option>
                        <option value="Invierno">Invierno</option>
                        <option value="Primavera">Primavera</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="seleccionar">Seleccionar País:</label>
                    <select id="seleccionar" onChange={handleSelect} required>
                        <option selected="selected" disabled>--Seleccionar--</option>
                        {countries.map(e => (
                            <option key={e.name} value={e.name}>{e.name}</option>
                        ))}
                    </select>
                    <ul><li  onClick={handleDelete} value={activity.name} > {activity.country.map(e =>(<p key={e}>{e}</p>))}</li></ul>
                </div>
                <button type="submit">Crear</button>
            </form>
            {errors && (
                <p>Todos los campos son obligatorios</p>
            )
            }

        </div>
    )
}
