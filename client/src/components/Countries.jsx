import React from "react";
import { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getCounttries } from "../actions";
import {Link} from 'react-router-dom';
import FilterBar from "./FilterBar";
import Country from "./Country";
import Paginas from './Paginas';


export default function Countries(){
    const dispatch= useDispatch()
    const allCountries = useSelector((state)=> state.countries)
    const [currentPage, setCurrentPage] = useState(1);//primera pagina
    const [countriesByPage, setCountriesByPage] = useState(9);///paises por pagina
    const indexOfLastCountrie = currentPage * countriesByPage;
    const indexOfFirstCountry = indexOfLastCountrie - countriesByPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountrie);

    const paginas = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getCounttries());
    },[])
    
    return (
        <div>
            <Link to ='/activity'>Crear actividad</Link>
            <h1>Api Países</h1>
            <FilterBar/>
            <div>
                <p>botones</p>
                 <Paginas 
                     countriesByPage={countriesByPage}
                     allCountries={allCountries.length} 
                     paginas={paginas}/>
            </div>
          
            
            {currentCountries?.map((e) => {
                return (
                    <div key={e.id}>
                        <Link to={"/countries/"+e.id}>
                     <Country name={e.name} flag={e.flag} continent={e.continent}/>
                    </Link>
                    </div> 
                )
                    
                })
            }    
            
        </div>
    )
}