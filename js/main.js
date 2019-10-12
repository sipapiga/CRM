
window.addEventListener('DOMContentLoaded', (event) => {

    let customerList = new CustomerList();

    for (let customerinfo of contacts) {
        let x = new Customer(customerinfo.name.first, customerinfo.name.last, customerinfo.dob.date, customerinfo.phone, customerinfo.picture.thumbnail, customerinfo.email);
        customerList.list.push(x);
    }
    customerList.displayCustomer();

    document.getElementById('saveBtn').addEventListener('click', e => customerList.addContact());
    document.getElementById('cancel').addEventListener('click', e => {
       customerList.hideAddcontactModal();
    });

    document.getElementById('myTable').addEventListener('click', e => {
        console.log(e.target);
       customerList.deleteContactList(e.target);
     });
});