import { displayNormalDistChart } from "../../charts/normal_dist.js";

export function requestNormalDistribution(mean, stdDev, start, end) {

    const PATH = `http://127.0.0.1:3000/stats?stats_type=normal_dist&start=${start}&end=${end}&std_deviation=${stdDev}&avg=${mean}`;
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
            //Leading the user to the login page if everything went well
            loadNDFrontend(mean, stdDev, start, end, json);
        }

        if (statusCode === 401) {
            window.location.href = "../login.html";
        }

    }).catch(err => console.error(err));

}

const loadNDFrontend = (mean, stdDev, start, end, json) => {
    const prob = (json.probability*100).toFixed(2);
    document.getElementById("prob-result").innerText = `Probability : ${prob}%`;
    document.getElementById("iprob-show").style = "block";
    document.getElementById("imsg").innerText = `The probability of finding the random variable within the interval ranging from ${start} to ${end} is ${prob}%, based on the specified mean and standard deviation. This calculation reflects how likely it is for values to fall inside the chosen range, and the result is visually represented by the shaded area under the Gaussian curve.`;
    displayNormalDistChart(Number(mean), Number(stdDev), Number(start), Number(end));
}