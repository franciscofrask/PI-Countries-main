// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { getDetails} from '../../redux/actions';
// import {useEffect} from 'react'

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetails, clearPage } from '../../redux/actions';
import style from './Details.module.css';





class Details extends React.Component {

    componentDidMount(){ //se ejecuta cuando el componente es montado
        const id=this.props.match.params.id;
        this.props.getDetails(id);
    }

    componentWillUnmount(){ // se ejecuta cuando el componente es desmontado 
        this.props.clearPage();
    }

    render(){
        return(
            <div className={style.background}>
                <div className={style.country}>
                    {
                        
                            <div className={style.card}>
                                <h1>{this.props.countryDetails.name}</h1>
                                <img className={style.img} src={this.props.countryDetails.image} alt={this.props.countryDetails.name} />
                                <p className={style.labels}>cca3 (ID): {this.props.countryDetails.id + ' '}</p>
                                <p className={style.labels}>CONTINENT: {this.props.countryDetails.continent + ' '}</p>
                                <div className={style.description}>
                                    <p>Capital: {this.props.countryDetails.capital + ' '}</p>
                                    <p>Subregion: {this.props.countryDetails.subregion + ' '}</p>
                                    <p>Area: {this.props.countryDetails.area + ' '} km²</p>
                                    <p>Population: {this.props.countryDetails.population + ' '} inhab.</p>
                                    <h4>Tourist Activities:</h4>
                                        {this.props.countryDetails.activities ?
                                        this.props.countryDetails.activities.map((a) => {
                                            return (
                                                <div className={style.activities}>
                                                <p>Name: {a.name}</p>
                                                <p>Difficulty: {a.difficulty}</p>
                                                <p>Duration: {a.duration} hours</p>
                                                <p>Seasons: {a.season.map((s) => {
                                                    return (
                                                        <span>{s}</span>
                                                    )
                                                })}
                                                </p>
                                                </div>
                                            )
                                        }) : <p>Activity not found</p>
                                        }
                                    </div>
                            </div> 
                    }
                    <Link to="/countries">
                        <button className={style.returnBtn}>Return</button>
                    </Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){ //se utiliza para seleccionar la parte de los datos del store que necesita el componente
    return{
        countryDetails: state.countryDetails,
    }
};

export default connect (mapStateToProps, {getDetails, clearPage})(Details);