import { fillPolynomial } from "../poly_reg/fill_poly.js";
import { displayPolynomialRegression } from "../../charts/poly_reg.js";

export function requestLinearRegression(dsx, dsy) {

    const PATH = `http://127.0.0.1:3000/stats?stats_type=lin_reg`;
    let statusCode;

    fetch(PATH, {
        method : "POST",
        credentials : "include",
        body : JSON.stringify({"dataset_x" : dsx, "dataset_y" : dsy}),
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
            displayPolynomialRegression(dsx, dsy, json.coefficients);
            document.getElementById("err-msg").style.display = "none";
            document.getElementById("corr").innerText = `r = ${json.correlation.toFixed(4)} (${(json.correlation < 0.5 && -0.5 < json.correlation) ? 'weak correlation' : 'strong correlation'})`
            console.log(json);
        }

        if (statusCode === 401) {
            window.location.href = "../login.html";
        }

        if (statusCode === 422) {
            document.getElementById("err-msg").style.display = "block";
        }

    }).catch(err => console.error(err));

}