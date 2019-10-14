
window.addEventListener('DOMContentLoaded', (event) => {

    let customerList = new CustomerList();
    console.log(customerList);

    customerList.displayCustomer();

    document.getElementById('saveBtn').addEventListener('click', e => {
        customerList.addNewContact();
    });
    document.getElementById('cancel').addEventListener('click', function () {
        customerList.hideAddcontactModal();
    });
    //Delete customer from UI and localStorage
    document.getElementById('myTable').addEventListener('click', e => {
        console.log(e.target);
        customerList.deleteContactList(e.target);
        let id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        console.log("id " + id);
        customerList.RemoveContactFromLocalStorage(id);
    });
     //Show customer info
    document.getElementById('myTable').addEventListener('click', e => {
        console.log(e.target);
        customerList.showInfo(e.target);
    });
});