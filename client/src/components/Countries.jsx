import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCounttries, getCountruByContienet, orderByName, getActivities, orderByPopulation } from "../actions";
import { Link } from 'react-router-dom';

import Country from "./Country";
import Paginas from './Paginas';
import SearchBar from "./SearchBar";
import Errors from "./Errors";
import Loading from "./Loading";
import estilos from '../styles/Countries.module.css';

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
    const [errors, setErrors] = useState({});
    const expresionesName = /^[a-zA-ZÁ-ÿ\s]{2,40}$/;

   const paginas = (pageNumber)=>{
        setCurrentPage(pageNumber)
        if(pageNumber >= 2){
            setCountriesByPage(10)
            console.log('no')
        }
        else{
            setCountriesByPage(9)
            console.log('si')
        }
    }
    useEffect(() => {
        dispatch(getCounttries());
    }, [dispatch])


    function handleKetUp(e) {
        if (expresionesName.test(e.target.value)) {
            setErrores({})
        } else {
            setErrores({ error: "Colocar mas de dos caracteres y solo letras y espacios" })
        }
    }


    //filtrar por continente
    function handleFilterByContinent(e) {
        
        dispatch(getCountruByContienet(e.target.value))
        paginas(1)
        setOrdenado('')
    }
    //buscar por actividad
    function handleSubmit(e) {
        e.preventDefault();
        if (activity !== '') {
            dispatch(getActivities(activity))
            setCurrentPage(1)
            setActivity('')
        } else {
            alert('Debes escribir una actividad')
        }

    }

    function handleInputChange(e) {
        const { target } = e;
        setActivity(target.value)
    }
    //orden por nombre
    function handleOrderCountries(e) {
        dispatch(orderByName(e.target.value))
        setOrdenado(`Ordenado por ${e.target.value}`)
        paginas(1)
    }
    //orden por poblacion
    function handleOrderByPopulation(e) {

        dispatch(orderByPopulation(e.target.value))
        setOrdenado(`Ordenado por ${e.target.value}`)
        paginas(1)

    }
    //validad buscar actividad
    function handleKeyUp(e) {
        if (expresionesName.test(e.target.value)) {
            setErrors({})
        } else {
            setErrors({ error: "Colocar mas de dos caracteres y solo letras y espacios" })
        }
    }

    return (
        <>

            <section className={estilos.container}>
                
                <SearchBar
                        errores={errores}
                        handleKetUp={handleKetUp}
                    />

               
                <div>

                   
                    <div className={estilos.contenedorTargetas}>


                        <div >
                            <div className={estilos.contenedorFiltros}>
                                <div>

                                    <label className={estilos.label} htmlFor="filtroContinente">Filtrar por contiente:</label>
                                    <select onChange={e => handleFilterByContinent(e)} name="continent" id="filtroContinente" form="carform">
                                        <option className={estilos.option} disabled selected="selected" >--Seleccionar--</option>
                                        <option className={estilos.option} value="Todos">Todos</option>
                                        <option className={estilos.option} value="Americas">Americas</option>
                                        <option className={estilos.option} value="Europe">Europe</option>
                                        <option className={estilos.option} value="Asia">Asia</option>
                                        <option className={estilos.option} value="Africa">Africa</option>
                                        <option className={estilos.option} value="Oceania">Oceania</option>
                                        <option className={estilos.option} value="Antarctic">Antarctica</option>
                                    </select>

                                </div>
                                <div>

                                    <label className={estilos.label} htmlFor="cantidadPoblacion">Cantidad de Poblacion:</label>
                                    <select id="cantidadPoblacion" onChange={e => handleOrderByPopulation(e)}>
                                        <option className={estilos.option} disabled selected="selected" >--Seleccionar--</option>
                                        <option className={estilos.option} value="Ascendentesc">Ascendente</option>
                                        <option className={estilos.option} value="Descendete">Descendete</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={estilos.label} htmlFor="ordenAlfabetico">Orden Alfaético:</label>
                                    <select id="ordenAlfabetico" onChange={e => handleOrderCountries(e)} >
                                        <option className={estilos.option} disabled selected="selected">--Seleccionar--</option>
                                        <option className={estilos.option} value="AZ">A-Z</option>
                                        <option className={estilos.option} value="ZA">Z-A</option>
                                    </select>
                                </div>
                                <div className={estilos.relativo}>
                                    <label className={estilos.label} htmlFor="actividad">Por Actividad:</label>
                                    <form   onSubmit={handleSubmit}>
                                        <input
                                            className={estilos.formInput}
                                            value={activity}
                                            onChange={handleInputChange}
                                            placeholder="Buscar actividad"
                                            type="text"
                                            onKeyUp={handleKeyUp}

                                        />
                                        <button className="button" type="submit">Buscar</button>
                                    </form>
                                    <small className={estilos.error}>
                                        {errors && (
                                           <>{errors.error}</>
                                        )}
                                    </small>

                                </div>


                            </div>
                        </div>
                        <section className={estilos.section}>
                        <h2>{ordenado}</h2>
                            <div className={estilos.contenedorTargeta}>
                                
                            {currentCountries?.map((e) => {
                                return (
                                    <div key={e.id} className="targeta">

                                        <div >

                                            {
                                                e.error ? <Errors />
                                                    : <Link to={"/countries/" + e.id}> <Country id={e.id} name={e.name} flag={e.flag} continent={e.region} /> </Link>

                                            }
                                        </div>
                                    </div>
                                )
                            })}          
                            </div>
                           
                            
                            <div className={estilos.paginado}>
                                <Paginas
                                    
                                    countriesByPage={countriesByPage}
                                    allCountries={allCountries.length}
                                    paginas={paginas} />
                            </div>
                            
                        </section>
                    </div>

                </div>


            </section> 
        
        </>
    )
}

