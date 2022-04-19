import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCounttries } from "../actions";



export default function Errors(){
    
    const dispatch=useDispatch()
    const errorTrue = useSelector((state)=> state.countries)


     function handleMount(){
       
        dispatch(getCounttries())
        
     }   



    return(
        <div>
            <button onClick={handleMount}>Volver a cargar</button>
            {errorTrue?.map((e) =>{
                return(
                   <div key={e.id}>
                    <p>{e.error}</p>
                    <img src={e.img} alt="No pais" />    
                    
                    </div>
                )


            })
            }
        </div>
    );
}