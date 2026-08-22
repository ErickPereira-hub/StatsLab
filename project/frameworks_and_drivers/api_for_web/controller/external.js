function externalEndpoints(app) {

    //Register endpoint
    app.post("/register", (req, res) => {
        const JSON = req.body; //<--- Grabing JSON

        //Validating the JSON in the body
        if (Object.keys(JSON).length === 0) {
            return res.status(400).json({
                message : "JSON is empty",
                success : false
            });
        }
        if (typeof JSON === undefined) {
            return res.status(400).json({
                message : "JSON came as undefined",
                success: false
            });
        }

        console.log(JSON);
        return res.status(200).json({
            message : "Done"
        })
    })

}

module.exports = { externalEndpoints }