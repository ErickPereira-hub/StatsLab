const cors = require("cors");
const cookieHandler = require("cookie-parser");
const morgan = require("morgan");

function loadGlobalMiddlewares(app, express) {

    app.use(express.json()); //<--- Allows the reception of JSON in the body

    app.use(cookieHandler()); //<--- Allows the reception of cookies

    app.use(cors({
        credentials: true,
        origin: "http://127.0.0.1:5500"
    })); //<--- Breaking CORS policy error in the frontend.

    app.use(morgan()); //<--- Register the requests in the terminal.

}

module.exports = { loadGlobalMiddlewares };