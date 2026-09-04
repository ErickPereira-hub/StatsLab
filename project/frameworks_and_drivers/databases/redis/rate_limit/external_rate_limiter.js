const {redisCnx} = require("../infra/cnx.js");

class ExternalRateLimiter {

    constructor(email) {
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

    async del() {
        const cnx = await redisCnx();
        const isThere = await cnx.exists(this.__key);
        if (isThere === 1) {
            await cnx.del(this.__key);
        }
    }

}

module.exports = {ExternalRateLimiter}