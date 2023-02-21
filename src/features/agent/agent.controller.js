const agentModel = require("../../shared/resources/db/mongodb/schemas").Agent;

// GET All agents
const getAgents = async(req, res) => {
    const agents = await agentModel.find({});

  try {
    res.send(agents);
  } catch (error) {
    res.status(500).send(error);
  }
}

// GET Agents by region
const agentByRegion = async(req, res) => {
  const region = req.query.region;
  try {
    const agents = await agentModel.find({ region: region });
    if (agents.length === 0) {
      res.status(404).send("No agents found for this region");
    } else {
      res.send(agents);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// POST Method to create a new agent
const createAgent = async(req, res) => {
  const agents = new agentModel(req.body);

  try {
    await agents.save();
    res.send(agents);
  } catch (error) {
    res.status(500).send(error);
  }
}

// PATCH Method to update a specific agent
const updateAgent = async(req, res) => {
  try {
    await agentModel.findByIdAndUpdate(req.params.id, req.body);
    await agentModel.save();
    res.send(agents);
  } catch (error) {
    res.status(500).send(error);
  }
}

// DELETE Method to delete an agent
const deleteAgent = async(req, res) => {
  try {
    const agents = await agentModel.findByIdAndDelete(req.params.id);

    if (!agents) res.status(404).send("No item found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
}


module.exports = 
  {
    getAgents,
    agentByRegion,
    createAgent,
    updateAgent,
    deleteAgent
  }