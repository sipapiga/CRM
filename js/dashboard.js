//Det här behöver sortering datum***
// function showCustomerBirthday(cus) {
//     const cusBD = document.querySelector("#birthdayList");
//     const row = document.createElement("tr");
//     row.innerHTML = `
//               <td><p>${cus.DOB}</p></td>
//               <td><p >${cus.name}</p></td>
//               <td><p >${cus.company} </p></td>
//            `;
//     cusBD.appendChild(row);
//   }
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
  let hours = event.date.hours;
  let minutes = event.date.minutes;

  if (event.date.hours < 10) {
    hours = "0" + event.date.hours;
  }
  if (event.date.minutes < 10) {
    minutes = "0" + event.date.minutes;
  }
  row.innerHTML = `
          <td>${event.text}</td>
          <td>${event.date.month + 1}${"/"}${event.date.day}${"/"}${
    event.date.year
  }</td>
          <td>${hours}${":"}${minutes}</td></tr>
          `;
  eventsDiv.appendChild(row);
}
function showCustomer() {
  let contactList = JSON.parse(localStorage.getItem("Customers"));
  const antalCustomer = document.querySelector("#customers");
  if (contactList === null) {
    antalCustomer.innerHTML = 0;
  } else {
    antalCustomer.innerHTML = contactList.length;
    for (let x = 0; x < contactList.length; x++) {
      // showCustomerBirthday(contactList[x]);
    }
  }
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
  const todoNo = document.querySelector("#todoNo");
  toDoTable.innerHTML = "";
  for (item of list) {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td id="${item.id}"><p>${item.text}</p></td>
          <td><button class="btn btn-danger btn-sm deleteToDo">Delete</button></tr>
          `;
    toDoTable.appendChild(row);
    todoNo.innerHTML = list.length;
  }
  $(".deleteToDo").each(function() {
    $(this).on("click", function() {
      $(this)
        .parent()
        .siblings()
        .each(function() {
          removeItem($(this).attr("id"));
        });
    });
  });
}

$(document).ready(function() {
  saveData();
  $("#modalToDo").on("show.bs.modal", function(event) {
    let modal = $(this);
    modal.find("#save").click(function() {
      let x = new toDo(newList.id, $("#toDo").val());
      $("#toDo").val("");
      saveData(x);
      modal.modal("toggle");
    });
  });
});

window.addEventListener("DOMContentLoaded", event => {
  showCustomer();
  showEvent();
});
