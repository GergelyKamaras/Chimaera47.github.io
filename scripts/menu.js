// json-server --watch *.json

var fetchOptions = {
    method : "GET",
    header : new Headers(),
    mode : "cors",
    cache: "default"
};
let menuItems = [];
let hamburgers = [];

function grabData(url) {
    return fetch(url, fetchOptions).then(
        resp => resp.json(),
        err => console.error(err)
    )   
}

const promise1 = grabData("http://localhost:3000/hamburgers");
const promise2 = grabData("http://localhost:3000/sandwiches");
const promise3 = grabData("http://localhost:3000/drinks");

Promise.all([promise1, promise2, promise3]).then(responses => {
    menuItems = responses;
    let table = document.querySelector("tbody");
    addCategory(table, menuItems[0], "Hamburgers");
    addCategory(table, menuItems[1], "Sandwiches");
    addCategory(table, menuItems[2], "Drinks");
})

// Prototype for dish objects that will be included in the menu
let dishPrototype = {
    picture: "",
    name: "",
    description: "",
    price: ""
}

function makeElement(tag, attributes) {
    element = document.createElement(tag);
    for (key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

function addCategory(table, categoryList, categoryName) {
    // add label for category name
    let row = document.createElement("tr");
    let cell = makeElement("td", {"colspan" : "4", "class" : "text-center" });
    cell.innerHTML = `${categoryName}`;
    row.appendChild(cell);
    table.appendChild(row);

    // add each row 
    for (let i = 0; i < categoryList.length; i++) {
        table.appendChild(addDish(categoryList[i]));
    }
}

function addDish(dish) {
    let row = document.createElement("tr");
    let cell;
    for (key in dishPrototype) {
        cell = document.createElement("td");
        cell.innerHTML = dish[key];
        row.appendChild(cell);
    }
    return row;
}