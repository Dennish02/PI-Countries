import React from "react";
import {Link} from "react-router-dom";
import Videomp4 from '../video/loading.mp4';
import Videoogg from '../video/loading.ogg';
import Videowebm from '../video/loading.webm';
import estilos from  '../styles/LandingPage.module.css';


export default function LandingPage() {
    
    return (
        <div className={estilos.contenedorGeneral}>
            <video autoPlay muted className={estilos.video}>
                <source src={Videomp4} type="video/mp4"></source> 
                <source src={Videoogg} type="video/ogg"></source> 
                <source src={Videowebm} type="video/webm"></source>   
            </video>
        
        <div className={estilos.contenedor}>
                <div className={estilos.contenedorContenido}>
                    <h1>Conoce tu mundo</h1>
                    <p>Podes ver todos los países</p>
                    <Link to='/countries' className={estilos.button}>
                       Comenzar
                    </Link>
                </div>

            </div>
 
        </div>
    )
}