let showMenu = false;
const menu = document.getElementById("imenu");

function togleBurguer() {
    showMenu = !showMenu;
    const nav = document.getElementById("imenu");
    if (showMenu) {
        nav.style.display = "flex";
        nav.style.flexDirection = "column";
    } else {
        nav.style.display = "none";
    }
}

function adjustMenu() {
    if (window.innerWidth >= 700) {
        showMenu = true;
        menu.style.display = "flex";
        menu.style.flexDirection = "row";
    } else {
        showMenu = false;
        menu.style.display = "none";
    }
}