// Initial dependencies and definitions
require('dotenv').config();
const Express = require('express');
const app = Express();
const port = process.env.PORT || 3004;
const MongoManager = require('./src/shared/resources/db/mongodb/mongo-manager')
// const agentRouter = require('./src/routes/agents.routes')

// Import routes
const HealthRoutes = require('./src/routes/health.routes');
const AgentRoutes = require('./src/routes/agents.routes')
const RegionRoute = require('./src/routes/region.routes')

app.use(Express.json());

HealthRoutes.registerHealthRoutes(app);
AgentRoutes.registerAgentRoutes(app);
RegionRoute.registerRegionRoute(app);

//Route for agent method
// app.use(agentRouter)

//MongoDB connect
MongoManager.openMongoConnection();

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})