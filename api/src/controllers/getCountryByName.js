const { Country, Activity, country_activity } = require("../db");
const { Op } = require("sequelize");


const getCountryByName = async(name) => {
    try{
        const searchCountries = await Country.findAll({ 
            where: {
                name: {
                    [Op.iLike]: '%'+name+'%'  // hago la consulta de nombre  a la tabla 
                }
            },
            include: { model: Activity }
        });
        if(searchCountries){ // si existe el nombre 
            let countryDb = await searchCountries.map(el => el) //mapeo y traigo sis datos
            return countryDb;
        } else return "Country name not found."
    }catch(error){
        console.log(error);
        return error;
    }
}

module.exports = {
    getCountryByName,
}