import React from "react";



export default function Paginado ({countriesByPage, allCountries, paginas,goToPreviousPage, goToNextPage, currentPage}){
    let pageNumber = []
    let page = Math.ceil( allCountries/countriesByPage );
    for(let i=1; i <= page; i++){
        pageNumber.push(i)
    }
    return (
        <div>
            <ul>
                { currentPage -1 > 0 ?
                     <button onClick={goToPreviousPage}  className="buttonSecundario" >⏮</button> : null
                }
           
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
                { currentPage < page ?
                  <button onClick={goToNextPage}  className="buttonSecundario" >⏭</button>    : null  
                }
                 
            </ul>  
        </div>
           
    )
}