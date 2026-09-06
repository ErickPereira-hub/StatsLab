export function postNewUser(data) {
    const PATH = "http://localhost:80/api/outside/register";
    let statusCode;
    fetch(PATH, {
        method : "POST",
        body : JSON.stringify(data),
        headers : {"Content-Type" : "application/json"}
    }).then(res => {

        //Grabbing the status code
        statusCode = res.status;
        return res.json();
    
    }).then(json => {
        
        if (statusCode === 201) {
            //Leading the user to the login page if everything went well
            window.location.href = "./login.html";
        } else {
            //Showing a message for the case of an error.
            document.getElementById("ierr").innerText = "⚠️" + json.message;
        }

    }).catch(err => console.error(err));
}