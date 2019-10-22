
function showCustomer(list) {
    let dataHtml = '';
    const cusDiv = document.querySelector("#sortTable");
    for (let call of list) {
        dataHtml += `<tr><td>${call.customer.id}</td>
               <td><img src="${call.customer.photo}" class="img-fluid rounded-circle" width="20%"/></td>
               <td>${ call.customer.name}</td>
               <td>${ call.customer.lastname} </td>
               <td>${ call.customer.tel}  </td>
               <td>${ call.date}</td></tr>
               `;
    }
    cusDiv.innerHTML = dataHtml
}
function sortArrayBy(array, sort, desc) {
    array.sort(function (a, b) {
        if (a[sort] < b[sort]) return -1;
        if (a[sort] > b[sort]) return 1;
        return 0;
    });
    if (desc) {
        array.reverse();
    }
    return array;
}
function getTodayDate(){
    const todayDiv = document.querySelector("#todayDate");
    let today = new Date().toString().slice(0,15);
    todayDiv.innerHTML = "Today is "+ today;
    

}

window.addEventListener('DOMContentLoaded', (event) => {
    let sortList = JSON.parse(localStorage.getItem('Calling Lists'));
    console.log(sortList);
    const sortContactedbtn = document.querySelector("#lastContactedSort");
    const sortNamebtn = document.querySelector("#nameSort");
  
    let desc = false;

    sortNamebtn.addEventListener('click', (e) => {
        let array = sortArrayBy(sortList, 'name', desc);
        showCustomer(array);
        desc = !desc;
    });
    sortContactedbtn.addEventListener('click', (e) => {
        let array = sortArrayBy(sortList, 'call', desc);
        console.log(array);
        showCustomer(array);
        desc = !desc;
    });

    showCustomer(sortList);
    getTodayDate();
});