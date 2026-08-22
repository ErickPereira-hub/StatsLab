const cookieHandler = require("cookie-parser");

function loadGlobalMiddlewares(app, express) {

    app.use(express.json()); //<--- Allows the reception of JSON in the body

    app.use(cookieHandler()); //<--- Allows the reception of cookies

}

module.exports = { loadGlobalMiddlewares };