export function getPoissonDistChart(distributionData, probabilityRegion) {

    const labels = [];

    for (let i = 0; i < distributionData.length; i++) {
        if (window.innerWidth > 500) { 
            labels.push(i);
        } else {
            if (i % 5 === 0) {
                labels.push(i);
            } else {
                labels.push("");
            }
        }
    }

    const poissonChart = new Chart("poissonChart", {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Poisson Distribution",
                    data: distributionData,
                    backgroundColor: "rgba(102, 112, 133, 0.25)",
                    borderColor: "#667085",
                    borderWidth: 1
                },
                {
                    label: "Probability",
                    data: probabilityRegion,
                    backgroundColor: "rgba(22, 58, 99, 0.65)",
                    borderColor: "#163a63",
                    borderWidth: 1
                }

            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            fontColor: "#667085",
                            autoSkip: false,
                            maxRotation: 0
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Number of events",
                            fontColor: "#667085"
                        },
                        gridLines: {
                            color: "#eef0f3"
                        }
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            fontColor: "#667085"
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Probability",
                            fontColor: "#667085"
                        },
                        gridLines: {
                            color: "#eef0f3"
                        }
                    }
                ]
            }
        }
    });

    return poissonChart;
}

export function updateProbabilityRegion(chart, distributionData) {

    const sliderStart = document.getElementById("poisson-slider-start");
    const sliderEnd = document.getElementById("poisson-slider-end");
    const sliderStartValue = document.getElementById("slider-start-value");
    const sliderEndValue = document.getElementById("slider-end-value");

    let start = Number(sliderStart.value);
    let end = Number(sliderEnd.value);

    if (start > end) {
        return; //If start is greater than end, forbid the animation.
    }

    const probabilityRegion = [];
    let newProb = 0;
    for (let i = 0; i <= distributionData.length; i++) {
        if (start <= i && i <= end) {
            probabilityRegion.push(distributionData[i]);
            newProb += distributionData[i];
        } else {
            probabilityRegion.push(null);
        }
    }

    //Updating the range text.
    sliderStartValue.textContent = start;
    sliderEndValue.textContent = end;

    //Updating the chart
    chart.data.datasets[1].data = probabilityRegion;
    chart.update();

    //Updating the probability
    document.getElementById("pd-prob-result").innerText = `Probability: ${(100 * newProb).toFixed(2)}%`;
}