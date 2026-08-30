const { Caller } = require("./caller");
const { checkAuth } = require("../middlewares/check_auth");
const { refreshCookie } = require("../middlewares/refresh_cookie");

function statsFeatures(app) {

    /*
    IMPORTANT INFORMATION:

    This function must have a single GET endpoint that will have a query
    parameter called stats_type. Depending on the value of stats_type, a feature
    will be called from FastAPI and returned to the frontend. Just one single feature
    can be called. The code concerning how we call and lead with such feature is inside
    the clas Caller, which calls the endpoints from FastAPI.
    */

    const BASIS = "/stats";

    //Endpoint that accesses normal distribution
    app.get(BASIS, async (req, res) => {

        const uid = checkAuth(req, res); //This funciton acts as a middleware that will check if the JWT of the user is ok and will return a refreshed token if necessary.

        const statsResource = req.query.stats_type;
        
        if (statsResource === undefined) {
            return res.status(422).json({
                message: "You must define a value to stats_type in order to access a statistical resource",
                success: false
            });
        }

        refreshCookie(req, res); //Refreshing cookies before the response
        
        if (statsResource === "normal_dist") {
            return await Caller.callNormalDistribution(req, res);
        }

        if (statsResource === "poisson_dist") {
            return await Caller.callPoissonDistribution(req, res);
        }

    });

    //Endpoint that accesses normal distribution
    app.post(BASIS, async (req, res) => {

        const uid = checkAuth(req, res); //This funciton acts as a middleware that will check if the JWT of the user is ok and will return a refreshed token if necessary.
        const statsResource = req.query.stats_type;
        
        if (statsResource === undefined) {
            return res.status(422).json({
                message: "You must define a value to stats_type in order to access a statistical resource",
                success: false
            });
        }

        refreshCookie(req, res); //Refreshing cookies before the response

        if (statsResource === "poly_reg") {
            return await Caller.callPolynomialRegression(req, res);
        }

        if (statsResource === "desc") {
            return await Caller.callDescriptiveStats(req, res);
        }

    });
}

module.exports = { statsFeatures };