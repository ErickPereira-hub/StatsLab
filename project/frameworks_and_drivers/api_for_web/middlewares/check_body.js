const validateBody = (req, res, next) => {
    
    const JSON = req.body;
    
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

    return next(); //<--- Going to the next middleware or endpoint.

}

module.exports = { validateBody }