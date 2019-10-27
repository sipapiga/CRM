//Det här behöver sortering datum***
function showCustomerBirthday(cus) {
    const cusBD = document.querySelector("#birthdayList");
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><p>${cus.DOB}</p></td>
            <td><p >${ cus.name}</p></td>
            <td><p >${ cus.company} </p></td>
         `;
    cusBD.appendChild(row);
}
function showEvent() {
    let getEvents = JSON.parse(localStorage.getItem('events'));
    const eventsNum = document.querySelector('#events');
    eventsNum.innerHTML = getEvents.length;
    let sortEvent = getEvents.sort();
    console.log(sortEvent);

    for (let event of getEvents) {
        appendEvent(event);
    }

}
function appendEvent(event) {
    const eventsDiv = document.querySelector('#eventText');
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${event.text}</td>
        <td>${ event.date.month}${"/"}${event.date.day}${"/"}${event.date.year}</td>
        <td>${ event.date.hours}${":"}${event.date.minutes}</td></tr>
        `;
    eventsDiv.appendChild(row);
}
function showCustomer() {
    let contactList = JSON.parse(localStorage.getItem('Customers'));
    const antalCustomer = document.querySelector('#customers');
    if(contactList === null){
        antalCustomer.innerHTML = 0;
    }else{
        antalCustomer.innerHTML = contactList.length;
        for (let x = 0; x < contactList.length; x++) {
            showCustomerBirthday(contactList[x]);
        }
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    showCustomer();
    showEvent();

});