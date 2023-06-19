const regionModel = require("../../shared/resources/db/mongodb/schemas").Region;
const agentModel = require("../../shared/resources/db/mongodb/schemas").Agent;
const mongoose = require('mongoose');

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
const createRegion = async (req, res) => {
  const { name } = req.body;

  // Check if the region already exists
  const regionExists = await regionModel.findOne({ region: name });
  if (regionExists) {
    return res.status(400).send('Region already exists');
  }

  // Find the top three agents in the region
  const topAgents = await agentModel.find({ region: name }).sort({ sales: -1 }).limit(3);
  console.log(topAgents)

    
    // Create 4 new agents and use them as managers
    const managerAgents = [];
    
    for (const regionName of ['north', 'east', 'south', 'west']) {
      const manager = new agentModel({
        _id: new mongoose.Types.ObjectId(),
        first_name: 'Manager',
        last_name: regionName,
        email: `${regionName.toLowerCase()}@example.com`,
        region: regionName,
        fee: 0,
        rating: 0,
        sales: 0
      });
      
      await manager.save();
      managerAgents.push(manager);
    }
    
  // region.manager = managerAgents.find(agent => agent.region === name);
  
  // Update the region's total_sales
  const agentsInRegion = await agentModel.find({ region: name });
  const totalSales = agentsInRegion.reduce((acc, agent) => acc + agent.sales, 0);
  // region.total_sales = totalSales;
  
  // Create the region
  const region = new regionModel({
    _id: new mongoose.Types.ObjectId(),
    region: name,
    address: "Montreal",
    total_sales: totalSales,
    manager: managerAgents,
    top_agents: topAgents
  });

  // Save the region and return it in the response
  await region.save();
  res.send(region);
};

// const getAllStars = asyncWrapper( async (req, res) => {
//   const north_region = await Region.find({ region: 'north' })
//   const south_region = await Region.find({ region: 'south' })
//   const east_region = await Region.find({ region: 'east' })
//   res.status(200).json({ 
//       region1: 'north',
//       topAgent_North: north_region[0].top_agents[0],
//       region2: 'east',
//       topAgent_East: east_region[0].top_agents[0],
//       region3: 'south',
//       topAgent_South: south_region[0].top_agents[0]
//   })
// })


module.exports = 
    {
    region,
    regionByRegion,
    createRegion,
    // getAllStars    
    }