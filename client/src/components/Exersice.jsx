import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { exportExercise, getCounttries } from "../actions";
import { Link } from 'react-router-dom';


export default function PostExercise(){
    const dispatch = useDispatch()
    const countries = useSelector((state)=> state.countries)//para seleccionaar el id
   
    const [activity, setActivity] = useState({
        name:"",
        difficulty:"", 
        duration:"", 
        season:"", 
        country:[], 
    })
    const [name, setName]=useState('')
    const [difficulty, setDificulty]=useState()
    const [duration, setDuration]=useState('')
    useEffect(()=>{
        dispatch(getCounttries());
    },[])


    function handleChangeName (e){
        
        setActivity({
            ...activity,
            name: name, 
        }); 
        setName(e.target.value)
       }
       function handleChangeDifficulty (e){
        setActivity({  
            ...activity,          
            difficulty: difficulty, 
            }); 
        setDificulty(e.target.value)
       }
       function handleChangeDuration (e){
        
        setActivity({  
            ...activity,          
            duration: duration, 
            }); 
        setDuration(e.target.value)
       }
    function handleSelectSeason(e){
        
        setActivity({
            ...activity,
            season: e.target.value
        })
    }

    function handleSelect(e){
        const valor=e.target.value
        const id = countries.find(e=>{
            if(e.name === valor){
                return e.id
            } 
        })
        console.log(id.id);
        setActivity({
            ...activity,
            country: [...activity.country, id.id]
    })
        
       }
       function handleSubmit(e){
           e.preventDefault()
           console.log(activity);
        
            dispatch(exportExercise(activity))
            alert('Actividad Creada')
            setActivity({
                name:"",
                difficulty:"", 
                duration:"", 
                season:"", 
                country:[] 
            })
       }
   

     return (
         <div>
             <Link to='/countries'><button>Ir a Inicio</button></Link>
            <h1>Crear actividad</h1>
            <form onSubmit={e=>handleSubmit(e)}>

                <div>
                <label htmlFor="nombre">Nombre:</label>
                    <input 
                        id="nombre" 
                        value={name} 
                        onChange={(e)=>handleChangeName(e)} 
                        placeholder="Nombre actividad" 
                        type="text"
                    />
                </div>
            <div>
           
                <label htmlFor="dificultad">Dificultad:</label>
                <input 
                    id="dificultad" 
                    value={difficulty} 
                    onChange={(e)=>handleChangeDifficulty(e)} 
                    placeholder="Valor entre 1 y 5" 
                    type="number"
                />
            </div>
            <div>
                <label htmlFor="duracion">Duración:</label>                   
                <input 
                    id="duracion" 
                    value={duration} 
                    onChange={(e)=>handleChangeDuration(e)} 
                    placeholder="Duración" 
                    type="text" 
                />    
            </div>
            <div>
            <label htmlFor="temporada">Temporada:</label>
                <select id="temporada" onChange={handleSelectSeason}>
                    <option selected="selected" disabled>--Seleccionar--</option>
                    <option value="Verano">Verano</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Invierno">Invierno</option>
                    <option value="Primavera">Primavera</option>
                </select>
            </div>
            <div>
                <label htmlFor="seleccionar">Seleccionar País:</label>
                <select id="seleccionar" onChange={handleSelect} >
                <option selected="selected" disabled>--Seleccionar--</option>
                {countries.map(e => (
                    <option key={e.name} value={e.name}>{e.name}</option>
                ))}
                </select>
               <ul><li>{activity.country.map(e => e + ", ")}</li></ul>
            </div>
            <button type="submit">Crear</button>
            </form>

         </div>
     )
}