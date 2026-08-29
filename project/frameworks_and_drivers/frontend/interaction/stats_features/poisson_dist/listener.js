import {requestPoissonDist} from "./request_poisson_dist.js";

const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit",
    evt => {
        evt.preventDefault();
        const mean = document.getElementById("poisson-mean").value;
        const start = document.getElementById("poisson-start").value;
        const end = document.getElementById("poisson-end").value;
        requestPoissonDist(start, end, mean);
    }
);