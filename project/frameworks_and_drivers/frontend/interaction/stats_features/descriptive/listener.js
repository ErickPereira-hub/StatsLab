import { requestDesc } from "./request_desc.js"

const form = document.getElementsByTagName("form")[0];

form.addEventListener("submit", evt => {
    evt.preventDefault();
    const inps = document.querySelectorAll("div.form-group > input");
    const dataArray = [];
    inps.forEach(data => {
        dataArray.push(Number(data.value));
    })
    requestDesc({
        data : dataArray
    });
});