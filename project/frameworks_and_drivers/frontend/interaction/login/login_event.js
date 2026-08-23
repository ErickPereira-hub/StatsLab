import { requestLogin } from "./request_login.js";

const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", evt => {
    evt.preventDefault(); //<--- Preventing us of getting out of the page and its js
    const email = document.getElementById("ilemail").value;
    const password = document.getElementById("ilpw").value;
    const data = {
        "email" : email,
        "password" : password
    }
    requestLogin(data); //<--- Sending JSON to the API.
});