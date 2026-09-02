import { requestLinearRegression } from "./request_LR.js";

const btn = document.getElementById("isend");

btn.addEventListener("click", evt => {
    
    const dataset = document.getElementsByClassName("point-row");

    const datasetX = [];
    const datasetY = [];

    //Loading the datasets
    for (let i = 0; i < dataset.length; i++) {
        const x = Number(document.getElementById(`x${i+1}`).value);
        const y = Number(document.getElementById(`y${i+1}`).value);
        datasetX.push(x);
        datasetY.push(y);
    }

    requestLinearRegression(datasetX, datasetY);
});