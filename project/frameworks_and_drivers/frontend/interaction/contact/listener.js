import { requestContact } from "./request.js";

const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", evt => {
    evt.preventDefault();
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    const data = {
        "subject" : subject,
        "message" : message
    }
    requestContact(data); //<--- Sending JSON to the API.
});