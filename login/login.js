let loginForm = document.querySelector(".login-form");

let registerForm = document.querySelector(".register-form");

document.querySelector(".register").addEventListener("click", function() {
    registerForm.classList.remove("hide");
    loginForm.classList.add("hide");
   
});

document.querySelector(".login").addEventListener("click", function() {
    loginForm.classList.remove("hide");
    registerForm.classList.add("hide");

});
