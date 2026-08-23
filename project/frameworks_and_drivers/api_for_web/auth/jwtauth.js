const jwt = require("jsonwebtoken");

class jwtCycle {

    constructor() {
        this._skey = process.env.JWT_SECRET_KEY;
        this._ttl = Number(process.env.JWT_TTL);
        this._maxRefreshTimeWindow = Number(process.env.MAX_REFRESH_TIME_WINDOW);
    }

    generateJWT(id) {

        const token = jwt.sign(
            {"id" : id},
            this._skey,
            { expiresIn : this._ttl}
        );

        return token;
    }

    extractPayload(token) {

        let pld; //<--- Will be our payload

        try {
            pld = jwt.verify(token, this._skey);
        } catch(err) {
            //<--- Undefined as the payload will say that an error happened, like secret keys doesn't match (like in a hacker attack) or the token has been expired.
            return undefined
        }

        return pld; //<--- Notice that this line of code will only run if the verification went good.

    }

    refreshToken(token) {

        const pld = this.extractPayload(token);

        if (typeof pld === "undefined") {
            return undefined; //Returning undefined when the token has expired, malformed or when it is from a hacker
        }

        const remainingTime = pld.ext - Math.floor(Date.now() / 1000);

        if (remainingTime < this._maxRefreshTimeWindow) {
            return generatePayload(pld.id); // Refreshing an old token
        } else {
            return token; // Token is not old yet, so we return it again
        }

    }

}

module.exports = { jwtCycle }