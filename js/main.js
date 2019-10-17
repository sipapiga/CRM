window.addEventListener('DOMContentLoaded', (event) => {

    let customerList = new CustomerList();
    console.log(customerList);
    customerList.displayCustomer();

    document.getElementById('saveBtn').addEventListener('click', function () {
        let validateInput = customerList.validateCustomer();
        if (validateInput == true) {
            customerList.addNewContact();
            // Remove modal
            let modal = document.getElementById("addContact");
            modal.classList.remove('show');
            modal.style.display = 'none';
            modal.removeAttribute('aria-modal');
            modal.setAttribute('aria-hidden', true);

            // Remove any fade
            if (document.querySelector('.modal-backdrop'))
                document.body.removeChild(document.querySelector('.modal-backdrop'));
        }
    });
    //Delete customer from UI and localStorage
    document.getElementById('myTable').addEventListener('click', function (e) {
        console.log(e.target);
        customerList.deleteContactList(e.target);
        let id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        customerList.RemoveContactFromLocalStorage(id);
    });

    document.getElementById('myTable').addEventListener('click', function (e) {
        console.log(e.target);
        let id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        console.log("id " + id);
        customerList.showInfo(id);
        //  location.href = "info.html";
    });

    function getCustomerBD() {
        let birthday;
        for (let x of dummyContacts) {
            console.log(x.dob.date);
        }
    }

});