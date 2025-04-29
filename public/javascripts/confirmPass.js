let form = document.getElementById("registerForm");

form.addEventListener("submit", function(e) {
    let pass = document.getElementById("pass");
    let confirmPass = document.getElementById("confirm-pass");
    let passError = document.getElementsByClassName("pass-error");

    let newEl = document.createElement("p");
    newEl.setAttribute("class", "pass-error");
    newEl.innerText = "both passwords are not same.";

    if(pass.value != confirmPass.value) {
        e.preventDefault();
        pass.after(newEl);
    }
})