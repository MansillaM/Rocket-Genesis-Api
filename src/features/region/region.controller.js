const regionModel = require("../../shared/resources/db/mongodb/schemas").Region;

// GET all region
const region = async(req, res) => {
    const regions = await regionModel.find({});
  
    try {
        res.send(regions);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = 
    {
    region    
    }