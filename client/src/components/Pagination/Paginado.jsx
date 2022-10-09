import React from "react";
import styles from '../Pagination/Pagination.module.css'
export default function Paginado ({countriesPerPage, allCountries, paginado}){

    const pageNumber = [];

    for (let i = 1; i < Math.ceil(allCountries/countriesPerPage) ; i++) { //ceil redondea 
        pageNumber.push(i)
        
    }
    return(
        <nav className={styles.container}>
            <ul className={styles.pagination}>
                {pageNumber.map(number => (
                  <li className={styles.paginado}   key={number}>  <button className={styles.button} onClick={() => paginado(number)}>{number}</button> </li>
                ))}
            </ul>
        </nav>
    )
}