import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterContinent, getCountries, orderByPopulation, orderByName, filterActivity, getActivities, clearPage} from "../../redux/actions";
import Card from "../Card/index";
import Paginado from "../Pagination/Paginado";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import style from './Home.module.css'

export default function Home (){

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries); // traigo los paises de reducer 
    const allActivities = useSelector((state) => state.activities) // traigo las actividades
    const [currentPage, setCurrentPage] = useState(1); // guardo en una constante la pagina actual y la setei en 1 
    const [order, setOrder] = useState('');
    const [countriesPerPage] = useState(9); //cantidad de personajes por pagina
    const [filters, setFilters] = useState('') //seteo los filtros
    const indexOfLastCountry = currentPage * countriesPerPage;  // 9
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; //1
    const currentCountry = allCountries.slice(indexOfFirstCountry, indexOfLastCountry); //paises en cada pagina , slice divide el arreglo 1/9 

    const paginado = (pageNumber) =>{ //seteo la pagina en el numero de la pagina 
        setCurrentPage(pageNumber);  
    }

    useEffect (() =>{
        dispatch(getCountries());
    }, [dispatch]);

    useEffect (()=>{
        dispatch(getActivities());
        
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries())
    }

    function handleFilterContinent(e){
        e.preventDefault()
        dispatch(filterContinent(e.target.value));
        setCurrentPage(1);
    }

    function nameOrder(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1); // setea la pagina a 1
        setOrder(`${e.target.value} order`) //renderiza el estado
    }

    function populationOrder(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1);
        setOrder(`${e.target.value} order`)
    }
    function handleFilterActivity(e){
        e.preventDefault()
        dispatch(filterActivity(e.target.value));
        setCurrentPage(1);
        setFilters(`${e.target.value} filter`)
       
    };
    

    return(
        <div className={style.container}>
            <div>
                <NavBar setCurrentPage={setCurrentPage}/>
            </div>
            <h1>Countries</h1>


            <div key="filter" className={style.allSelect}>
                <select className={style.selects} onChange={(e) => nameOrder(e)}>
                    <option value="OrderName" >Order By Name...</option>
                    <option value="ascending">A-Z</option>
                    <option value="descending">Z-A</option>
                </select>
                <select className={style.selects} onChange={(e) => populationOrder(e)}>
                    <option value="OrderName" >Order by population</option>
                    <option key={"increasing"} value="increasing">Smaller to bigger</option>
                    <option key={"decreasing"} value="decreasing">Bigger to smaller</option>
                </select>
                <select className={style.selects} onChange={(e) => {handleFilterContinent(e)}}>
                    <option key="continent" value="ALL">Filter by continent...</option>
                    <option key="Africa" value="Africa">Africa</option>
                    <option key="Antarctica" value="Antarctica">Antarctica</option>
                    <option key="Asia" value="Asia">Asia</option>
                    <option key="Europe" value="Europe">Europe</option>
                    <option key="North America" value="North America">North America</option>
                    <option key="Oceania" value="Oceania">Oceania</option>
                    <option key="South America" value="South America">South America</option>
                </select>
                <select className={style.selects} onChange={(e) => {handleFilterActivity(e)}}>
                    <option key="activity" value="All" onClick={(e)=>{handleClick(e)}}>Filter by activity...</option>
                    { allActivities.length > 0 ? allActivities.map(activity => (
                        <option >{activity.name}</option>
                    )) :  <option disabled>No activities Created</option>
                   
                }
                </select>
                <span className={style.selects} ><a href="4" className={style.reload} onClick={e=>{handleClick(e)}}>Reload</a></span>
            </div>
            
            <div className={style.cardsContainer}>
                {currentCountry.length > 0 ?(currentCountry.map((country) => {

                    return(

                        country.Error ?
                         <h1>No se encontro el pais</h1>   :
                       <article key={country.id}>
                        <Link className={style.anchor} to={'/details/'+ country.id}>
                            <Card key={country.id} name={country.name} image={country.image} continent={country.continent}/>
                        </Link>
                     
                  </article>
                    )

                })):(
                    <>
                        <h4>Loading...</h4>
                    </>
                )}
            </div>
                    <div className={style.pagination}><Paginado  countriesPerPage={countriesPerPage} allCountries={allCountries.length} paginado = {paginado}/></div>
        </div>
    )

}