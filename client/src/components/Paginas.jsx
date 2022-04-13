import React from "react";



export default function Paginado ({countriesByPage, allCountries, paginas}){
    const pageNumber = []

    for(let i=0; i <= Math.ceil( allCountries/countriesByPage ); i++){
        pageNumber.push(i+1)
    }
    return (
        
            <ul>
                {pageNumber &&
                pageNumber.map(number =>(
                    <li key={number}>
                        <a onClick={() => paginas(number)}>{number}</a>
                    </li>
                ))}
            </ul>   
    )
}