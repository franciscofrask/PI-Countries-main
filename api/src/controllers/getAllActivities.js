const axios = require("axios");
const { Country, Activity, country_activity } = require("../db");

const getAllActivities = async () => {
    try{
        const allActivities = await Activity.findAll({
           include: { model: Country } // le agrego el modelo country a activity
        });
        return allActivities;
    }catch(error){
       
        return error;
    }  
};

module.exports = {
    getAllActivities,
};