export function displayNormalDistChart(mean, stdDev, start, end) {
    
    const ndFormula = (input) => (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.E ** ((-0.5) * ((input - mean) / stdDev) ** 2);

    const completeData = [];
    const shadowData = [];
    const gap = (end - start) * 0.2;
    const min = (end - start > 0.1) ? Math.floor(start - gap) : start - gap;
    const max = (end - start > 0.1) ? Math.ceil(end + gap) : end + gap;
    const inc = (end - start > 0.1) ? 0.01 : (end - start) / 100;

    //Generating the chart data in the frontend with time complexity O(n) where n is the precision (level of details)
    for (let i = min; i <= max; i += inc ) {
        const result = ndFormula(i);
        
        if (start <= i && i <= end) {
            shadowData.push({x : i, y : result});
        } else {
            shadowData.push({x : i, y : 0});
        }

        completeData.push({ x : i, y : result });
    }

    new Chart("normalDistributionChart", {
        type: "line",
        data: {
            datasets: [
                // Curve
                {
                    label: "Normal Distribution",
                    data: completeData,
                    borderColor: "#163a63",
                    borderWidth: 3,
                    backgroundColor: "transparent",
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    lineTension: 0.15,
                    fill: false
                },
                // Probability region
                {
                    label: "Probability",
                    data: shadowData,
                    borderColor: "transparent",
                    backgroundColor: "rgba(22, 58, 99, 0.20)",
                    pointRadius: 0,
                    lineTension: 0.15,
                    fill: true
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
                mode: "index",
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
                            labelString: "Value",
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
                        beginAtZero: true,
                        scaleLabel: {
                            display: true,
                            labelString: "Probability Density",
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