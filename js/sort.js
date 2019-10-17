function showCustomer(list) {
    const cusDiv = document.querySelector("#sortTable");
    const row = document.createElement("tr");
    row.innerHTML = `<td><p>${list.id}</p></td>
            <td><img src="${list.photo}" class="img-circle thumb-sm" id="photo"/></td>
            <td><p >${ list.name}</p></td>
            <td><p >${ list.lastname} </p></td>
            <td><a href="#" >${ list.email} </a></td>
            <td><p>${ list.tel} </p> </td>
            <td><a >${ list.company} </a></td>
            <td><p >${ list.Lastcall} </p> </td>
            `;
    cusDiv.appendChild(row);
}
function item(c) {
    return function () {
        console.log(c)
        //   sortColumn(c)
    }
}
/* function sortColumn(columnName) {
    let sortDirection = false;
    let getName = dummyContacts.map((contact) => {
        return contact.name.first
    });
    console.log(getName);
    let dataType = typeof getName[0];
    sortDirection = !sortDirection;
    console.log(dataType);
    switch (dataType) {
        case 'string':
            sortNameColumn(sortDirection, columnName);
            break;
    }
    console.log(getName);
    //  showCustomer(getName);
}
function sortNameColumn(sort, columnName) {
    let getName = dummyContacts.map((contact) => {
        return contact.name.first
    });
    getName = getName.sort((p1, p2) => {
        return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]
    });
}
 */
window.addEventListener('DOMContentLoaded', (event) => {
    let sortList =  JSON.parse(localStorage.getItem('Customers'));
    console.log(sortList);
    sortList.forEach(customer => {
        showCustomer(customer);
    });
    th = document.getElementsByTagName('th');
    for (let c = 0; c < th.length; c++) {
        th[c].addEventListener('click', item(c))
    }

});