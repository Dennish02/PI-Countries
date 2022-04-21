import React from "react";
import {Link} from "react-router-dom";
import Video from '../video/loading.mp4';
import estilos from  '../styles/LandingPage.module.css';
import { useDispatch } from "react-redux";
import { getCounttries } from "../actions";

export default function LandingPage() {
    const dispatch = useDispatch();

    function handleInit(){
        dispatch(getCounttries())
    }
    return (
        <div className={estilos.contenedorGeneral}>
            <video
                autoPlay
                muted
                className={estilos.video}
                src={Video}>

            </video>
        
        <div className={estilos.contenedor}>
                <div className={estilos.contenedorContenido}>
                    <h1>Conoce tu mundo</h1>
                    <p>Podes ver todos los países</p>
                    <Link to='/countries'>
                        <button onClick={handleInit} className="button">Comenzar</button>
                    </Link>
                </div>

            </div>
 
        </div>
    )
}