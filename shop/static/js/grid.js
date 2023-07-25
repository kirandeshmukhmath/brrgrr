// menu grid layout

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Veg Cheese Classic',
        image: '/static/images/veg-cheese-classic.jpg',
        price: 55
    },
    {
        id: 2,
        name: 'Paneer Burger',
        image: '/static/images/top1.png',
        price: 85
    },
    {
        id: 3,
        name: 'Veg Cheese Combo',
        image: '/static/images/Double Veg.jpg',
        price: 99
    },
    {
        id: 4,
        name: "B'Aloo Burger",
        image: '/static/images/paneerburger.png',
        price: 65
    },
    {
        id: 5,
        name: 'Corn Aloo Burger',
        image: '/static/images/pot.png',
        price: 45
    },
    {
        id: 6,
        name: 'Veg Cheese Classic',
        image: '/static/images/veg-cheese-classic.jpg',
        price: 55
    },

    {
        id: 7,
        name: 'Chicken Cheese Classic',
        image: '/static/images/ClassicChickenburger1.jpg',
        price: 85
    },
    {
        id: 8,
        name: 'Chicken Burger Wrap',
        image: '/static/images/bacon-wrapper-burger.jpg',
        price: 89
    },
    {
        id: 9,
        name: 'Chicken Burger Wrap with Fries',
        image: '/static/images/bacon-burger-with-french-fries.jpg',
        price: 119
    },
    {
        id: 10,
        name: "3 Combo Chicken Wrap",
        image: '/static/images/triplecombo.jpg',
        price: 65
    },
    {
        id: 11,
        name: '2 Combo Chicken Cheese',
        image: '/static/images/Double Veg.jpg',
        price: 45
    },
    {
        id: 12,
        name: 'Non-Veg Surprise Brrgrr',
        image: '/static/images/chickenplain.png',
        price: 55
    }
];
let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">Rs.${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key) {
    if (listCards[key] == null) {
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
    <div><img src="${value.image}" /></div>
    <div>${value.name}</div>
    <div>Rs.${value.price.toLocaleString()}</div>
    <div>
        <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
        <div class="count">${value.quantity}</div>
        <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
    </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}


//
function addToCard(key) {
    if (listCards[key] == null) {
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();

    // Send cart data to Django backend using AJAX
    const cartData = listCards.filter(item => item !== null);
    fetch('/add-to-cart/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': '{{ csrf_token }}', // Replace this with the actual csrf token in your template
        },
        body: JSON.stringify(cartData),
    })
        .then(response => response.json())
        .then(data => console.log(data)) // Optional: Handle the response from the Django view
        .catch(error => console.error('Error adding cart items to server:', error));
}
