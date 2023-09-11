
function addProduct() {
    const name = document.getElementById("product-name").value;
    const price = parseFloat(document.getElementById("product-price").value);
    const quantity = parseInt(document.getElementById("product-quantity").value);

    if (!name || isNaN(price) || isNaN(quantity)) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    const product = { name, price, quantity };
    const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory.push(product);
    localStorage.setItem("inventory", JSON.stringify(inventory));
    displayInventory();
    }

function sellProduct() {
    const name = document.getElementById("sell-product-name").value;
    const sellQuantity = parseInt(document.getElementById("sell-quantity").value);
    if (!name || isNaN(sellQuantity)) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    const productIndex = inventory.findIndex(product => product.name === name);

    if (productIndex !== -1) {
        if (inventory[productIndex].quantity >= sellQuantity) {
            inventory[productIndex].quantity -= sellQuantity;
        } else {
            alert("Not enough quantity in inventory.");
        }
        localStorage.setItem("inventory", JSON.stringify(inventory));
            displayInventory();
        } else {
            alert("Product not found in inventory.");
        }
}

function displayInventory() {
    const inventoryList = document.getElementById("inventory-list");
    inventoryList.innerHTML = "";

    const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    inventory.forEach(product => {
        const li = document.createElement("li");
        li.textContent = `Name: ${product.name}, Price: ${product.price}rs, Quantity: ${product.quantity}`;
        inventoryList.appendChild(li);
    });
}

    // Display the initial inventory when the page loads
    displayInventory();
    
