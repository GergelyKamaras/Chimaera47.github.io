let orderSum = 0;
let cartContent = [];

let priceChart = {
    Horse : "1200",
    Beef : "1400",
    Pork : "1000",
    Vegan : "1500",
    Normal : "0",
    Large : "500",
    Double : "1000",
    Monster : "1500"
}

document.querySelector("#add-to-cart").addEventListener("click", addToCart);

// Function to add stuff to the cart
function addToCart() {
    let burger = {
        meat : document.querySelector("#hamburger-meat").value,
        size : document.querySelector("#meat-size-radios .form-check input:checked").value,
        sauces : [],
        toppings : [],
        price : "",
        amount : document.querySelector("#burger-amount").value
    }

    let sauces = document.querySelectorAll("#sauce-checkboxes .form-check input:checked");
    for (element of sauces) {
        burger["sauces"].push(element.value);
    }
    let toppings = document.querySelectorAll("#extra-toppings .form-check input:checked");
    for (element of toppings) {
        burger["toppings"].push(element.value);
    }
    burger.price = parseInt(priceChart[`${burger.meat}`]) + parseInt(priceChart[`${burger.size}`]) + 200 * burger.toppings.length;
    cartContent.push(burger);
    displayCart();
}

function displayCart() {
    orderSum = 0;
    let list = document.querySelector("#cart-contents");
    list.innerHTML = "";
    for (dish of cartContent) {
        let listElement = document.createElement("li");
        listElement.innerHTML = `${dish.amount} of ${dish.size} ${dish.meat} Burger -- ${dish.price * parseInt(dish.amount)} Ft`;
        list.appendChild(listElement);
        orderSum += parseInt(dish.amount) * dish.price;
        document.querySelector("#cart-sum").innerHTML = orderSum;
    }
}