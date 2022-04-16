import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { exportExercise, getCounttries } from "../actions";
import { Link, useNavigate } from 'react-router-dom';


export default function PostExercise(){
    const dispatch = useDispatch()
    const countries = useSelector((state)=> state.countries)//para seleccionaar el id
    const history = useNavigate()
    const [data, setData] = useState({
        name:"",
        difficulty:" ", 
        duration:"", 
        season:"", 
        country:[] 
    })
    function handleChange (e){
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
       
       }
    function handleSelectSeason(e){
        setData({
            ...data,
            season: e.target.value
        })
    }
    function handleSelect(e){
        setData({
            ...data,
            country: [...data.country, e.target.value]
    })
        
       }
       function handleSubmit(e){
           e.preventDefault()
           console.log(data);
            dispatch(exportExercise(data))
            alert('Actividad Creada')
            setData({
                name:"",
                difficulty:" ", 
                duration:"", 
                season:"", 
                country:[] 
            })
          history.push('/countries')
       }
    useEffect(()=>{
        dispatch(getCounttries());
    },[])

     return (
         <div>
             <Link to='/countries'><button>Ir a Inicio</button></Link>
            <h1>Crear actividad</h1>
            <form onSubmit={e=>handleSubmit(e)}>

                <div>
                <label>Nombre:</label>
                    <input value={data.name} onChange={handleChange} placeholder="Nombre actividad" type="text"/>
                </div>
            <div>
            <label>Seleccionar dificultad:</label>
                <label>Dificultad:</label>
                <input value={data.difficulty} onChange={handleChange} placeholder="Valor entre 1 y 5" type="number"/>
            </div>
            <div>
                <label>Duración:</label>                   
                <input value={data.duration} onChange={handleChange} placeholder="Duración" type="text" />    
            </div>
            <div>
            <label>Temporada:</label>
                <select onChange={handleSelectSeason}>
                    <option selected="selected" disabled>--Seleccionar--</option>
                    <option value="Verano">Verano</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Invierno">Invierno</option>
                    <option value="Primavera">Primavera</option>
                </select>
            </div>
            <div>
                <label>Seleccionar País:</label>
                <select onChange={handleSelect} >
                <option selected="selected" disabled>--Seleccionar--</option>
                {countries.map(e => (
                    <option key={e.name} value={e.name}>{e.name}</option>
                ))}
                </select>
               <ul><li>{data.country.map(e => e + ", ")}</li></ul>
            </div>
            <button type="submit">Crear</button>
            </form>

         </div>
     )
}