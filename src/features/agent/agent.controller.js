const agentModel = require("../../shared/resources/db/mongodb/schemas").Agent;

// GET All agents
const getAgents = async(req, res) => {
    const agents = await agentModel.find({});

    agents.sort(function (a, b) {
      if (a.last_name < b.last_name) {
        return -1;
      }
      if (a.last_name > b.last_name) {
        return 1;
      }
      return 0;
    });

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
    const agents = await agentModel.find({ region: region }).sort({ rating: -1 });
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
const updateAgent = async (req, res) => {
  const allowedUpdates = ['first_name', 'last_name', 'email', 'region'];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const agent = await agentModel.findById(req.params.id);

    if (!agent) {
      return res.status(404).send();
    }

    updates.forEach((update) => agent[update] = req.body[update]);

    await agent.save();
    res.send(agent);
  } catch (error) {
    res.status(500).send(error);
  }
};

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