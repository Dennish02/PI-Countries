import React from "react";



export default function Paginado ({countriesByPage, allCountries, paginas}){
    const pageNumber = []
    
    for(let i=0; i <= Math.ceil( allCountries/countriesByPage -1 ); i++){
        pageNumber.push(i+1)
    }
    return (
        
            <ul>
                {pageNumber &&
                pageNumber.map(number =>(
                    <li key={number}>
                        {
                            number<=25?
                            <button className="buttonSecundario" onClick={() => paginas(number)}>{number}</button>
                        : null
                        }

                          
                    </li>
                ))}
            </ul>   
    )
}