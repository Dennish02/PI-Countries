import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCounttries } from "../actions";
import estilos from '../styles/Errors.module.css'


export default function Errors(){
    
    const dispatch=useDispatch()
    const errorTrue = useSelector((state)=> state.countries)


     function handleMount(){
       
        dispatch(getCounttries())
        
     }   



    return(
        <div>
            <button className="button" onClick={handleMount}>Volver a cargar</button>
            {errorTrue?.map((e) =>{
                return(
                   <div className={estilos.contenedorError} key={e.error}>
                    <p>{e.error}</p>
                    <img className={estilos.img} src={e.img} alt="No pais" />    
                    
                    </div>
                )


            })
            }
        </div>
    );
}