import React from "react";

export default function Country({  name, continent, flag}){
    return(
        <div>
            <h3>{name}</h3>
            <h4>{continent}</h4>
            <img src={flag} alt="bandera pais" width="250px" height="200px"/>
        </div>
    );
}