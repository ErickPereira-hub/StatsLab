function addBtn() {

    const grid = document.getElementById('dgrid');
    const newPos = document.getElementsByClassName("form-group").length + 1;
    const newElement = document.createElement("div");
    newElement.className = "form-group";
    const newLabel = document.createElement("label");
    newLabel.innerText = `Value ${newPos}`;
    const newInput = document.createElement("input");
    newInput.id = `d${newPos}`;
    newInput.name = `d${newPos}`;
    newInput.step = "any";
    newInput.required = true;
    newInput.placeholder = "Enter a value";
    newInput.type = "number";
    newElement.append(newLabel);
    newElement.append(newInput);
    grid.append(newElement);

}