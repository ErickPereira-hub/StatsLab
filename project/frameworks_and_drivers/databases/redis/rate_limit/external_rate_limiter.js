const {redisCnx} = require("../infra/cnx.js");
const {RateLimiter} = require("./rate_limiter.js");

class ExternalRateLimiter extends RateLimiter {

    constructor(email) {
        super();
        this.__key = `ERL-${email}`;
    }

    async isApproved() {

        const cnx = await redisCnx();
        const isThere = await cnx.exists(this.__key);
        
        if (isThere === 0) {
            await cnx.set(this.__key, "0", {EX: Number(process.env.TTL_LOGIN_CONTAINER_IN_SEC)});
        }
        console.log(await cnx.get(this.__key));
        if (Number(await cnx.get(this.__key)) >= Number(process.env.MAX_CAPACITY_OF_LOGIN_CONTAINER_PER_HOUR)) {
            return false;
        }
    
        await cnx.incr(this.__key);
        return true;
    
    }

}

module.exports = {ExternalRateLimiter}