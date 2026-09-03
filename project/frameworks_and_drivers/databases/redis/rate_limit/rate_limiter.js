class RateLimiter {

    async del(key) {
        const cnx = await redisCnx();
        const isThere = await cnx.exists(key);
        if (isThere === 1) {
            await cnx.del(key);
        }
    }

}

module.exports = {RateLimiter}