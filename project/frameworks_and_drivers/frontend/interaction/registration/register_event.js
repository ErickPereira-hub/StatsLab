import { postNewUser } from "./request_register.js";

const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", evt => {
    evt.preventDefault(); //<--- Preventing us of getting out of the page and its js
    const name = document.getElementById("irname").value;
    const email = document.getElementById("iremail").value;
    const password = document.getElementById("irpw").value;
    const category = document.getElementById("iprofile").value;
    const data = {
        "name" : name,
        "email" : email,
        "password" : password,
        "category" : category
    }
    postNewUser(data); //<--- Sending JSON to the API.
});