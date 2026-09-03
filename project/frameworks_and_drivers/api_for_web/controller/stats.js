const { Caller } = require("./caller");
const { checkAuth } = require("../middlewares/check_auth");
const { refreshCookie } = require("../middlewares/refresh_cookie");
const {innerRateLimiterMiddleware } = require("../middlewares/inner_rate_limiter_middleware");

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
    app.get(BASIS, checkAuth, innerRateLimiterMiddleware, async (req, res) => {

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

        if (statsResource === "binomial_dist") {
            return await Caller.callBinomialDistribution(req, res);
        }

    });

    //Endpoint that accesses normal distribution
    app.post(BASIS, checkAuth, innerRateLimiterMiddleware, async (req, res) => {

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

        if (statsResource === "lin_reg") {
            return await Caller.callLinRegression(req, res);
        }

    });
}

module.exports = { statsFeatures };