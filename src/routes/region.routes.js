const express = require("express");
const app = express();
const RegionControler = require('../features/region/region.controller')
const authMiddleware = require('../shared/middleware/authentication').isAuth


const registerRegionRoute = (app) => {

    app.get('/region-all', authMiddleware, RegionControler.region);

    app.get('/region', authMiddleware, RegionControler.regionByRegion);

    app.post('/region-create', RegionControler.createRegion);

    // app.get('/all-stars', RegionControler.getAllStars)

}

module.exports = 
    {
        app,
        registerRegionRoute
    };