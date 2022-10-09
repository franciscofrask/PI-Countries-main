import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { getCountryByName } from "../../redux/actions";
import styles from './Nav.module.css'

export default function NavBar({setCurrentPage}){

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleChange(e){
        e.preventDefault();
        setName(e.target.value);//toma el valor del inout
        setCurrentPage(1);
        
    }

    function handleSubmit(e){
        e.preventDefault()
        name.length > 0 ?  dispatch(getCountryByName(name)): console.log("vacio")
        setName('');
    }

 

    return(
        <nav className={styles.container}>
           <h2 className={styles.h2}>Where in the world</h2>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <div className={styles.search}>
                    <label htmlFor="country">
                       Search: {" "}
                    </label>
                   
                  
                    <input type="text" id="country" placeholder="Search by name country..." onChange={(e) => {handleChange(e)}} /><button type="submit" onClick={(e) =>{handleSubmit(e)}}>Search</button>
                </div>
                
            </form>
            <ul>
                <Link to={'/activity'}><button>Create Tourist Activity</button></Link>
            </ul>
        </nav>
    )
}