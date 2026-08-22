const { Post } = require("../../databases/mysql/dml/post");
const { pool } = require("../../databases/mysql/infra/pool");
const bcrypt = require("bcrypt");

function externalEndpoints(app) {

    //Register endpoint
    app.post("/register", async (req, res) => {
        const JSON = req.body; //<--- Grabing JSON

        //Validating the JSON in the body
        if (Object.keys(JSON).length === 0) {
            return res.status(400).json({
                message : "JSON is empty",
                success : false
            });
        }
        if (typeof JSON === "undefined") {
            return res.status(400).json({
                message : "JSON came as undefined",
                success: false
            });
        }
        
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
    })

}

module.exports = { externalEndpoints }