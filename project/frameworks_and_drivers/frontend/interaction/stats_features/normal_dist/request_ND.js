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
            document.getElementById("prob-result").innerText = `Probability : ${(json.probability*100).toFixed(2)}%`;
            document.getElementById("iprob-show").style = "block";
        }

    }).catch(err => console.error(err));

}