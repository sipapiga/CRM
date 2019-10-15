class CustomerList {
    constructor() {
        this.list = [];
        this.customer_id = 1;
    }

    displayCustomer() {
        const dummy = this.getContactsFromLocalStorage();
        dummy.forEach(customer => {
            this.addCustomerToList(customer);
            console.log(customer);
        });
    }
    setDummyCustomer() {
        //dummy customer
        for (let customerinfo of dummyContacts) {
            let customer = new Customer(customerinfo.name.first, customerinfo.name.last, customerinfo.dob.date, customerinfo.phone, customerinfo.picture.thumbnail, customerinfo.email, this.customer_id, customerinfo.location, customerinfo.company.name);
            this.list.push(customer);
            this.customer_id++;
        }
        localStorage.setItem('Customers', JSON.stringify(this.list));
    }

    getContactsFromLocalStorage() {
        let contactsJson = [];
        if (localStorage.getItem('Customers') === null) {
            //dummy customer
            for (let customerinfo of contacts) {
                let customer = new Customer(customerinfo.name.first, customerinfo.name.last, customerinfo.dob.date, customerinfo.phone, customerinfo.picture.thumbnail, customerinfo.email, this.customer_id, customerinfo.location, customerinfo.company.name);
                this.list.push(customer);
                contactsJson.push(customer);
                this.customer_id++;
            }
            localStorage.setItem('Customers', JSON.stringify(this.list));
        } else {
            contactsJson = JSON.parse(localStorage.getItem('Customers'));
        }
        console.log(contactsJson);
        return contactsJson;
    }
    saveContactToLocalStorage(contact) {
        const customerList = this.getContactsFromLocalStorage();
        console.log(customerList);
        this.list.push(contact);
        customerList.push(contact);
        this.customer_id++;
        localStorage.setItem('Customers', JSON.stringify(customerList));
    }

    RemoveContactFromLocalStorage(id) {
        const customerList = this.getContactsFromLocalStorage();
        customerList.forEach((contact, index) => {
            if (contact.id == id) {
                customerList.splice(index, 1);  //remove from localStorage
                this.list.splice(index, 1);  //remove from CustomerList class
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
                <td><p id="firstName">${ list.name}</p></td>
                <td><p id="lastName">${ list.lastname} </p></td>
                <td><a href="#" id="email">${ list.email} </a></td>
                <td><p id="tel">${ list.tel} </p> </td>
                <td><a href="#" class="btn btn-success btn-sm info">Info</a></td>
                <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
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

        let newCus = new Customer(name, lastname, "", tel, 'https://randomuser.me/api/portraits/thumb/women/5.jpg', email, this.customer_id, address, company);
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
    showInfo(id){
        this.list.forEach((contact) => {
            if (contact.id == id) {
                document.querySelector('#cusName').innerHTML = contact.name;
                console.log(contact);
                document.querySelector('#phoneNum').innerHTML =contact.tel;
                document.querySelector('#email').innerHTML= contact.email;
                document.querySelector('#companyName').innerHTML =contact.company;
                document.querySelector('#profie_user_pic').src= contact.photo;
            }
        });
    }

    clearFieldInput() {
        document.querySelector('#inputName').value = "";
        document.querySelector('#inputLastname').value = "";
        document.querySelector('#inputEmail').value = "";
        document.querySelector('#inputTel').value = "";
        document.querySelector('#inputCompany').value = "";
        document.querySelector('#inputAddress').value = "";
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
