export function requestLogin(data) {
    const PATH = "http://localhost:80/api/outside/login";
    let statusCode;
    fetch(PATH, {
        credentials : "include",
        method : "POST",
        body : JSON.stringify(data),
        headers : {"Content-Type" : "application/json"}
    }).then(res => {

        //Grabbing the status code
        statusCode = res.status;
        return res.json();

    }).then(json => {
        
        if (statusCode === 200) {
            //Entering inside the system
            window.location.href = "./pages/home.html";
        } else {
            //Showing bad message
            document.getElementById("ierr").innerText = "❌" + json.message;
        }

    }).catch(err => console.error(err));
}