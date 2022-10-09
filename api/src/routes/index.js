"use strict";
const axios = require("axios");

const { Country, Activity, country_activity } = require("../db");
const { getAllCountries } = require("../controllers/getAllCountries");
const { getCountryByName } = require("../controllers/getCountryByName");
const { getCountryById } = require("../controllers/getCountryById");
const { getAllActivities } = require("../controllers/getAllActivities");

const Router = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/countries/:id", async (req, res, next) => {
    const { id } = req.params;
    try{
        const countById = await getCountryById(id);
        res.send(countById)
    }catch(error){
        next(error);
    }
});

router.get("/countries", async (req, res, next) => {
    const { name } = req.query;
    if(name){
        try{
            const countByName = await getCountryByName(name);
            countByName.length !==0 ? res.send(countByName) : res.json({err:'No existe'})
            
        }catch(error){
            next(error);
        }
    }else if(!name){
        try{
            const countries = await getAllCountries();
            res.send(countries);
            
        }catch(error){
            next(error)
        }    
    }
});

router.get("/activities", async (req, res, next) => {
    try{
        const allAct = await getAllActivities();
        res.send(allAct);
    }catch(error){
        next(error)
    }
});

router.post("/activity", async (req, res, next) => {
    const { name, difficulty, duration, season, countries } = req.body;
    try{
        const actCreated = await Activity.create({ // creo una nueva entrada 
            name,
            difficulty,
            duration,
            season,
        })
        for (let i=0; i<countries.length; i++){ 
            const countryActivity = await Country.findOne({
                where: { name: countries[i] }
            })
            actCreated.addCountry(countryActivity);
        }
        res.send(actCreated);
    }catch(error){
        next(error);
    }
});


module.exports = router;
