const {redisCnx} = require("../infra/cnx.js");

class InnerRateLimiter {

    constructor(lKey) {
        this.__lKey = `IRL-${lKey}`;
        this.__validate();
    }

    __validate() {
        if (Number(process.env.MAX_SIZE_OF_QUEUE <= Number(process.env.MAX_REQ_PER_WINDOW_TIME))) {
            throw Error("The maximum size of the queue must be bigger than the maximum number of requests in a second");
        }
    }

    async feedQueue() {

        const cnx = await redisCnx();
        await cnx.rPush(this.__lKey, String(Date.now())); //<--- It either creates the queue with the actual data or it pushes the actual data to the end of the queue
        const entireQueue = await cnx.lRange(this.__lKey, 0, -1); //<--- Entire queue
        if (entireQueue.length > Number(process.env.MAX_SIZE_OF_QUEUE)) {
            await cnx.lPop(this.__lKey); //Removing the last element (most ancient date) when the queue surpass its maximum size. It will force the queue to hold its size.
        }
        //Reseting the TTL because a new request was made
        await cnx.expire(this.__lKey, Number(process.env.TTL_OF_QUEUE_IN_SEC));

    }

    async acceptRequest() {

        const cnx = await redisCnx();
        const entireQueue = await cnx.lRange(this.__lKey, 0, -1);
        let count = 0;
        entireQueue.forEach(target => {
            if (Date.now() - Number(target) <= Number(process.env.WINDOW_TIME_IN_MS)) {
                count++; //Increment the counter by +1 if the request is inside the window of the last second
            }
        });
        if (count > Number(process.env.MAX_REQ_PER_WINDOW_TIME)) {
            return false; //More requests than the maximum quantity, so we return False
        }
        return true; //The number of request is in the correct range, so we return True, which means that the user can go to the next middleware or endpoint.

    }

    async del() {
        const cnx = await redisCnx();
        const isThere = await cnx.exists(this.__lKey);
        if (isThere === 1) {
            await cnx.del(this.__lKey);
        }
    }

}

module.exports = {InnerRateLimiter};