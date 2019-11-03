window.addEventListener('DOMContentLoaded', (event) => {

    const saveBtn = document.getElementById('saveBtn');
    const filterInput = document.getElementById('search');

    let customerList = new CustomerList();
    customerList.displayCustomer();

    saveBtn.addEventListener('click', function () {
        let validateInput = customerList.validateCustomer();
        if (validateInput == true) {
            customerList.addNewContact();
            $('#addContact').modal('hide');
            customerList.displayCustomer();
        }
    });
    customerList.displayCustomer();

    // search by name
    filterInput.addEventListener('keyup', customerList.filterNames);
    $(".menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    $('[data-toggle="tooltip"]').tooltip();

});