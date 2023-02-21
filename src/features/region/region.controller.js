const regionModel = require("../../shared/resources/db/mongodb/schemas").Region;

// GET All region
const region = async(req, res) => {
    const regions = await regionModel.find({});
  
    try {
        res.send(regions);
    } catch (error) {
        res.status(500).send(error);
    }
}

// GET Region by region
const regionByRegion = async(req, res) => {
    const region = req.query.region;
  try {
    const regions = await regionModel.find({ region: region });
    if (regions.length === 0) {
      res.status(404).send("No regions found!");
    } else {
      res.send(regions);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// POST to create regionnal stats
const createRegion = async(req, res) => {
    const regions = new regionModel(req.body);

  try {
    await regions.save();
    res.send(regions);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = 
    {
    region,
    regionByRegion,
    createRegion    
    }