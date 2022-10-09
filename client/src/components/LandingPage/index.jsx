import React from "react";
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage (){
    return(
        <div className="background">
            
            <h1 className="title">Mr Worldwide</h1>

            <div className="light">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <Link to={'/countries'}> Countries </Link>
            </div>
        </div>
    )
}