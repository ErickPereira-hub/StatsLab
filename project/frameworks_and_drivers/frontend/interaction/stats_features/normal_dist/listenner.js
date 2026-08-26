import { requestNormalDistribution } from "./request_ND.js";

const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", evt => {
    evt.preventDefault();
    const mean = document.getElementById("mean").value;
    const stdDev = document.getElementById("standard-deviation").value;
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    requestNormalDistribution(mean, stdDev, start, end);
});