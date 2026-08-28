function addPoint() {
    const contOfPoints = document.getElementById("icont");
    const numOfPoints = document.getElementsByClassName("point-row").length;

    //Defining the element and the subelements in the DOM
    const el = document.createElement("div");
    el.className = "point-row";
    
    const fieldX = document.createElement("div");
    fieldX.className = "form-group";

    const fieldY = document.createElement("div");
    fieldY.className = "form-group";

    const labelX = document.createElement("label");
    labelX.innerText = `X${numOfPoints + 1}`;
    
    const inputX = document.createElement("input");
    inputX.type = "number";
    inputX.id = `x${numOfPoints + 1}`;
    inputX.name = `x${numOfPoints + 1}`;
    inputX.placeholder = "X";
    inputX.step = "any";
    inputX.requred = true;

    fieldX.append(labelX);
    fieldX.append(inputX);

    const labelY = document.createElement("label");
    labelY.innerText = `Y${numOfPoints + 1}`;

    const inputY = document.createElement("input");
    inputY.type = "number";
    inputY.id = `y${numOfPoints + 1}`;
    inputY.name = `y${numOfPoints + 1}`;
    inputY.placeholder = "Y";
    inputY.step = "any";
    inputY.requred = true;

    fieldY.append(labelY);
    fieldY.append(inputY);

    el.append(fieldX);
    el.append(fieldY);

    //Placing the element in the DOM tree.
    contOfPoints.append(el); //Adding the field to the container.
}