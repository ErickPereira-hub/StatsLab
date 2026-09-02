import { getBinomialDistChart } from "../../charts/binomial_dist/binomial_dist.js";
import { addBinEvents } from "../../charts/binomial_dist/listeners.js";

export function requestBinomialDistribution(minSuc, maxSuc, prob, tries) {

    const PATH = `http://127.0.0.1:3000/stats?stats_type=binomial_dist&min_suc=${minSuc}&max_suc=${maxSuc}&prob=${prob}&tries=${tries}`;
    let statusCode;

    fetch(PATH, {
        method : "GET",
        credentials : "include"
    }).then(res => {

        //Grabbing the status code
        statusCode = res.status;
        return res.json();
    
    }).then(json => {

        if (statusCode === 200) {
            //Showing the figure and probability
            document.getElementById("result-region").style.display = "block";
            document.getElementById("bd-prob-result").innerText = `Probability: ${(100 * json.prob).toFixed(2)}%`;
            document.getElementById("imsg-prob").innerText = `This represents the probability of the number of successes to be between ${minSuc} and ${maxSuc}.`;
            const chart = getBinomialDistChart(json.complete_data, json.shadow_data);
            addBinEvents(chart, json.complete_data);
            const sliderStart = document.getElementById("bin-slider-start")
            const sliderEnd = document.getElementById("bin-slider-end");
            sliderStart.min = "0";
            sliderEnd.min = "0";
            sliderStart.max = `${json.complete_data.length -1}`;
            sliderEnd.max = `${json.complete_data.length - 1}`;
            sliderStart.value = `${minSuc}`;
            sliderEnd.value = `${maxSuc}`;
            document.getElementById("slider-start-value").innerText = `${minSuc}`;
            document.getElementById("slider-end-value").innerText = `${maxSuc}`;
            document.getElementById("err-bin-msg").style.display = "none";
        }

        if (statusCode === 422) {
            document.getElementById("err-bin-msg").style.display = "block";
        }

        if (statusCode === 401) {
            window.location.href = "../login.html";
        }

    }).catch(err => console.error(err));

}