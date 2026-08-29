function rmBtn() {

    const inpRegionCollection = document.getElementsByClassName("form-group")
    const len = inpRegionCollection.length;
    const grid = document.getElementById("dgrid");
    const lastElement = inpRegionCollection[len - 1];
    if (len > 6) {
        grid.removeChild(lastElement);
    }

}