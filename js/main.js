window.addEventListener('DOMContentLoaded', (event) => {

    const showDiv = document.querySelector('#showInfoDiv');
    const tableDIv = document.querySelector('#tableDiv');
    const deleteBtn = document.getElementsByClassName('delete');
    const infoBtn = document.getElementsByClassName('info');
    const saveBtn = document.getElementById('saveBtn');
    const noteBtn = document.getElementById('addNoteBtn');
    const callBtn = document.getElementById('addCalltbtn');
    const contractBtn = document.getElementById('addContractBtn');
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
    //Delete customer from UI and localStorage
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', function (e) {
            console.log(e.target);
            customerList.deleteContactList(e.target);
            customerList.RemoveContactFromLocalStorage(e.target);
        });
        //Show customer Info
        infoBtn[i].addEventListener('click', function (e) {
            let id = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
            console.log("id " + id);
            customerList.showInfo(e.target);
            customerList.renderNote(id);
            customerList.renderCall(id);
            customerList.renderContract(id);
            showDiv.classList.remove("hide");
            tableDIv.classList.add("hide");
            document.getElementById('addContactbtn').classList.add('hide')
            //Add Note to customer
            noteBtn.addEventListener('click', function (e) {
                customerList.addNoteToCustomer(id);
            });
            //Add Calling list to customer
            callBtn.addEventListener('click', function (e) {
                const saveBtn = document.querySelector('#saveLastCall');
                $('#addCall').modal('show');
                saveBtn.addEventListener('click', function (e) {
                    customerList.addCallToCustomer(id);
                });
            });

            // contractBtn.addEventListener('click', function (e) {
            //     const saveBtn = document.querySelector('#saveContract');
            //     $('#addContract').modal('show');
            //     saveBtn.addEventListener('click', function (e) {
            //         customerList.addContractToCustomer(id);
            //     });
            // });
        });
    }
    // search by name
    filterInput.addEventListener('keyup', customerList.filterNames);
    $(".menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

});