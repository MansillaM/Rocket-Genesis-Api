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
  const { name } = req.body;
  const regionExists = await regionModel.findOne({ name });
  if (regionExists) {
    return res.status(400).send('Region already exists');
  }
  
  // Find the top three agents in the region
  const topAgents = await agentModel.find({ region: name })
    .sort({ sales: -1 })
    .limit(3);
  
  // Create the region
  const region = new regionModel({
    name,
    top_agents: topAgents.map(agent => agent.id)
  });
  
  // Create the manager agent for the region
  const manager = new agentModel({
    first_name: `${name} Manager`,
    last_name: 'Smith',
    email: `${name.toLowerCase()}_manager@example.com`,
    region: name,
    manager: null,
    total_sales: 0,
    sales: 0
  });
  await manager.save();
  
  // Update the region's total_sales
  const agentsInRegion = await agentModel.find({ region: name });
  const totalSales = agentsInRegion.reduce((acc, agent) => acc + agent.sales, 0);
  region.total_sales = totalSales;
  
  // Save the region and return it in the response
  await region.save();
  res.send(region);
};


module.exports = 
    {
    region,
    regionByRegion,
    createRegion    
    }