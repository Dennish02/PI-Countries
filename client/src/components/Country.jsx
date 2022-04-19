import React from "react";
import estilos from '../styles/Country.module.css'


export default function Country({ name, continent, flag}){
    return(
        <div className={estilos.contenedor} >
          <div className={estilos.contenedorContenido}>
            <h3>{name}</h3>
            <p>{continent}</p>
          </div>
            <img className={estilos.img} src={flag} alt="bandera pais" width="250px" height="200px"/>
        </div>
    );
}