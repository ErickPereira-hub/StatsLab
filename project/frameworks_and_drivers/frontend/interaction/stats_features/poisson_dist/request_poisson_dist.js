import { getPoissonDistChart } from "../../charts/poisson_dist/poisson_dist.js";
import { updateProbabilityRegion } from "../../charts/poisson_dist/poisson_dist.js";
import { addEvents } from "../../charts/poisson_dist/listeners.js";

export function requestPoissonDist(start, end, mean) {

    const PATH = `http://127.0.0.1:3000/stats?stats_type=poisson_dist&start=${start}&end=${end}&mean=${mean}`;
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
                document.getElementById("result-region").style.display = "block";
                document.getElementById("pd-prob-result").innerText = `Probability: ${(100 * json.data.prob).toFixed(2)}%`;
                document.getElementById("imsg-prob").innerText = `This represents the probability that the random discrete variable takes on values between ${start} and ${end}.`;
                if (json.data.show) {
                    //Placing the elements in the figure
                    document.getElementById("chart-region").style.display = "block";
                    const chart = getPoissonDistChart(json.data.complete_data, json.data.shadow_data);
                    addEvents(chart, json.data.complete_data);
                    const sliderStart = document.getElementById("poisson-slider-start")
                    const sliderEnd = document.getElementById("poisson-slider-end");
                    sliderStart.max = `${json.data.complete_data.length -1}`;
                    sliderEnd.max = `${json.data.complete_data.length - 1}`;
                    sliderStart.value = `${start}`;
                    sliderEnd.value = `${end}`;
                    document.getElementById("slider-start-value").innerText = `${start}`;
                    document.getElementById("slider-end-value").innerText = `${end}`;
                    document.getElementById("err-poisson-msg").style.display = "none";
                }
            }

            if (statusCode === 422) {
                document.getElementById("err-poisson-msg").style.display = "block";
            }
    
            if (statusCode === 401) {
                window.location.href = "../login.html";
            }
    
    }).catch(err => console.error(err));

}