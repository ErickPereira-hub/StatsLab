const { validateNumArray } = require("../utils/validate_num_array");

/*This class will have static methods where each of them calls a
statistical feature from FastAPI to an Express.js endpoint. */

class Caller {

    static BASIS_URL = "http://127.0.0.1:8000/service"

    static async callNormalDistribution(req, res) {

        const start = req.query.start;
        const end = req.query.end;
        const mean = req.query.avg;
        const stdDeviation = req.query.std_deviation;
        //Checking if these data can be converted to Number
        const valid = validateNumArray(start, end, mean, stdDeviation);
        
        if (!valid) {
            return res.status(400).json("Invalid format for query parameters. Read the documentation");
        }

        const fullURL = Caller.BASIS_URL + `/normal_dist?start=${start}&end=${end}&avg=${mean}&std_deviation=${stdDeviation}`;
        
        //Calling the result from the FastAPI in Python
        const response = await fetch(fullURL, {method : "GET"});

        if (response.status !== 200) {
            return res.status(response.status).json({
                success: false,
                message: "Problem during request to the service API"
            });
        }

        const serviceJSON = await response.json();
        
        return res.status(200).json(serviceJSON); //Delivering the information to the frontend.

    }

}

module.exports = { Caller };