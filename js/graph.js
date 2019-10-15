window.addEventListener('DOMContentLoaded', (event) => {
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