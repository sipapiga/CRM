window.addEventListener('DOMContentLoaded', (event) => {

    const showDiv = document.querySelector('#showInfoDiv');
    const tableDIv = document.querySelector('#tableDiv');

    let customerList = new CustomerList();
    console.log(customerList);
    customerList.displayCustomer();

    //Search
    document.getElementById('searchBtn').addEventListener('click', function () {
        const searchInput = document.querySelector('#search').value;
        console.log(searchInput);
        customerList.searchCustomerName(searchInput);
    });


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
    //Show customer Info
    document.getElementById('myTable').addEventListener('click', function (e) {
        console.log(e.target);
        let id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        console.log("id " + id);
        customerList.showInfo(id);
        showDiv.classList.remove("hide");
        tableDIv.classList.add("hide");
        //Add last contacted to customer
        document.getElementById('saveLastCall').addEventListener('click', function (e) {
            console.log(e.target);
            console.log("saveBtn Id :"+id);
            // Hur vet man vilken kund id är det?
            /*     let id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
                console.log("id " + id); */
            customerList.addLastcalltoCustomer(id);
        });
        //Add Note to customer
        document.getElementById('saveNoteBtn').addEventListener('click', function (e) {
            // Hur vet man vilken kund id är det?
            const customerContacted = document.querySelector('#addCallInput').value;
            const appendCall = document.querySelector('#showLastContacted');
            appendCall.innerHTML = customerContacted;
        });
    });


});