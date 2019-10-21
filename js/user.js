class User {
    constructor(name, lastname, username, password) {
        this.userCRM = [];
        this.id = 1;
        this.name = name;
        this.lastname = lastname;
        this.password = password,
            this.username = username;
    }
    getUserName() {
        const welcomeName = document.querySelector("#user");
        welcomeName.innerHTML = "Welcome  " + this.name;
    }
    validateUser() {
        const userName = document.querySelector("#name").value;
        if (userName == "") {
            document.querySelector('#invalidName').innerHTML = "Please write your name";
            return false;
        }
        const userLastname = document.querySelector("#lastname").value;
        if (userLastname == "") {
            document.querySelector('#invalidLastname').innerHTML = "Please write your lastname";
            return false;
        }
        const userEmail = document.querySelector("#email").value;
        if (userEmail == "") {
            document.querySelector('#invalidEmail').innerHTML = "Please write you email";
            return false;
        }
        const userUsername = document.querySelector("#username").value;
        if (userUsername == "") {
            document.querySelector('#invalidUsername').innerHTML = "Please write your username";
            return false;
        } if ((userUsername.length <= 6) || (userUsername.length > 20)) {
            document.querySelector('#invalidUsername').innerHTML = "Username lenght must be between 6 and 20";
            return false;
        }
        const userPassword = document.querySelector("#password").value;
        if (userPassword == "") {
            document.querySelector('#invalidPassword').innerHTML = "Please write your password";
            return false;
        } if ((userPassword.length <= 6) || (userPassword.length > 20)) {
            document.querySelector('#invalidPassword').innerHTML = "Password lenght must be between 6 and 20";
            return false;
        } else
            return true;
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    let loginForm = document.querySelector(".login-form");
    let registerForm = document.querySelector(".register-form");
    let validateBtn = document.querySelector("#validate");

    let user = new User();

    validateBtn.addEventListener('click', function () {
        console.log("test1");
        let validate = user.validateUser();
        if (validate == true) {
            showAlert("You have registered", "success")
            addNewUser();
            console.log(user);
            location.href = "login.html";
        }
    });

    document.querySelector(".register").addEventListener("click", function () {
        registerForm.classList.remove("hide");
        loginForm.classList.add("hide");

    });

    function showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('.register-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    function addNewUser() {
        const userName = document.querySelector("#name").value;
        const userLastname = document.querySelector("#lastname").value;
        const userEmail = document.querySelector("#email").value;
        const userUsername = document.querySelector("#username").value;
        const userPassword = document.querySelector("#password").value;

        let userInput = new User(userName, userLastname, userEmail, userUsername, userPassword);
        userInput.userCRM.push(userInput);
      //  let addUser =  localStorage.setItem('Users', JSON.stringify(userInput));
      //  console.log(addUser);
    }
});
