window.addEventListener('DOMContentLoaded', (event) => {
    let noteList = JSON.parse(localStorage.getItem('Customers'));
    const showDiv = document.querySelector('#showInfoDiv');
    const tableDIv = document.querySelector('#tableDiv');

    let customerList = new CustomerList();
    console.log(customerList);
    customerList.displayCustomer();

    document.getElementById('saveBtn').addEventListener('click', function () {
        let validateInput = customerList.validateCustomer();
        if (validateInput == true) {
            customerList.addNewContact();
            $('#addContact').modal('hide');
        }
    });
    //Delete customer from UI and localStorage
    let deleteBtn = document.getElementsByClassName('delete');
    console.log(customerList.customer_id);
    console.log(deleteBtn.length);
    let cusId = customerList.customer_id - 1;
    console.log(cusId);
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', function (e) {
            console.log(e.target);
            customerList.deleteContactList(e.target);
            customerList.RemoveContactFromLocalStorage(e.target);
        });
        //Show customer Info
        document.getElementsByClassName('info')[i].addEventListener('click', function (e) {
            let id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            console.log("id " + id);
            customerList.showInfo(e.target);
            customerList.renderNote(id);
            showDiv.classList.remove("hide");
            tableDIv.classList.add("hide");
            //Add Note to customer
            document.getElementById('addNoteBtn').addEventListener('click', function (e) {
                customerList.addNoteToCustomer(id);
            });
            //Add Calling list to customer
            document.getElementById('addCall').addEventListener('click', function (e) {
                customerList.addCallingList(id);
            });
        });
    }
    // search by name
    let filterInput = document.getElementById('search');
    filterInput.addEventListener('keyup', customerList.filterNames);


});