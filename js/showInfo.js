

window.addEventListener('DOMContentLoaded', (event) => {
    
    document.getElementById('myTable').addEventListener('click', e => {
        console.log(test);
        console.log(e.target);
        let id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        console.log("id " + id);
        showInfo(id);
        //  location.href = "info.html";

    });
});