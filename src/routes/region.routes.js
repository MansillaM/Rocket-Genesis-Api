const express = require("express");
const app = express();
const RegionControler = require('../features/region/region.controller')


const registerRegionRoute = (app) => {

    app.get('/region-all', RegionControler.region);

    app.get('/region', RegionControler.regionByRegion);

    app.post('region-create', RegionControler.createRegion);

}

module.exports = 
    {
        app,
        registerRegionRoute
    };