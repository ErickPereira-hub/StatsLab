function logoutUser() {

    const PATH = "http://127.0.0.1:3000/logout";
    let statusCode;

    fetch(PATH, {
        method : "DELETE"
    }).then(res => {

        //Grabbing the status code
        statusCode = res.status;
        return res.json();
    
    }).then(json => {

        if (statusCode === 200) {
            //Leading the user to the login page if everything went well
            window.location.href = "./login.html";
        }

    }).catch(err => console.error(err));

}