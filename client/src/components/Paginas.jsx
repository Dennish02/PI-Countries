import React from "react";



export default function Paginado ({countriesByPage, allCountries, paginas}){
    const pageNumber = []
    
    for(let i=1; i <= Math.ceil( allCountries/countriesByPage ); i++){
        pageNumber.push(i)
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