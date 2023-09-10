// select dom element
const myform = document.querySelector("#myForm");
const nameInput = document.querySelector("#username");
const emailInput = document.querySelector("#emailId");
const userlist = document.querySelector("#listOfUsers");

// listen for form submit
myform.addEventListener("submit", saveToLocalStorage);

function saveToLocalStorage(event){
    event.preventDefault(); 
    // Retrieving data
    // const name = document.querySelector('#username').value;
    // const email = document.querySelector('#emailId').value;
    const name = event.target.username.value;
    const email = event.target.emailId.value;
    // console.log(name);
    console.log(email);
    // Storing data
    // localStorage.setItem('name', name);
    // localStorage.setItem('email', email);

    const obj = {
        name,
        email
    }

    axios.post("https://crudcrud.com/api/7b79cf4cb66546db83c92bb74890e4b5/appoinmentData", obj)
        .then((response)=>{
            showUserOnScreen(response.data);
            console.log(response);
        })
        .catch((err) => {
            document.body.innerHTML = document.body.innerHTML + "<h3> someting went wrong </h3>";
            console.log(err);
        })
    // localStorage.setItem(obj.email, JSON.stringify(obj));
    // showUserOnScreen(obj);
}

//  read data from local storage
    window.addEventListener("DOMContentLoaded", () =>{
        axios.get("https://crudcrud.com/api/7b79cf4cb66546db83c92bb74890e4b5/appoinmentData")
            .then((response)=>{
                console.log(response);    //response.data is an array of object
                for(var i=0; i<response.data.length; i++){
                    showUserOnScreen(response.data[i]);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        
        // const localstorageObj = localStorage;
        // const localstorageKeys = Object.keys(localstorageObj);

        // for(var i=0; i<localstorageKeys.length; i++){
        //     const key = localstorageKeys[i];
        //     const userDetailsString = localstorageObj[key];
        //     const userDetailsObj = JSON.parse(userDetailsString);
        //      showUserOnScreen(userDetailsObj);
        //  }   
    })

    function showUserOnScreen(user){
        console.log(user);
            // user = {
            //     _id: '',
            //     name: '',
            //     email: ''
            // }
        parentNode = document.getElementById('listOfUsers');
        childHTML = `<li id=${user._id}> ${user.name}: ${user.email}:
                    <button id="button" onclick = deleteUser('${user._id}')>DeleteUser</button>
                    <button id="button" onclick = editUserDetails('${user._id}','${user.name}')>EditUser</button>
                </li>`
        parentNode.innerHTML = parentNode.innerHTML + childHTML;
    }

     // Edit User
    function editUserDetails(emailId, name){
        document.getElementById('email').value = emailId;
        document.getElementById('name').value = name;
        // deleteUser(emailId);
    }
    // editUserDetails('email',);

// deleteuser('abc@gmail.com')
    function deleteUser(userId){
        axios.delete(`https://crudcrud.com/api/7b79cf4cb66546db83c92bb74890e4b5/appoinmentData/${userId}`)
            .then((response)=> {
                removeUserFromScreen(userId);
            })
            .catch((err)=>{
                console.log(err);
            })
        // console.log(emailId);
        // localStorage.removeItem(emailId);
        // removeUserFromScreen(emailId);
    }

function removeUserFromScreen(userId){
    const parentNode = document.getElementById('listOfUsers');
    const childNodeToBeDeleted = document.getElementById(userId);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted);
    }
    
}


// function showUserOnScreen(obj){
//     console.log(obj);
//     // Create new list item with user
//     const li = document.createElement('li');

//     // Add text node with input values
//     li.appendChild(document.createTextNode(`${obj.data.name}: ${obj.data.email}`));
//     // li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));
//     // create a input button
//     const deleteButton = document.createElement('input');
//   // deleteButton.setAttribute('type', "button");
//   // deleteButon.setAttribute('value', "Delete");
//     deleteButton.type = "button";
//     deleteButton.value = "DeleteUser";
//     // deleteButton.id = 'button';
//     deleteButton.onclick = () => {
//         localStorage.removeItem(obj.email);
//         userlist.removeChild(li);
//     }
//     // create a input editbutton
//    const editButton = document.createElement('input');
// //    editButton.id = 'button';
//    // editButton.setAttribute('type', "button");
//    // editButton.setAttribute('value', "Edit");
//    editButton.type = "button";
//    editButton.value = "EditUser";
//    editButton.onclick = () => {
//      localStorage.removeItem(obj.email);
//      userlist.removeChild(li);
//      document.getElementById('username').value = obj.name;
//      document.getElementById('emailId').value = obj.email;
   
//    }

//     li.appendChild(deleteButton);
//     li.appendChild(editButton);
//     userlist.appendChild(li);
// }