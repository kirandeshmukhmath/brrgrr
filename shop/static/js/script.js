// JavaScript code for handling the burger customization and order summary
document.addEventListener('DOMContentLoaded', function () {
    const ingredientsList = document.querySelector('.ingredients');
    const orderList = document.getElementById('order-list');
    const totalPrice = document.getElementById('total-price');
    const orderNowBtn = document.getElementById('order-now-btn');
    const popup = document.getElementById('popup');

    // Sample data for ingredients with their prices
    const ingredientsData = [
        { name: 'Bun', price: 10 },
        { name: 'Patty', price: 20 },
        { name: 'Tomatoes', price: 5 },
        { name: 'Sauce', price: 5 },
        { name: 'Onions', price: 5 },
        { name: 'Lettuce', price: 5 },
        { name: 'Cheese', price: 15 },
        // Add more ingredients here as needed
    ];

    // Function to update the order summary and total price
    function updateOrderSummary() {
        // Get all selected ingredients
        const selectedIngredients = ingredientsList.querySelectorAll('input:checked');
        let total = 0;

        // Clear previous order list
        orderList.innerHTML = '';

        // Generate the updated order list and calculate total price
        selectedIngredients.forEach(ingredient => {
            const ingredientName = ingredient.getAttribute('data-name');
            const ingredientPrice = parseFloat(ingredient.getAttribute('data-price'));
            total += ingredientPrice;

            const listItem = document.createElement('li');
            listItem.textContent = `${ingredientName} - Rs.${ingredientPrice}`;
            orderList.appendChild(listItem);
        });

        // Update the total price
        totalPrice.textContent = `Total: Rs. ${total.toFixed(2)}`;
    }

    // Add event listener to each ingredient option
    ingredientsData.forEach(ingredient => {
        const ingredientOption = document.createElement('div');
        ingredientOption.innerHTML = `
            <input type="checkbox" id="{ingredient.name}" data-name="${ingredient.name}" data-price="${ingredient.price}">
            <label for="${ingredient.name}">${ingredient.name} - Rs.${ingredient.price}</label>
        `;
        ingredientsList.appendChild(ingredientOption);
    });

    ingredientsList.addEventListener('change', updateOrderSummary);

    // Handle the order now button click event
    orderNowBtn.addEventListener('click', function () {
        // Display the pop-up message
        popup.innerHTML = '<p><b>Your order has been placed. Thank you!</b></p>';
        popup.style.display = 'block';

        // Hide the pop-up after 3 seconds (adjust as needed)
        setTimeout(function () {
            popup.style.display = 'none';
        }, 5000);
    });
});


//


