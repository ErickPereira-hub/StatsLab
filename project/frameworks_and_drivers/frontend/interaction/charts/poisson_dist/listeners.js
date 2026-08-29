import { updateProbabilityRegion } from "./poisson_dist.js";

const sliderStart = document.getElementById("poisson-slider-start");
const sliderEnd = document.getElementById("poisson-slider-end");

export function addEvents(chart, distributionData) {
    // Events that will call the functions that update the chart.
    sliderStart.addEventListener(
        "input", evt => {
        updateProbabilityRegion(chart, distributionData);
        }
    );

    sliderEnd.addEventListener(
        "input", evt => {
        updateProbabilityRegion(chart, distributionData);
        }
    );
}