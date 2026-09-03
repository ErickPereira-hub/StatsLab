const { JWT_SINGLETON } = require("../jwt/jwt_singleton");

const checkAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    //Checking existence of JWT token
    if (token === undefined) {
        return res.status(401).json({
            message : "Token jwt not found",
            success: false
        });
    }

    const payload = JWT_SINGLETON.extractPayload(token);

    //Validating the payload
    if (payload === undefined) {
        return res.status(401).json({
            message: "Token with trouble (external token, expired or malformed)",
            success: false
        });
    }

    //Grabbing the id of the user (may be useful for operations in the database concerning this user)
    id = payload.id;
    res.locals.uid = id;

    //Here, the user is authorized to access the endpoint
    return next();

}

module.exports = { checkAuth };