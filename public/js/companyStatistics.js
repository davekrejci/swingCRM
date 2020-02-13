$(document).ready(function () {
    let stats = {}
    getStatistics();

    
});

function getStatistics() {
    $.ajax({
            type: 'GET',
            url: `/api/statistics`,
        })
        .done(function (statistics) {
            stats = statistics;
            // Append list items for each product
            statistics.productQuantities.forEach(product => {
                $('#productsList').append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span><strong>${product.sku}</strong> - ${product.name}</span>
                        <span class="badge badge-primary px-3">${product.quantity}</span>
                    </li>`
                )
            });
            // Create year chart
            let labels = statistics.yearTotals.map(item => item.year);
            let data = statistics.yearTotals.map(item => item.total);
            let colors = statistics.yearTotals.map(item => randomColor());
            createLineChart('yearchart', data, labels, colors, 'Revenue by year');
            
            // Create month chart
            labels = statistics.monthTotals.map(item => item.month);
            data = statistics.monthTotals.map(item => item.total);
            colors = statistics.yearTotals.map(item => randomColor());
            createLineChart('monthchart', data, labels, colors, 'Revenue by month');

            // Set export listeners
            $('#exportproductsList').click(() => {
                saveCsv(stats.productQuantities, { filename: 'productQuantities.csv' });
            })
            $('#exportByYear').click(() => {
                saveCsv(stats.yearTotals, { filename: 'yearTotals.csv' });
            })
            $('#exportByMonth').click(() => {
                saveCsv(stats.monthTotals, { filename: 'monthTotals.csv' });
            })

        })
        .fail(function (err) {
            console.log(err);
            swal({
                title: "Error",
                text: 'Something went wrong. Please try again.',
                icon: "error",
              });
        });
}

function createLineChart(container, data, labels, colors, title) {
    var ctx = document.getElementById(container).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['rgba(69,130,236,0.5)']
            }]
        },
        options: {
            maintainAspectRatio: false,
            title: {
                display: true,
                text: title
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values) {
                            return value + ' €';
                    }
                    }
                }]
            },
            tooltips: {
                callbacks: {
                  label: (item) => `${item.yLabel} €`,
                },
              },
        }
    });
}

function randomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };
