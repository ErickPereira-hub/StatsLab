import { fillPolynomial } from "./fill_poly.js";
import { displayPolynomialRegression } from "../../charts/poly_reg.js";

export function requestPolynomialRegression(datasetX, datasetY, degree) {

    const PATH = `http://127.0.0.1:3000/stats?stats_type=poly_reg`;
    let statusCode;

    fetch(PATH, {
        method : "POST",
        credentials : "include",
        body : JSON.stringify({"dataset_x" : datasetX, "dataset_y" : datasetY, "degree" : degree}),
        headers : {"Content-Type" : "application/json"}
    }).then(res => {

        //Grabbing the status code
        statusCode = res.status;
        return res.json();

    }).then(json => {

        if (statusCode === 200) {
            document.getElementById("poly-info").style.display = "block";
            const polyRepr = fillPolynomial(json.coefficients); //<--- Polynomial
            document.getElementById("ipoly-repr").innerText = polyRepr; //Showing the polynomial to the client side
            displayPolynomialRegression(datasetX, datasetY, json.coefficients);
        }

        if (statusCode === 401) {
            window.location.href = "../login.html";
        }

        if (statusCode === 422) {
            console.log("Bad request");
        }

    }).catch(err => console.error(err));

}