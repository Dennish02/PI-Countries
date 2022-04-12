import React from "react";
import {Link} from "react-router-dom";



export default function LandingPage(){
    return (
        <div>
            <h1>Bienvenido</h1>
            <p>Ingresá para ver los paises</p>
            <Link to ='/countries'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}