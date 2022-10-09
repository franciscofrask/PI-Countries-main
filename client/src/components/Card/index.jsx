import React from "react";
import './Card.css'


export default function Card(country){
    return(
        <div className="container">
            <div className="card">
                    <img className="card-image" src={country.image} alt={country.name}/>
                <h3>{country.name}</h3>
                <h4>{country.continent}</h4>
             
            </div>
    </div>    
    )
}

