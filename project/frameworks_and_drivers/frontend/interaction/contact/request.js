export function requestContact(data) {
    const PATH = "http://127.0.0.1:3000/contact";
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
        
        if (statusCode === 201) {
            document.getElementById("resp-msg").innerText = "Message sent successfully. Thank you for you report!";
        } else {
            
            if (statusCode === 401) {
                window.location.href = "./login.html";
            } else {
                document.getElementById("resp-msg").innerText = "Message NOT sent. The maximum size of the \"Subject\" field is 50 and teh maximum size of the field \"message\" is 3000!";
            }

        }

    }).catch(err => console.error(err));
}