const { loadGlobalMiddlewares } = require("../project/frameworks_and_drivers/api_for_web/middlewares/global");
const { externalEndpoints } = require("../project/frameworks_and_drivers/api_for_web/controller/external")
const { generateDatabase } = require("../project/frameworks_and_drivers/databases/mysql/infra/db_automation")
const express = require("express");

const app = express();

loadGlobalMiddlewares(app, express); //<--- Loading and activating the global middleawares
externalEndpoints(app); //<--- Loading and activating Login and Registration endpoints

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API server is running on port ${PORT}`);
    generateDatabase(); //<--- Creating the database and tables if they do not exist
}); //<--- Putting the server to work