// Initial dependencies and definitions
require('dotenv').config();
const Express = require('express');
const app = Express();
const port = process.env.PORT || 3004;
const MongoManager = require('./src/shared/resources/db/mongodb/mongo-manager')
const middleWare = require('./src/shared/middleware/logger').logMiddleware

// Logger MIDDLEWARE
app.use(middleWare);

// Import routes
const HealthRoutes = require('./src/routes/health.routes');
const AgentRoutes = require('./src/routes/agents.routes')
const RegionRoute = require('./src/routes/region.routes')
const PublicRoutes = require('./src/routes/public.routes');
const AdminRoutes = require('./src/routes/admin.routes');

app.use(Express.json());

// Routers
HealthRoutes.registerHealthRoutes(app);
AgentRoutes.registerAgentRoutes(app);
RegionRoute.registerRegionRoute(app);
AdminRoutes.registerAdminRoutes(app);
PublicRoutes.registerPublicRoutes(app);

//  MongoDB connect
MongoManager.openMongoConnection();

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})