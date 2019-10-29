function showCustomer(list) {
  let dataHtml = "";
  let num = 1;
  let sortCustomerCall = "";
  const cusDiv = document.querySelector("#sortTable");
  for (let customer of list) {
    console.log(customer.call);
    if (customer.call.length > 0) {
      //sorting and reverse array
      sortCustomerCall = customer.call.sort().reverse();
      console.log(sortCustomerCall);
      dataHtml += `<tr><td>${num}</td>
                       <td><img src="${customer.photo}" class="img-fluid rounded-circle text-center" width="20%"/></td>
                       <td>${customer.name}</td>
                       <td>${customer.lastname} </td>
                       <td>${customer.tel}  </td>
                       <td>${sortCustomerCall[0].date}</td>
                       `;
      num++;
    }
    cusDiv.innerHTML = dataHtml;
  }
}
function sortArrayBy(array, sort, desc) {
  console.log(sort);
  array.sort(function(a, b) {
    if (a[sort] < b[sort]) return -1;
    if (a[sort] > b[sort]) return 1;
    return 0;
  });
  if (desc) {
    array.reverse();
  }
  return array;
}
function getTodayDate() {
  const todayDiv = document.querySelector("#todayDate");
  let today = new Date().toString().slice(0, 15);
  todayDiv.innerHTML = "Today is " + today;
}

window.addEventListener("DOMContentLoaded", event => {
  let sortList = JSON.parse(localStorage.getItem("Customers"));
  console.log(sortList);
  const sortContactedbtn = document.querySelector("#lastContactedSort");
  const sortNamebtn = document.querySelector("#nameSort");

  let desc = false;
  //check again**
  sortNamebtn.addEventListener("click", e => {
    let array = sortArrayBy(sortList, "name", desc);
    showCustomer(array);
    desc = !desc;
  });
  sortContactedbtn.addEventListener("click", e => {
    let array = sortArrayBy(sortList, "date", desc);
    console.log(array);
    showCustomer(array);
    desc = !desc;
  });

  showCustomer(sortList);
  getTodayDate();
});
