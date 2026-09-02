export function getBinomialDistChart(distributionData, probabilityRegion) {

    const labels = [];

    for (let i = 0; i < distributionData.length; i++) {
        if (distributionData.length > 40) {
            if (i === 0) {
                labels.push(0);
            } else if (i === distributionData.length - 1) {
                labels.push(distributionData.length - 1);
            } else {
            labels.push("");
            }
        } else if (window.innerWidth > 500) { 
            labels.push(i);
        } else {
            if (i % 5 === 0) {
                labels.push(i);
            } else {
                labels.push("");
            }
        }
    }

    const binChart = new Chart("binChart", {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Binomial Distribution",
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
                            labelString: "Attempts",
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

    return binChart;
}

export function updateBinProbabilityRegion(chart, distributionData) {

    const sliderStart = document.getElementById("bin-slider-start");
    const sliderEnd = document.getElementById("bin-slider-end");
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

    document.getElementById("imsg-prob").innerText = `This represents the probability of the number of successes to be between ${start} and ${end}.`;

    //Updating the probability
    document.getElementById("bd-prob-result").innerText = `Probability: ${(100 * newProb).toFixed(2)}%`;
}