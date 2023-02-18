// Initial dependencies and definitions
require('dotenv').config();
const Express = require('express');
const app = Express();
const port = process.env.PORT || 3004;
const MongoManager = require('./src/shared/resources/db/mongodb/mongo-manager')

// Import routes
const HealthRoutes = require('./src/routes/health.routes');


app.use(Express.json());

HealthRoutes.registerHealthRoutes(app);

//MongoDB connect
MongoManager.openMongoConnection();

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})