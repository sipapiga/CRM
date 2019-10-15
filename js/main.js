window.addEventListener('DOMContentLoaded', (event) => {

    let customerList = new CustomerList();
    console.log(customerList);
    customerList.displayCustomer();


    document.getElementById('saveBtn').addEventListener('click', e => {
        customerList.addNewContact();
    });
    //Delete customer from UI and localStorage
    document.getElementById('myTable').addEventListener('click', function (e) {
        console.log(e.target);
        customerList.deleteContactList(e.target);
        let id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        customerList.RemoveContactFromLocalStorage(id);
    });

    document.getElementById('myTable').addEventListener('click', e => {
        console.log(e.target);
        let id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        console.log("id " + id);
        customerList.showInfo(id);
        location.href = "info.html";

    });
     //add new user 
     for (let newUser of dummyUser) {
        let user = new User(newUser.name.first, newUser.name.last, newUser.login.username, newUser.login.password);
        user.userCRM.push(user);
        user.getUserName();
    }
    getCustomerBD();
    function getCustomerBD() {
        let birthday;
        for (let x of dummyContacts) {
            console.log(x.dob.date);
        }
    }

});