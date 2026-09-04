const { Post } = require("../../databases/mysql/dml/post");
const { pool } = require("../../databases/mysql/infra/pool");
const bcrypt = require("bcrypt");
const { validateBody } = require("../middlewares/check_body");
const { UserDQL } = require("../../databases/mysql/dql/user")
const { jwtCycle } = require("../jwt/jwt_cycle");
const { extRateLimiterMiddleware } = require("../middlewares/ext_rate_limiter_middleware");
const { checkAuth } = require("../middlewares/check_auth");
const { InnerRateLimiter } = require("../../databases/redis/rate_limit/inner_rate_limiter");
const { ExternalRateLimiter } = require("../../databases/redis/rate_limit/external_rate_limiter");

function externalEndpoints(app) {

    const BASIS = "/outside";

    //Register endpoint
    app.post(BASIS + "/register", validateBody, async (req, res) => {
        const JSON = req.body; //<--- Grabing JSON

        //Capturing the fields
        const name = JSON.name;
        const email = JSON.email;
        const password = JSON.password;
        const category = JSON.category;

        //Validating fields
        [name, email, password, category].forEach(field => {
            if (typeof field === "undefined") {
                return res.status(404).json({
                    message : "Lacking a field",
                    success : false
                });
            }
        });

        //Protecting the password with bcrypt
        const cryptPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT))

        try {
            //Sending the data to the database
            await Post.postRegistration(pool, name, email, cryptPassword, category);
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(422).json({
                    message : "This email already exists",
                    success : false
                });
            }
        }

        //Returns 200 if everything went fine
        return res.status(201).json({
            message : "Registered",
            success : true
        });
    });

    app.post(BASIS + "/login", validateBody, extRateLimiterMiddleware, async (req, res) => {
        
        //Getting the JSON in the body
        const JSON = req.body;

        //Validating fields
        [JSON.email, JSON.password].forEach((field) => {
            if (typeof field === "undefined") {
                return res.status(404).json({message: "Lacking data in a field", success : false});
            }
        });

        //Getting data from database through email, which is unique
        const udql = new UserDQL(pool)
        const data = await udql.getUserInfo(JSON.email);

        //Negate the request if the user isn't present inside the database
        if (typeof data === "undefined") {
            return res.status(404).json({message : "User not found", success: false});
        }

        //Checking the password
        const isOk = await bcrypt.compare(JSON.password, data.password)

        //If the passwords don't match, entrance is blocked with 401, otherwise, the user is allowed to enter in the system with 200.
        if (!isOk) {
            return res.status(401).json({message : "wrong credentials", success : false});
        }

        //Creating JWT token
        const jwt = new jwtCycle();
        const token = jwt.generateJWT(data.id);

        //Encapsulating the token inside a cookie
        res.cookie(
            "jwt",
            token,{
            httpOnly : true,
            secure : true,
            sameSite: "none",
            maxAge : Number(process.env.COOKIE_TTL_IN_MS)
            });
        return res.status(200).json({message : "allowed", success : true});
    });

    app.delete(BASIS + "/logout", checkAuth, async (req, res) => {
        
        //Querying the email through the ID
        const dql = new UserDQL(pool);
        const email = await dql.getEmailById(res.locals.uid);
        
        //Deleting the key-value that stores relation between the email of the user and numbers of tries during Login.
        const extRateLimiter = new ExternalRateLimiter(email);
        await extRateLimiter.del();
        
        //Deleting the queue
        const innerRateLimiter = new InnerRateLimiter(res.locals.uid);
        await innerRateLimiter.del() //<--- Deleting the queue of the user
        
        res.clearCookie("jwt"); //<---Asking to delete the cookie
        return res.status(200).json({message: "deletion of jwt", success: true});

    });

}

module.exports = { externalEndpoints }