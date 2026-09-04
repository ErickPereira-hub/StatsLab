const { Post } = require("../../databases/mysql/dml/post");
const { pool } = require("../../databases/mysql/infra/pool");
const { validateBody } = require("../middlewares/check_body");
const { checkAuth } = require("../middlewares/check_auth");
const { refreshCookie } = require("../middlewares/refresh_cookie");
const { innerRateLimiterMiddleware } = require("../middlewares/inner_rate_limiter_middleware");

function contact(app) {

    const BASIS = "/contact";

    app.post(BASIS, validateBody, checkAuth, innerRateLimiterMiddleware, async (req, res) => {
        const JSON = req.body; //<--- Grabing JSON
        const subject = JSON.subject;
        const msg = JSON.message;

        refreshCookie(req, res); //<--- Refreshing the cookie because the user is active

        //Validating fields
        [subject, msg].forEach(field => {
            if (typeof field === "undefined") {
                return res.status(404).json({
                    message : "Lacking a field",
                    success : false
                });
            }
        });

        try {
            //Sending the data to the database
            await Post.postContactMessage(pool, subject, msg, res.locals.uid);
        } catch (err) {
            if (err.code === "ER_DATA_TOO_LONG") {
                return res.status(422).json({
                    message : "The text is too long. Maximum size for the message is 3000 characters and the field \"subject\" must have at most 50 characters",
                    success : false
                });
            }
        }

        return res.status(201).json({
            message: "Message posted successfully",
            success: true
        });
    });

}

module.exports = { contact }