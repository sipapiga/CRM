class CustomerList {
    constructor() {
        this.list = [];
        let id = localStorage.getItem('CurrentId');
        if (id != null) {
            this.customer_id = id;
        } else {
            this.customer_id = 1;
        }
    }

    displayCustomer() {
        const dummy = this.getContactsFromLocalStorage();
        dummy.forEach(customer => {
            this.addCustomerToList(customer);
            console.log(customer);
        });
        //  this.setDummyCustomer();
    }
    setDummyCustomer() {
        //dummy customer
        for (let customerinfo of dummyContacts) {
            let customer = new Customer(customerinfo.name.first, customerinfo.name.last, customerinfo.dob.date, customerinfo.phone, customerinfo.picture.thumbnail, customerinfo.email, this.customer_id, customerinfo.location, customerinfo.company.name);
            this.customer_id++;
        }
        localStorage.setItem('Customers', JSON.stringify(this.list));
    }

    getContactsFromLocalStorage() {
        if (localStorage.getItem('Customers') === null) {
            this.list = [];
        } else {
            this.list = JSON.parse(localStorage.getItem('Customers'));
        }
        console.log(this.list);
        return this.list;
    }
    saveContactToLocalStorage(contact) {
        const customerList = this.getContactsFromLocalStorage();
        console.log(customerList);
        this.list.push(contact);
        // customerList.push(contact);
        this.customer_id++;
        localStorage.setItem('Customers', JSON.stringify(customerList));
        localStorage.setItem('CurrentId', this.customer_id);
        console.log(this.list);
    }

    RemoveContactFromLocalStorage(id) {
        const customerList = this.getContactsFromLocalStorage();
        customerList.forEach((contact, index) => {
            if (contact.id == id) {
                customerList.splice(index, 1);  //remove from localStorage
                //  this.list.splice(index, 1);  //remove from CustomerList class
            }
        });
        localStorage.setItem('Customers', JSON.stringify(customerList));

        console.log(this.list);
    }
    //Append table row 
    addCustomerToList(list) {
        const cusDiv = document.querySelector("#myTable");
        const row = document.createElement("tr");
        row.innerHTML = `<td><p>${list.id}</p></td>
                <td><img src="${list.photo}" class="img-circle thumb-sm" id="photo"/></td>
                <td><p >${ list.name}</p></td>
                <td><p >${ list.lastname} </p></td>
                <td><a href="#" >${ list.email} </a></td>
                <td><p >${ list.tel} </p> </td>
                <td><a href="#" class="btn btn-success btn-sm info">Info</a></td>
                <td class="text-center"><button class="btn btn-danger btn-sm delete">X</button></td>
                `;
        cusDiv.appendChild(row);
    }
    addNewContact() {
        const name = document.querySelector('#inputName').value;
        const lastname = document.querySelector('#inputLastname').value;
        const email = document.querySelector('#inputEmail').value;
        const tel = document.querySelector('#inputTel').value;
        const company = document.querySelector('#inputCompany').value;
        const address = document.querySelector('#inputAddress').value;

        //I framtiden om vi vet hur man spara photo så behöver vi inte dummy data
        let photo = ["https://randomuser.me/api/portraits/thumb/women/5.jpg",
            "https://randomuser.me/api/portraits/thumb/men/15.jpg",
            "https://randomuser.me/api/portraits/thumb/women/78.jpg",
            "https://randomuser.me/api/portraits/thumb/women/30.jpg",
            "https://randomuser.me/api/portraits/thumb/women/71.jpg"
        ];
        let randomPhoto = photo[Math.random() * photo.length | 0];
        console.log(randomPhoto);

        let newCus = new Customer(name, lastname, "", tel, randomPhoto, email, this.customer_id, address, company);
        //   this.list.push(newCus);
        this.addCustomerToList(newCus, this.customer_id);
        this.saveContactToLocalStorage(newCus);
        this.clearFieldInput();
        console.log(this.list);
    }
    //delete from UI
    deleteContactList(e) {
        if (e.classList.contains('delete')) {
            e.parentElement.parentElement.remove();
        }
    }
    //Show customer info here
    showInfo(id) {
        this.list.forEach((contact) => {
            console.log(contact);
            if (contact.id == id) {
                document.querySelector('#cusName').innerHTML = contact.name;
                document.querySelector('#phoneNum').innerHTML = contact.tel;
                document.querySelector('#email').innerHTML = contact.email;
                document.querySelector('#companyName').innerHTML = contact.company;
                document.querySelector('#profile_user_pic').src = contact.photo;
            }
        });
    } 

    validateCustomer() {
        const name = document.querySelector('#inputName').value;
        if (name == "") {
            document.querySelector('#invalidName').innerHTML = "Please write customer name";
            return false;
        }
        const lastname = document.querySelector('#inputLastname').value;
        if (lastname == "") {
            document.querySelector('#invalidLastname').innerHTML = "Please write customer lastname";
            return false;
        }
        const email = document.querySelector('#inputEmail').value;
        if (email == "") {
            document.querySelector('#invalidEmail').innerHTML = "Please write customer email";
            return false;
        }
        const tel = document.querySelector('#inputTel').value;
        if (tel == "") {
            document.querySelector('#invalidTel').innerHTML = "Please write customer telephone number";
            return false;
        }
        if (isNaN(tel)) {
            document.querySelector('#invalidTel').innerHTML = "Please write telephone number in digits";
            return false;
        }
        const company = document.querySelector('#inputCompany').value;
        if (company == "") {
            document.querySelector('#invalidCompany').innerHTML = "Please write customer company";
            return false;
        } else
            return true;
    }
    clearFieldInput() {
        document.querySelector('#inputName').value = "";
        document.querySelector('#inputLastname').value = "";
        document.querySelector('#inputEmail').value = "";
        document.querySelector('#inputTel').value = "";
        document.querySelector('#inputCompany').value = "";
        document.querySelector('#inputAddress').value = "";
        document.querySelector('#invalidName').value = "";
        document.querySelector('#invalidLastname').value = "";
        document.querySelector('#invalidEmail').value = "";
        document.querySelector('#invalidTel').value = "";
        document.querySelector('#invalidCompany').value = "";

    }
}

class Customer {
    constructor(name, lastname, DOB = "1997-01-01", tel, photo = "", email, id, address = "", company) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.tel = tel;
        this.photo = photo;
        this.email = email;
        this.DOB = DOB;
        this.address = address;
        this.company = company;
    }
}


/* window.addEventListener('DOMContentLoaded', (event) => {

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
}); */