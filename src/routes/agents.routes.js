const express = require("express");
const app = express();
const AgentController = require('../features/agent/agent.controller');
const authMiddleware = require('../shared/middleware/authentication').isAuth


const registerAgentRoutes = (app) => {

  app.get('/agents', authMiddleware, AgentController.getAgents);  

  app.get('/agents-by-region', AgentController.agentByRegion);

  app.post("/agent-create", AgentController.createAgent);

  app.patch("/agent-update-info/:id", AgentController.updateAgent);

  app.delete("/agent-delete/:id", AgentController.deleteAgent);

}

module.exports = 
{
  app,
  registerAgentRoutes
};