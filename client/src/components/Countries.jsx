import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCounttries, getCountruByContienet, orderByName, getActivities, orderByPopulation } from "../actions";
import { Link } from 'react-router-dom';
import favicon from '../img/henry.png';
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
    const [errors, setErrors] = useState({});
    const expresionesName = /^[a-zA-ZÁ-ÿ\s]{0,40}$/;
   


    const paginas = (pageNumber) => {
        //console.log(pageNumber);
        setCurrentPage(pageNumber)
        //setNumber(pageNumber)
        pageNumber >= 2 ? setCountriesByPage(10) : setCountriesByPage(9)
    }
    const goToNextPage = () => setCurrentPage(currentPage + 1);
    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }


    useEffect(() => {
        dispatch(getCounttries());
    }, [dispatch])


    
    //filtrar por continente
    function handleFilterByContinent(e) {

        dispatch(getCountruByContienet(e.target.value))
        paginas(1)
        setOrdenado('')
       
    }
    function handleReload() {
        dispatch(getCounttries())
       
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
    //manejo de errores del input
    function handleKeyUp(e) {
        expresionesName.test(e.target.value) ? setErrors({}) :
            setErrors({ error: "Colocar mas de dos caracteres y solo letras y espacios" })
    }

    function handleReset(e) {
        e.target.value === '' ? setErrors({}) :
            setErrors({ error: 'Este campo tiene uno o mas errores' })
    }


    return (
        <>

            <section className={estilos.container}>

                <SearchBar />
                <div className={estilos.contGral}>


                    <div className={estilos.contenedorTargetas}>


                        <div >
                            <div className={estilos.contenedorFiltros}>
                                
                                <button onClick={handleReload} className="button">Resetar</button>
                               
                                    <div>

                                        <label className={estilos.label} htmlFor="filtroContinente">Filtrar por contiente:</label>
                                        <select className={estilos.select} onChange={e => handleFilterByContinent(e)} name="continent" id="filtroContinente" form="carform">
                                            <option className={estilos.option} disabled="disabled" defaultValue >--Seleccionar--</option>

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
                                        <select className={estilos.select} id="cantidadPoblacion" onChange={e => handleOrderByPopulation(e)}>
                                            <option className={estilos.option} disabled="disabled" defaultValue >--Seleccionar--</option>
                                            <option className={estilos.option} value="Ascendente">Ascendente</option>
                                            <option className={estilos.option} value="Descendete">Descendete</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={estilos.label} htmlFor="ordenAlfabetico">Orden Alfaético:</label>
                                        <select className={estilos.select} id="ordenAlfabetico" onChange={e => handleOrderCountries(e)} >
                                            <option className={estilos.option}disabled="disabled"  defaultValue>--Seleccionar--</option>
                                            <option className={estilos.option} value="AZ">A-Z</option>
                                            <option className={estilos.option} value="ZA">Z-A</option>
                                        </select>
                                    </div>
                                    <div className={estilos.relativo}>
                                        <label className={estilos.label} htmlFor="actividad">Por Actividad:</label>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                className={estilos.formInput}
                                                value={activity}
                                                onChange={handleInputChange}
                                                placeholder="Buscar actividad"
                                                name="otro"
                                                type="text"
                                                onBlur={handleReset}
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

                                {currentCountries.length !== 0 ?
                                    currentCountries?.map((e) => {
                                        return (
                                            <div key={e.id}>
                                                {
                                                    e.error ? <div className={estilos.errores} key={e.id}> <Errors /> </div>
                                                        :  <Link to={"/countries/" + e.id}> <div key={e.id} className={estilos.targeta}> <Country id={e.id} name={e.name} flag={e.flag} continent={e.region} /> </div></Link>

                                                }

                                            </div>
                                        )
                                    }) : <Loading />
                                }
                            </div>


                            <div className={estilos.paginado}>
                           
                                <Paginas
                                    currentPage={currentPage}
                                    countriesByPage={countriesByPage}
                                    allCountries={allCountries.length}
                                    paginas={paginas} 
                                    goToNextPage={goToNextPage}
                                    goToPreviousPage={goToPreviousPage}
                                    />
                                    
                            </div>

                        </section>
                    </div>
                                 
                </div>


            </section>
            <hr/>
            <footer className={estilos.footer}> <p> Powered By Hesler Dennis. | Todos los derechos reservados <img src={favicon} alt="Logo Henry" width="20px"/> Henry |</p>  
                   <p>Email: dennishesler02@gmail.com</p>             
                    </footer>                    
        </>
    )
}

