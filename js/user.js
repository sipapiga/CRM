class User {
    constructor(name, lastname, email, username, password) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password,
            this.username = username;
    }
    getUserName() {
        const welcomeName = document.querySelector("#user");
        welcomeName.innerHTML = "Welcome  " + this.name;
    }
    getUsersFromLocalStorage() {
        let userCRM;
        if (localStorage.getItem('Users') === null) {
            userCRM = [];
        } else {
            userCRM = JSON.parse(localStorage.getItem('Users'));
        }
        return userCRM;
    }
    saveUserToLocalStorage(user) {
        const userList = this.getUsersFromLocalStorage();
        userList.push(user);
        localStorage.setItem('Users', JSON.stringify(userList));
    }
    checkLogin(username, password) {
        let user = "";
        const userList = this.getUsersFromLocalStorage();
        let userUsername = userList.map((username) => {
            return username.username;
        });
        if (userUsername.includes(username)) {
            for (let user of userList) {
                if (username === user.username) {
                    if (password === user.password) {
                        user = user.name;
                        location.href = "../index.html";
                        break;
                    } else {
                        this.showAlert("The password you have entered is invalid.", "danger");
                        break;
                    }
                } else {
                    this.showAlert("The username you have entered is invalid.", "danger");
                    break;
                }
            }
        } else {
            this.showAlert("The username is not exist, plese register", "danger");
        }
        return user;
    }
    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('.register-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
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

    validateBtn.addEventListener('click', function () {
        let validate = user.validateUser();
        if (validate == true) {
            user.showAlert("You have registered", "success")
            addNewUser();
            clearTextfield();
        }
    });
    let user = new User();
    document.querySelector("#login").addEventListener("click", function () {
        let usernameFromUser = document.querySelector("#usernameInput").value;
        let passwordFromUser = document.querySelector("#passwordInput").value;
        user.checkLogin(usernameFromUser, passwordFromUser);

    });

    document.querySelector(".register").addEventListener("click", function () {
        registerForm.classList.remove("hide");
        loginForm.classList.add("hide");

    });
    function clearTextfield() {
        const userName = document.querySelector("#name").value = "";
        const userLastname = document.querySelector("#lastname").value = "";
        const userEmail = document.querySelector("#email").value = "";
        const userUsername = document.querySelector("#username").value = "";
        const userPassword = document.querySelector("#password").value = "";

    }

    function addNewUser() {
        const userName = document.querySelector("#name").value;
        const userLastname = document.querySelector("#lastname").value;
        const userEmail = document.querySelector("#email").value;
        const userUsername = document.querySelector("#username").value;
        const userPassword = document.querySelector("#password").value;

        let userInput = new User(userName, userLastname, userEmail, userUsername, userPassword);
        userInput.saveUserToLocalStorage(userInput);
    }
});
