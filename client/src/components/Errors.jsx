import React, { useState } from "react";



export default function Errors({ name, continent, flag}){
    const [ eeror1, setError1] = useState({})

    if(name===''){
        setError1({
            ...eeror1,
            continent: continent,
            flag: flag,
        })
    }

    return(
        <div>
           <p>{eeror1.continent}</p> 
           <p>{eeror1.flag}</p>
        </div>
    );
}