import { requestPolynomialRegression } from "./request_PR.js";

const btn = document.getElementById("isend");

btn.addEventListener("click", evt => {
    
    //Grabbing the data from the form
    const dataset = document.getElementsByClassName("point-row");

    const datasetX = [];
    const datasetY = [];
    const degree = Number(document.getElementById("degree").value);

    //Loading the datasets
    for (let i = 0; i < dataset.length; i++) {
        const x = Number(document.getElementById(`x${i+1}`).value);
        const y = Number(document.getElementById(`y${i+1}`).value);
        datasetX.push(x);
        datasetY.push(y);
    }

    requestPolynomialRegression(datasetX, datasetY, degree);
});