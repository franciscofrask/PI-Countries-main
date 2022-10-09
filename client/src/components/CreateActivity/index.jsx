import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createActivity, getCountries } from '../../redux/actions';
import style from './fomr.module.css'


export default function CreateActivity(){
    const dispatch = useDispatch();
    const history = useHistory();
    const allCountries = useSelector((state) => state.countries);

    function validate(data){
        var errors = {};
        if(!(/^[a-zA-Z]+$/.test(data.name)) || data.name.length < 3 || !isNaN(data.name)) errors.name = "Enter a name with more than 3 characters."
        else if((/^[a-zA-Z]+$/.test(data.name)) && data.name.length >= 3) errors.name = '';
        if(typeof data.dificculty !== 'number' || data.difficulty > 5 || data.difficulty < 1) errors.difficulty = "Difficulty must be between 1 and 5."
        if(typeof data.dificculty === 'number' && data.difficulty <= 5 && data.difficulty >= 1) errors.difficulty = '';
        if(typeof data.duration !== 'number' || data.duration <= 0) errors.duration = "Introduce a valid duration in hours."
        if(typeof data.duration === 'number' || data.duration > 0) errors.duration = ""
        if(!data.season) errors.season = "Select at least one season."
        if(data.season) errors.season = ""
        if(!data.countries) errors.countries = "Select at least one country."
        if(data.countries) errors.countries = ""
        return errors;
    };
    
    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    const [formError, setFormError] = useState({});
    const [activity, setActivity] = useState({
        name: "",
        difficulty: 0,
        duration: 0,
        season: [],
        countries: []
    });

    const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

    function handleChange(e){
        setActivity({
            ...activity,
            [e.target.name]:e.target.value,
        });
        setFormError(validate({
            ...activity,
            [e.target.name]: e.target.value
        }))
    };

    function handleSeason(e){
        setActivity({
            ...activity,
            season: activity.season.includes(e.target.value) ? [...activity.season] : [...activity.season, e.target.value]//

        })
        setFormError(validate({
            ...activity,
            season: [activity.season, e.target.value]
        }))
    };

    function handleCountries(e){
        setActivity({
            ...activity,
            countries: activity.countries.includes(e.target.value) ? [...activity.countries] : [...activity.countries, e.target.value]        
        })
        setFormError(validate({
            ...activity,
            countries: [activity.countries, e.target.value]
        }))        
    };

    function handleDelete(c){
        setActivity({
            ...activity,
            countries: activity.countries.filter( country => country !== c)
        })
    };  

    function handleSubmit(e){
        e.preventDefault();
        if(!activity.name || !(/^[a-zA-Z]+$/.test(activity.name)) || activity.name.length<3) {
            setFormError(validate({
                ...activity,
                [e.target.name]: e.target.value
            }));
        }else if(!activity.season.length){
            e.preventDefault();
            setFormError(validate({
                ...activity,
                [e.target.name]: e.target.value
            }))
        }else if(!activity.countries.length){
            e.preventDefault();
            setFormError(validate({
                ...activity,
                [e.target.name]: e.target.value
            }))
        }else if(/^\d+$/.test(parseInt(activity.difficulty)) !== true || activity.difficulty<0 || activity.difficulty>5) {
            e.preventDefault();
            setFormError(validate({
                ...activity,
                [e.target.name]: e.target.value
            }))
        }else if(/^\d+$/.test(parseInt(activity.duration)) !== true || activity.duration<0 || activity.duration>120) {
            e.preventDefault();
            setFormError(validate({
                ...activity,
                [e.target.name]: e.target.value
            }))        
        } else {
            e.preventDefault();
            dispatch(createActivity(activity))
            setActivity({
                name: "",
                difficulty: 0,
                duration: 0,
                season: [],
                countries: []
            });
            setFormError({})
            alert("Tourist activity successfully created");
        history.push('/countries');
        };
    };

    
    return (
        <>
          
        
        <Link to="/countries"key="asd"><button className={style.xButton}>Home</button></Link>
        <div className={style.activContainer}>
            <h1>Create <span>Activities</span></h1>

                    <h3>Datos</h3>
                    <form className={style.formContainer} onSubmit={(e) => handleSubmit(e)}>
                         <div>
                             <label htmlFor="name">Name: </label>
                             <input key="name" onChange={(e) => handleChange(e)} type="text" value={activity.name} name="name" placeholder="name" />
                             {formError.name && <span>{formError.name}</span>}
                         </div>
                         <div>
                             <label htmlFor="number">Difficulty: </label>
                             <input key="diffic" onChange={(e) => handleChange(e)} type="number" value={activity.difficulty} name="difficulty" placeholder="difficulty" />
                             {formError.difficulty && <span><strong>{formError.difficulty}</strong></span>}
                         </div>
                         <div>
                             <label htmlFor="number">Duration (in hours): </label>
                             <input key="durat" onChange={(e) => handleChange(e)} value={activity.duration} name="duration" placeholder="duration" />
                             {formError.duration && <span><strong>{formError.duration}</strong></span>}
                         </div>
                         <div>  
                             <label htmlFor="text">Season: </label>
                             <select onChange={(e) => handleSeason(e)} name="season">
                             <option key='select' value='select'>Select Season... </option>
                                 {seasons.map((s, index=1) => {
                                     return <option key={index+1} value={s}>{s}</option>
                                 })}
                                 {formError.season && <span>{formError.season}</span>}
                             </select>
                         </div>
                         <div>
                             <label htmlFor="text">Countries: </label>
                             <select onChange={(e) => handleCountries(e)} name="countries">
                             <option key='selectC' value='selectC'>Select Country... </option>
                                 {allCountries.map((country, index) => {
                                     return <option key={index} value={country.name}>{country.name}</option>
                                 })}
                                 {formError.countries && <span>{formError.countries}</span>}
                             </select>
                         </div>
                         <div>
                             <button className={style.subm} type="submit" >SAVE ACTIVITY</button>
                         </div>
                    </form>
               
           
            {activity.season.map(s => {
                return <div>
                    <p>{s}</p>
                    </div>
            })}
            {activity.countries.map(c => {
                return <div className={style.diCount}>
                    <p>{c}</p>
                    <button className={style.xButtno} onClick={() => handleDelete(c) }>x</button>
                    </div>
                }
            )}
        </div>
        </>
    )
}