export function displayPolynomialRegression(datasetX, datasetY, coeffs) {

    const regressionPoints = [];

    for ( let i = 0; i < datasetX.length; i++ ) {
        regressionPoints.push({
            x : datasetX[i],
            y : datasetY[i]
        });
    }

    const formula = (input) => {

        let output = coeffs[0];

        coeffs.forEach((val, ind) => {
            if (ind > 0) {
                output += val * input ** ind;
            }
        });
        
        return output;
    }

    const regressionCurve = [];
    for (let i = Math.min(...datasetX); i <= Math.max(...datasetX); i += 0.05) {

        regressionCurve.push({
            x : Number(i.toFixed(2)),
            y : formula(i)
        });

    }

    new Chart("polyRegChart", {
        type: "scatter",
        data: {
            datasets: [
                {
                    label: "Data points",
                    data: regressionPoints,
                    backgroundColor: "#163a63",
                    borderColor: "#163a63",
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    type: "line",
                    label: "Polynomial regression",
                    data: regressionCurve,
                    borderColor: "#667085",
                    borderWidth: 3,
                    backgroundColor: "transparent",
                    pointRadius: 0,
                    pointHoverRadius: 0,
                    lineTension: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 800
            },
            legend: {
                display: false
            },
            tooltips: {
                mode: "nearest",
                intersect: false,
                backgroundColor: "#172033",
                titleFontColor: "#ffffff",
                bodyFontColor: "#ffffff",
                borderColor: "#d9dee7",
                borderWidth: 1,
                xPadding: 10,
                yPadding: 10
            },
            scales: {
                xAxes: [
                    {
                        type: "linear",
                        scaleLabel: {
                            display: true,
                            labelString: "X",
                            fontColor: "#667085"
                        },
                        gridLines: {
                            color: "#eef0f3"
                        },
                        ticks: {
                            fontColor: "#667085"
                        }
                    }
                ],
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: "Y",
                            fontColor: "#667085"
                        },
                        gridLines: {
                            color: "#eef0f3"
                        },
                        ticks: {
                            fontColor: "#667085"
                        }
                    }
                ]
            }
        }
    });
}