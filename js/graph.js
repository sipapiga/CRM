window.addEventListener('DOMContentLoaded', (event) => {

    let contactList = JSON.parse(localStorage.getItem('Customers'));
    console.log(contactList);

    const antalCustomer = document.querySelector('#customers');
    const customerBD = document.querySelector('#birthdayList');

    antalCustomer.innerHTML = contactList.length;

    for (let x=0;x<contactList.length;x++) {
        customerBD.innerHTML = contactList[x].DOB + "  "+contactList[x].name;
        console.log(contactList[x].DOB + "  "+contactList[x].name);
    }


    let chart = document.getElementById('graph').getContext('2d');
    let revenueChart = new Chart(chart, {
        type: 'bar',
        data: {
            labels: ["2015", "2016", "2017", "2018", "2019"],
            datasets: [{
                label: "Revenue",
                data: [203756, 209637, 310320, 356889, 284777],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
            }],
        }
    });
});