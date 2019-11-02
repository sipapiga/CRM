function showEvent() {
  let getEvents = JSON.parse(localStorage.getItem("events"));
  const eventsNum = document.querySelector("#events");
  eventsNum.innerHTML = getEvents.length;
  let sortEvent = getEvents.sort();
  console.log(sortEvent);

  for (let event of getEvents) {
    appendEvent(event);
  }
}
function appendEvent(event) {
  const eventsDiv = document.querySelector("#eventText");
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${event.text}</td>
        <td>${event.date.month}${"/"}${event.date.day}${"/"}${
    event.date.year
    }</td>
        <td>${event.date.hours}${":"}${event.date.minutes}</td>
        <td>${event.customer}</td></tr>
        `;
  eventsDiv.appendChild(row);
}
function showCustomer() {
  let contactList = JSON.parse(localStorage.getItem("Customers"));
  console.log(contactList);
  const antalCustomer = document.querySelector("#customers");
  if (contactList === null) {
    antalCustomer.innerHTML = 0;
  } else {
    antalCustomer.innerHTML = contactList.length;
  }
  let getCustomerNameContractEnd = contractEndReminder(contactList);
  //how to get only one alert?
  let alerted = localStorage.getItem('alerted') || '';
  if (alerted != 'yes') {
    Swal.fire(
      'Reminder',
      getCustomerNameContractEnd + " 's contract is about to run out!",
      'info'
    )
    localStorage.setItem('alerted', 'yes');
  }
}
function contractEndReminder(customer) {
  /*  let endContractCustomer = customer.map((customer) => {
     return customer.contract;
   }); */
  let customerContractRunout = [];
  let today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  console.log(today);
  for (let contract of customer) {
    let date1 = new Date(contract.contract);
    let date2 = new Date(today);
    console.log(date1);
    console.log(date2);
    let difference_In_Time = date1.getTime() - date2.getTime()
    let difference_In_Days = difference_In_Time / (1000 * 3600 * 24);
    if (difference_In_Days < 30) {
      console.log(contract.name);
      customerContractRunout.push(contract.name);
      console.log(customerContractRunout);
    }
  }
  return customerContractRunout;
}
function clearAlert(){
  const logoutBtn = document.querySelector('#logout');
  logoutBtn.addEventListener('click',function(){
    localStorage.removeItem('alerted');
  });
}

window.addEventListener("DOMContentLoaded", event => {
  showCustomer();
  showEvent();
  clearAlert();
});
