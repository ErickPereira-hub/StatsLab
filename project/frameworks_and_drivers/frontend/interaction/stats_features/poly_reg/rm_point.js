function rmPoint() {

    const els = document.getElementsByClassName("point-row");
    if (els.length > 3) {
        document.getElementById("icont").removeChild(els[els.length - 1]);
    }

}