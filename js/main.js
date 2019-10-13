
window.addEventListener('DOMContentLoaded', (event) => {

    let customerList = new CustomerList();

    for (let customerinfo of contacts) {
        customerList.addCustomer(customerinfo);
    }
    customerList.displayCustomer();
    console.log(customerList);
    console.log(contacts);

    document.getElementById('saveBtn').addEventListener('click', e => customerList.addContact());
    document.getElementById('cancel').addEventListener('click', e => {
       customerList.hideAddcontactModal();
    });

    document.getElementById('myTable').addEventListener('click', e => {
        console.log(e.target);
       customerList.deleteContactList(e.target);
     });
});