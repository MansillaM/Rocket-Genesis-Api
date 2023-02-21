const express = require("express");
const RegionControler = require('../features/region/region.controller')
const app = express();

const registerRegionRoute = (app) => {
    app.get('/region', RegionControler.region);
}
//GET all regions
// app.get("/region", async (request, response) => {
//     const regions = await regionModel.Region.find({});
  
//     try {
//       response.send(regions);
//     } catch (error) {
//       response.status(500).send(error);
//     }
//   });

module.exports = 
    {
        registerRegionRoute
    };