const {ExternalRateLimiter} = require("../../databases/redis/rate_limit/external_rate_limiter.js");

const extRateLimiterMiddleware = async (req, res, next) => {

    const extRateLimiter = new ExternalRateLimiter(req.body.email);
    const signal = await extRateLimiter.isApproved();
    
    //If not approved, return 429
    if (!signal) {
        return res.status(429).json({
            message: "Too many request. Try again later!"
        });
    }

    return next();

}

module.exports = {extRateLimiterMiddleware}