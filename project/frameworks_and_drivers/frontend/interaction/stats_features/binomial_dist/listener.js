import { requestBinomialDistribution } from "./request_bin_dist.js";

const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", evt => {
    evt.preventDefault();
    const prob = document.getElementById("bin-prob").value;
    const tries = document.getElementById("bin-try").value;
    const minSuc = document.getElementById("bin-start").value;
    const maxSuc = document.getElementById("bin-end").value;
    requestBinomialDistribution(minSuc, maxSuc, prob, tries); //<--- Fetching the API
});