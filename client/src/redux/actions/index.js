import axios from 'axios';
export const ALL_COUNTRIES = 'ALL_COUNTRIES';
export const ALL_ACTIVITIES = 'ALL_ACTIVITIES';
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const CREATE_ACTIVITY ='CREATE_ACTIVITY';
export const COUNTRY_DETAILS = 'COUNTRY_DETAILS';
export const CLEAR_PAGE = 'CLEAR_PAGE';
export const COUNTRY_NAME = 'COUNTRY_NAME'

// try {
//     if (name) {
//         let countryByname = await axios.get(`http://localhost:3001/countries?name=${name}`);
//         return dispatch({
//             type: ALL_COUNTRIES,
//             payload: countryByname.data
//         })
//     }else{
//         let allCountries = await axios.get('http://localhost:3001/countries');
//         return dispatch({
//             type: ALL_COUNTRIES,
//             payload: allCountries.data
//         })
//     }
//    } catch (error) {
//     console.log(error)
//     return error;
//    }


export function getCountries(){
    return async function(dispatch){
        let allCountries = await axios.get('/countries');
         return dispatch({
             type: ALL_COUNTRIES,
             payload: allCountries.data
        })
    }
};

export const getCountryByName = (name) =>{
    return async (dispatch)=>{
        try {
            let countryByname = await axios.get(`/countries?name=${name}`);
         return dispatch({
             type: COUNTRY_NAME ,
             payload: countryByname.data
         })
        } catch (error) {

            return error;
        }
    }
}

export const getDetails = (id) =>{
    return async (dispatch)=>{
        try {
            let countryById = await axios.get('/countries/' + id)

            dispatch({
                type: COUNTRY_DETAILS,
                payload: countryById.data
            })
            
        } catch (error) {
            console.log(error)
            return error;
        }
    }
}

export const filterContinent = (payload) =>{
    console.log(payload)
    return{
        type:FILTER_BY_CONTINENT,
        payload
    }
};

export const orderByName = (payload) =>{
   return{
        type: ORDER_BY_NAME,
        payload
   }
}

export const orderByPopulation = (payload) =>{
    console.log(payload)
    return{
        type: ORDER_BY_POPULATION,
        payload
    }
}

export const filterActivity = (payload) =>{
    return{
        type: FILTER_BY_ACTIVITY,
        payload
    }
}

export const clearPage = (payload) =>{
    return{
        type: CLEAR_PAGE,
        payload
    }
}

export const createActivity = ({name, difficulty, duration, season, countries })=>{
    return async (dispatch) =>{
        try {
            let actCreated = await axios.post('/activity',{name, difficulty, duration, season, countries });
            dispatch({
                type:CREATE_ACTIVITY,
                payload:actCreated
            })
        } catch (error) {
            console.log(error);
            return error
        }
    }
}

export const getActivities = () =>{
    return async (dispatch) =>{
        await axios.get('/activities')
        .then(response => dispatch({type: ALL_ACTIVITIES, payload: response.data}))
        .catch(error => console.log(error));
    }
    
}
