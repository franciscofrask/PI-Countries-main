import { 
    ALL_COUNTRIES,
    ALL_ACTIVITIES, 
    FILTER_BY_CONTINENT,
    ORDER_BY_POPULATION,
    ORDER_BY_NAME,
    FILTER_BY_ACTIVITY,
    COUNTRY_DETAILS,
    CLEAR_PAGE,
    CREATE_ACTIVITY,
    COUNTRY_NAME,

} from "../actions";

const initialState ={
    countries: [],
    allCountries:[],
    countryDetails: {},
    activities: [],
}

function rootReducer (state= initialState, {type, payload}){
    switch (type) {
        case ALL_COUNTRIES:
            return{
                ...state,
                countries: payload,
                allCountries: payload
            }
        case FILTER_BY_CONTINENT:
            const everyCountry = state.allCountries;
            const continentFiltered = payload === 'ALL' ? everyCountry : everyCountry.filter((el) => el.continent === payload)
            return{
                ...state,
                countries: continentFiltered
            }
        
        case ORDER_BY_POPULATION:
            const populationSort = payload === "increasing" ?
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) {
                         return 1;
                    }
                    if (b.population > a.population) {
                        return -1;
                    }
                    return 0;
                    })  : 
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return -1;
                    }
                    if (b.population > a.population) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    countries: populationSort
                }

        case ORDER_BY_NAME:
            const nameSort = payload ==="ascending" ?
                state.countries.sort(function(a,b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                }) : 
                state.countries.sort(function(a, b) {
                    if(a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                countries: nameSort
            }

        case FILTER_BY_ACTIVITY:
            const totalCountries = state.allCountries;
      
            const activityFilter = payload === 'ALL' ? totalCountries: totalCountries.filter((e) => e.activities.map(c =>c.name).includes(payload));
            return{
                ...state,
                countries: activityFilter
            }

        case COUNTRY_DETAILS:
            return{
                ...state,
                countryDetails: payload
            }

        case CLEAR_PAGE:
            return{
                ...state,
                countryDetails:{}
            }
        case ALL_ACTIVITIES:
            return{
                ...state,
                activities: payload
            }
            
        case CREATE_ACTIVITY:
            return{
                ...state,
            }
        case COUNTRY_NAME:
            return{
                ...state,
                countries:payload.err ? [{Error: 'No country found'}]: payload
            }
        default:
            return state;
    }
}

export default rootReducer;