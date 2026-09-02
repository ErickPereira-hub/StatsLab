export function requestDesc(bodyJson) {

    const PATH = `http://127.0.0.1:3000/stats?stats_type=desc`;
    let statusCode;
    
    fetch(PATH, {
        method : "POST",
        credentials : "include",
        body : JSON.stringify(bodyJson),
        headers : {"Content-Type" : "application/json"}
    }).then(res => {
    
        //Grabbing the status code
        statusCode = res.status;
        return res.json();
    
    }).then(json => {
    
        if (statusCode === 200) {
            loadDescFrontend(json);
        }
        
        if (statusCode === 401) {
            window.location.href = "../login.html";
        }
    
        if (statusCode === 422) {
            document.getElementById("err-desc").style.display = "block";
        }
    
    }).catch(err => console.error(err));

}

const loadDescFrontend = (json) => {

    document.getElementById("results-desc").style.display = "block";
    document.getElementById("mean").innerText = `${json.average.toFixed(2)}`;
    document.getElementById("mode").innerText = `${( json.mode !== null ) ? json.mode.toFixed(2): "Unavailable"}`;
    document.getElementById("median").innerText = `${json.median.toFixed(2)}`;
    document.getElementById("pop-var").innerText = `${json.population_var.toFixed(2)}`;
    document.getElementById("s-var").innerText = `${json.sample_var.toFixed(2)}`;
    document.getElementById("pop-std-dev").innerText = `${json.population_std_dev.toFixed(2)}`;
    document.getElementById("s-std-dev").innerText = `${json.sample_std_dev.toFixed(2)}`;
    document.getElementById("mad").innerText = `${json.mean_dev.toFixed(2)}`;

}