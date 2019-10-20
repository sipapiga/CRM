window.addEventListener('DOMContentLoaded', (event) => {

    const showDiv = document.querySelector('#showInfoDiv');
    const tableDIv = document.querySelector('#tableDiv');

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
    console.log(document.getElementById('myTable'));
    //Delete customer from UI and localStorage
    document.getElementById('myTable').addEventListener('click', function (e) {
        console.log(e.target);
        customerList.deleteContactList(e.target);
        //  let id = e.target.parentElement.children[0].textContent;
        customerList.RemoveContactFromLocalStorage(e.target);
    });
    //Show customer Info
    document.getElementById('myTable').addEventListener('click', function (e) {
        console.log(e.target);
        let id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        console.log("id " + id);
        customerList.showInfo(e.target);
        showDiv.classList.remove("hide");
        tableDIv.classList.add("hide");
        //Add Note to customer
        document.getElementById('addNoteBtn').addEventListener('click', function (e) {
            console.log("saveBtn Id :" + id);
            customerList.addNoteToCustomer(id);
        });
        //Add Calling list to customer
        document.getElementById('addCall').addEventListener('click', function (e) {
            console.log("saveBtn Id :" + id);
            customerList.addCallingList(id);
        });
    });
    // search by name
    let filterInput = document.getElementById('search');
    filterInput.addEventListener('keyup', customerList.filterNames);

});