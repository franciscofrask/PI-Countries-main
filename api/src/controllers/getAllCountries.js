const axios = require("axios");
const { Country, Activity, country_activity } = require("../db");

const getApiCountries = async () => {
   const apiInfo = await axios.get("https://restcountries.com/v3/all"); //llamdo a la api
   const infoCountries = apiInfo.data.map(country => {   //tomo los datos que necesito de la api
      return{
         id: country.cca3,
         name: country.name.official,
         image: country.flags[0],
         continent: country.continents[0],
         capital: country.capital ? country.capital[0] : "Capital not found.",
         subregion: country.subregion,
         area: country.area,
         population: country.population,
      }
   });
   return infoCountries;
}

//todos los paises en mi db
const getAllCountries = async () => {
   const apiData = await getApiCountries(); //obtengo mis datos de la api
   try{
      const alreadySaved = await Country.findAll(); // hago una consulta a la tabla
      if(!alreadySaved.length) await Country.bulkCreate(apiData); //BulkCereate crea el objeto y lo envía a la base de datos al mismo tiempo.
   }catch(error){
      return error;
   }
   try{
      const allCountries = await Country.findAll({ //traigo mi informacio d ela db
         order:[
            ['name', 'ASC']
         ],
         include: { model: Activity, //me traigo el modelo activity para poder crearlas luego
         attributes: ['name'] // me traigo en name del modelo activity
         },
      });
      return allCountries; 
   }catch(error){
      return error;
   }  
};

module.exports = {
   getAllCountries,
   getApiCountries
}