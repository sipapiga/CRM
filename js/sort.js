
function showCustomer(list) {
    let dataHtml = '';
    const cusDiv = document.querySelector("#sortTable");
    for (let customer of list) {
        dataHtml += `<tr><td>${customer.id}</td>
               <td><img src="${customer.photo}" class="img-fluid rounded-circle" width="20%"/></td>
               <td>${ customer.name}</td>
               <td>${ customer.lastname} </td>
               <td>${ customer.tel}  </td>
               <td>${ customer.company} </td>
               <td>${ customer.Lastcall}</td></tr>
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

window.addEventListener('DOMContentLoaded', (event) => {
    let sortList = JSON.parse(localStorage.getItem('Customers'));
    console.log(sortList);
    const sortContactedbtn = document.querySelector("#lastContactedSort");
    const sortNamebtn = document.querySelector("#nameSort");
    const sortIdbtn = document.querySelector("#idSort");
    const sortCompanybtn = document.querySelector("#companySort");

    let desc = false;

    sortNamebtn.addEventListener('click', (e) => {
        let array = sortArrayBy(sortList, 'name', desc);
        console.log(array);
        showCustomer(array);
        desc = !desc;
    });
    sortCompanybtn.addEventListener('click', (e) => {
        let array = sortArrayBy(sortList, 'company', desc);
        console.log(array);
        showCustomer(array);
        desc = !desc;
    });

    sortIdbtn.addEventListener('click', (e) => {
        let array = sortArrayBy(sortList, 'id', desc);
        console.log(array);
        showCustomer(array);
        desc = !desc;
    });
    showCustomer(sortList);
});

// search by name
let filterInput = document.getElementById('sok');
filterInput.addEventListener('keyup', filterNames);

function filterNames(){
    let filterValue = document.getElementById('sok').value.toUpperCase ();
    
    let names = document.getElementById('sortTable');

    let tr = names.querySelectorAll('tr');

    for(let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName('td')[2];
        if (td.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
            tr[i].style.display = '';
        } else {
            tr[i].style.display = 'none';

        }
    }
}