import { updateBinProbabilityRegion } from "./binomial_dist.js";

const sliderStart = document.getElementById("bin-slider-start");
const sliderEnd = document.getElementById("bin-slider-end");

export function addBinEvents(chart, distributionData) {
    // Events that will call the functions that update the chart.
    sliderStart.addEventListener(
        "input", evt => {
        updateBinProbabilityRegion(chart, distributionData);
        }
    );

    sliderEnd.addEventListener(
        "input", evt => {
        updateBinProbabilityRegion(chart, distributionData);
        }
    );
}