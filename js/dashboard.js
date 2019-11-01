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
        <td>${event.date.hours}${":"}${event.date.minutes}</td></tr>
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
  Swal.fire(
    'Reminder',
    getCustomerNameContractEnd + " 's contract is about to run out!",
    'info'
  )
}
class toDo {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}
class toDoList {
  constructor() {
    this.id = 1;
    this.list = [];
  }
}

let newList = new toDoList();

function getData() {
  if (
    JSON.parse(localStorage.getItem("todo")) != null &&
    JSON.parse(localStorage.getItem("todoID") != null)
  ) {
    this.list = JSON.parse(localStorage.getItem("todo"));
    newList.id = JSON.parse(localStorage.getItem("todoID"));
  } else {
    this.list = [];
  }
  return this.list;
}
function saveData(newEvent) {
  console.log(newEvent);
  this.list = getData();
  if (newEvent != undefined && newEvent.text != "") {
    console.log("pushing item");
    list.push(newEvent);
    newList.id++;
  }
  localStorage.setItem("todoID", JSON.stringify(newList.id));
  localStorage.setItem("todo", JSON.stringify(this.list));
  this.list = getData();
  showToDo();
}

function removeItem(id) {
  for (item of list) {
    if (id == item.id) {
      let place = list.indexOf(item);
      list.splice(place, 1);
      newList.id--;
    }
  }
  localStorage.setItem("todoID", JSON.stringify(newList.id));
  localStorage.setItem("todo", JSON.stringify(this.list));
  saveData();
}

function showToDo() {
  const toDoTable = document.querySelector("#toDoText");
  const toDoStat = document.querySelector("#todo");
  toDoTable.innerHTML = "";
  for (item of list) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td id="${item.id}"><p>${item.text}</p></td>
        <td><button class="btn btn-danger btn-sm deleteToDo">Delete</button></tr>
        `;
    toDoTable.appendChild(row);
    toDoStat.innerHTML = list.length;
  }
  $(".deleteToDo").each(function () {
    $(this).on("click", function () {
      $(this)
        .parent()
        .siblings()
        .each(function () {
          removeItem($(this).attr("id"));
        });
    });
  });
}

$(document).ready(function () {
  saveData();
  $("#modalToDo").on("show.bs.modal", function (event) {
    let modal = $(this);
    modal.find("#save").click(function () {
      let x = new toDo(newList.id, $("#toDo").val());
      $("#toDo").val("");
      saveData(x);
      modal.modal("toggle");
    });
  });
});

function contractEndReminder(customer) {
  /*  let endContractCustomer = customer.map((customer) => {
     return customer.contract;
   }); */

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
      return contract.name;
    }
  }
}

window.addEventListener("DOMContentLoaded", event => {
  showCustomer();
  showEvent();
});
