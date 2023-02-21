const express = require("express");
// const agentModel = require("../shared/resources/db/mongodb/schemas");
const app = express();
const AgentController = require('../features/agent/agent.controller');

const registerAgentRoutes = (app) => {
  app.get('/agents', AgentController.getAgents);  

  app.get('/agents-by-region', AgentController.agentByRegion);

  app.post("/agent-create", AgentController.createAgent);

  app.patch("/agent-update-info/:id", AgentController.updateAgent);

  app.delete("/agent-delete/:id", AgentController.deleteAgent);
}

//GET all agents
// app.get("/agents", async (request, response) => {
//   const agents = await agentModel.Agent.find({});

//   try {
//     response.send(agents);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

//GET agent from region
// app.get("/agents-by-region", async (request, response) => {
//   const region = request.query.region; 
//   try {
//     const agents = await agentModel.Agent.find({ region: region });
//     if (agents.length === 0) {
//       response.status(404).send("No agents found for this region");
//     } else {
//       response.send(agents);
//     }
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

//POST method to create a new agent
// app.post("/agent-create", async (request, response) => {
//   const agents = new agentModel.Agent(request.body);

//   try {
//     await agents.save();
//     response.send(agents);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

//PATCH method to update a specific agent
// app.patch("/agent-update-info/:id", async (request, response) => {
//   try {
//     await agentModel.Agent.findByIdAndUpdate(request.params.id, request.body);
//     await agentModel.Agent.save();
//     response.send(agents);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

//DELETE method to delete an agent
// app.delete("/agent-delete/:id", async (request, response) => {
//   try {
//     const agents = await agentModel.Agent.findByIdAndDelete(request.params.id);

//     if (!agents) response.status(404).send("No item found");
//     response.status(200).send();
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

module.exports = 
{
  app,
  registerAgentRoutes
};