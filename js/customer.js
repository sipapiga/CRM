class CustomerList {
    constructor() {
        this.list = [];
    }
    displayCustomer() {
        this.list.forEach(list => {
            this.addCustomerToList(list);
        });
    }
    addCustomerToList(list) {
        const cusDiv = document.querySelector("#myTable");
        const row = document.createElement("tr");
        row.innerHTML = `<td><img src="${list.photo}" class="img-circle thumb-sm" id="photo"/></td>
                <td><p id="firstName">${ list.name}</p></td>
                <td><p id="lastName">${ list.lastname} </p></td>
                <td><a href="#" id="email">${ list.email} </a></td>
                <td><p id="tel">${ list.tel} </p> </td>
                <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
                `;
        cusDiv.appendChild(row);
    }

    addContact() {
        const name = document.querySelector('#inputName').value;
        const lastname = document.querySelector('#inputLastname').value;
        const email = document.querySelector('#inputEmail').value;
        const tel = document.querySelector('#inputTel').value;

        let newCus = new Customer(name, lastname, "", tel, "", email);
        console.log(newCus);
        this.list.push(newCus);
        this.addCustomerToList(newCus);
        this.clearFieldInput();
        this.hideAddcontactModal();
    }
    deleteContactList(e) {
        if (e.classList.contains('delete')) {
            e.parentElement.parentElement.remove();
        }
    }
    clearFieldInput() {
        document.querySelector('#inputName').value="";
        document.querySelector('#inputLastname').value="";
        document.querySelector('#inputEmail').value="";
        document.querySelector('#inputTel').value="";
    }
    hideAddcontactModal() {
        let modal = document.getElementById('addContact');
        modal.classList.remove('show');
        modal.style.display = 'none';
        modal.removeAttribute('aria-modal');
        modal.setAttribute('aria-hidden', true);
        // Remove any fade
        if (document.querySelector('.modal-backdrop'))
            document.body.removeChild(document.querySelector('.modal-backdrop'));
    }
}

class Customer {
    constructor(name, lastname, DOB = "", tel, photo = "", email) {
        this.customers = [];
        this.name = name;
        this.lastname = lastname;
        this.tel = tel;
        this.photo = photo;
        this.email = email;
        this.DOB = DOB;
        this.addCustomer();
    }

    addCustomer() {
        this.customers.push(this.name, this.lastname, this.DOB, this.tel, this.photo, this.email);
    }
}