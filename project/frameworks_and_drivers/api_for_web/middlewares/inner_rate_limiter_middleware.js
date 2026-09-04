const {InnerRateLimiter} = require("../../databases/redis/rate_limit/inner_rate_limiter.js");

const innerRateLimiterMiddleware = async (req, res, next) => {

    const rateLimiter = new InnerRateLimiter(res.locals.uid);
    const signal = await rateLimiter.acceptRequest();

    //Checking if there are too many request per second
    if (!signal) {
        return res.status(429).json({
            message: "Too many intern requests"
        });
    }

    await rateLimiter.feedQueue(); //Feeding the queue with a new request
    return next();
}

module.exports = {innerRateLimiterMiddleware}