const { JWT_SINGLETON } = require("../jwt/jwt_singleton");

function refreshCookie(req, res) {

    const token = req.cookies.jwt;

    //Refreshing token. At this point, the user may need to refresh his/her token
    const refreshedToken = JWT_SINGLETON.refreshToken(token);

    res.cookie(
        "jwt",
        refreshedToken, {
            httpOnly: true,
            secure : true,
            sameSite : "none",
            maxAge : Number(process.env.COOKIE_TTL_IN_MS)
        }
    );

}

module.exports = { refreshCookie }