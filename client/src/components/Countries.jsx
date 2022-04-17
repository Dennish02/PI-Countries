import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCounttries, getCountruByContienet, orderByName, getActivities, orderByPopulation } from "../actions";
import { Link } from 'react-router-dom';

import Country from "./Country";
import Paginas from './Paginas';
import SearchBar from "./SearchBar";
import Errors from "./Errors";


export default function Countries() {
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const [currentPage, setCurrentPage] = useState(1);//primera pagina
    const [countriesByPage, setCountriesByPage] = useState(9);///paises por pagina
    const indexOfLastCountrie = currentPage * countriesByPage;
    const indexOfFirstCountry = indexOfLastCountrie - countriesByPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountrie);
    const [activity, setActivity] = useState('')
    const [ordenado, setOrdenado] = useState('')
    const [errores, setErrores] = useState({});
    const expresionesName = /^[a-zA-ZÁ-ÿ\s]{2,40}$/    

    const paginas = (pageNumber) => {

        if ( pageNumber !== 1 ) {
            setCountriesByPage(10)
        }else{
            setCountriesByPage(9)
        }
        setCurrentPage(pageNumber)
    }
    useEffect(() => {
        dispatch(getCounttries());
    }, [dispatch])
    
    
    function handleKetUp(e){
        if(expresionesName.test(e.target.value)){
            setErrores({})
        }else{
           setErrores({error : "Colocar mas de dos caracteres y solo letras y espacios"}) 
        }
    }


    //filtrar por continente
    function handleFilterByContinent(e) {
        e.preventDefault();
        dispatch(getCountruByContienet(e.target.value))

    }
    //buscar por actividad
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getActivities(activity))

        setActivity('')
    }

    function handleInputChange(e) {
        const { target } = e;
        setActivity(target.value)
    }
    //orden por nombre
    function handleOrderCountries(e) {
        dispatch(orderByName(e.target.value))
        setOrdenado(`Ordenado por ${e.target.value}`)
    }
    //orden por poblacion
    function handleOrderByPopulation(e) {
        dispatch(orderByPopulation(e.target.value))
        setOrdenado(`Ordenado por ${e.target.value}`)
    }


    return (
        <div>
            <Link to='/activity'>Crear actividad</Link>
            <h1>Api Países</h1>
            <SearchBar
                errores={errores}
                handleKetUp={handleKetUp} 
            />
            <div>
                <div>

                    <label htmlFor="filtroContinente">filtrar por contiente:</label>
                    <select onChange={e => handleFilterByContinent(e)} name="continent" id="filtroContinente" form="carform">
                        <option disabled selected="selected" >--Seleccionar--</option>
                        <option value="Todos">Todos</option>
                        <option value="South America">South America</option>
                        <option value="North America">North America</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="Africa">Africa</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Antarctica">Antarctica</option>
                    </select>

                </div>
                <div>

                    <label htmlFor="cantidadPoblacion">Cantidad de Poblacion:</label>
                    <select id="cantidadPoblacion" onChange={e => handleOrderByPopulation(e)}>
                        <option disabled selected="selected" >--Seleccionar--</option>
                        <option value="def">Default</option>
                        <option value="asc">Ascendente</option>
                        <option value="des">Descendete</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="ordenAlfabetico">Orden Alfaético:</label>
                    <select id="ordenAlfabetico" onChange={e => handleOrderCountries(e)} >

                        <option disabled selected="selected" value="def">Default</option>
                        <option value="asc">A-Z</option>
                        <option value="des">Z-A</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="actividad">Por Actividad:</label>
                    <form onSubmit={handleSubmit}>
                        <input value={activity} onChange={handleInputChange} placeholder="buscar actividad" type="text" />
                        <button type="submit">Buscar</button>
                    </form>


                </div>


            </div>
            <div>
                <Paginas
                    setCurrentPage={setCurrentPage}
                    countriesByPage={countriesByPage}
                    allCountries={allCountries.length}
                    paginas={paginas} />
            </div>


            {currentCountries?.map((e) => {
                return (
                    <div key={e.id}>
                       
                        {
                        e.name ? <Link to={"/countries/" + e.id}> <Country name={e.name} flag={e.flag} continent={e.continent} /></Link>
                          : 
                                <Errors name={e.name} flag={e.flag} continent={e.continent} />
                            
                           }
            
                    </div>
                )

            })
            }

        </div>
    )
}