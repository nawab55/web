const myform = document.querySelector("#myForm");

// myform.addEventListener("submit", addProduct);

function addProduct(){
    const name = document.getElementById("product-name").value;
    const price = document.getElementById("product-price").value;
    const quantity = document.getElementById("product-quantity").value;

    // if (!name || isNaN(price) || isNaN(quantity)) {
    //     alert("Please fill in all fields with valid data.");
    //     return;
    // }
    
    const product = {
        name,
        price,
        quantity
    }

    axios.post("https://crudcrud.com/api/cb45237ec928419197dccbd0507d87d6/ItemData", product)
        .then((response) =>{
            displayInventory(response.data);
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
}

//  read data from crud crud storage
window.addEventListener("DOMContentLoaded", () =>{
    axios.get("https://crudcrud.com/api/cb45237ec928419197dccbd0507d87d6/ItemData")
        .then((response)=>{
            console.log(response);    //response.data is an array of object
            for(var i=0; i<response.data.length; i++){
                displayInventory(response.data[i]);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
})

function sellProduct() {
    const name = document.getElementById("sell-product-name").value;
    const sellQuantity = parseInt(document.getElementById("sell-quantity").value);

    // Check if the input fields are valid
    if (!name || isNaN(sellQuantity) || sellQuantity <= 0) {
        alert("Please fill in all fields with valid data.");
        return;
    }

    axios.get("https://crudcrud.com/api/cb45237ec928419197dccbd0507d87d6/ItemData")
        .then((response) => {
            const products = response.data;
            const productIndex = products.findIndex(product => product.name === name);

            if (productIndex !== -1) {
                const product = products[productIndex];

                if (product.quantity >= sellQuantity) {
                    product.quantity -= sellQuantity;

                    // Update the product data on the server using a PUT request
                    axios.put(`https://crudcrud.com/api/cb45237ec928419197dccbd0507d87d6/ItemData/${product._id}`, product)
                        .then((updateResponse) => {
                            console.log("Product updated:", updateResponse.data);
                            displayInventory(updateResponse.data);
                        })
                        .catch((updateError) => {
                            console.error("Error updating product:", updateError);
                        });
                } else {
                    alert("Not enough quantity in inventory.");
                }
            } else {
                alert("Product not found in inventory.");
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function displayInventory(data) {
    console.log(data);
    //  data = {
            //     _id: '',
            //     name: '',
            //     price: '',
            //     quantity: '' 
            // }
    const inventoryList = document.getElementById("inventory-list");
    // inventoryList.innerHTML = "";
     childHTML = `<li id=${data._id}>Name: ${data.name}, Price: ${data.price}rs, Quantity: ${data.quantity} </li>`
                //   <button id="button" onclick = deleteUser('${user._id}')>DeleteUser</button>
                //   <button id="button" onclick = editUserDetails('${user._id}','${user.name}')>EditUser</button>
                //   </li>`
     inventoryList.innerHTML = inventoryList.innerHTML + childHTML;                    

    // const inventory = JSON.parse(localStorage.getItem("inventory")) || [];
    // inventory.forEach(product => {
    //     const li = document.createElement("li");
    //     li.textContent = `Name: ${product.name}, Price: $${product.price}, Quantity: ${product.quantity}`;
    //     inventoryList.appendChild(li);
    // });
}