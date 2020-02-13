let stats = {};
let averageChart = false;
let productChart = false;

$(document).ready(function () {
    
    // Set a listener for customer changes
    $('#customerSelect').on('change', function() {
        let id = $('#customerSelect').val();
        getStatistics(id);
    });

    // Set a listener for product changes
    $('#productSelect').on('change', function() {
        let id = $('#customerSelect').val();
        let sku = $('#productSelect').val();
        getProductStatistics(id, sku);
    });

     // Set export listeners
    $('#exportByProduct').click(() => {
        saveCsv(stats.quantitiesByMonth, { filename: 'quantitiesByMonth.csv' });
    })
    $('#exportByAverage').click(() => {
        saveCsv(stats.monthAverages, { filename: 'averageByMonth.csv' });
    })

});

function getStatistics(customerId) {
    $.ajax({
            type: 'GET',
            url: `/api/statistics/${customerId}`,
        })
        .done(function (statistics) {
            stats = statistics;
            
            // Create month average chart
            let labels = statistics.monthAverages.map(item => item.month);
            let data = statistics.monthAverages.map(item => item.average);
            let colors = statistics.monthAverages.map(item => randomColor());
            if(averageChart) averageChart.destroy();
            averageChart = createLineChart('averagechart', data, labels, colors, 'Monthly averages');

            // Create empty product chart
            if(productChart) productChart.destroy();
            productChart = createBarChart('productchart', [], [], [], 'Monthly product quantities');

            // Update product selection
            $('#productSelect').empty()
            console.log('productselect emptied, value now:', $('#productSelect').val());
            statistics.productList.forEach(product => {
                $('#productSelect').append(`<option value='${product.sku}'>${product.sku} - ${product.name}</option>`)
            });
            $('#productSelect').selectpicker('refresh');


            
            

           

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

function getProductStatistics(id, sku) {
    $.ajax({
            type: 'GET',
            url: `/api/statistics/${id}/${sku}`,
        })
        .done(function (statistics) {
            stats.quantitiesByMonth = statistics.quantitiesByMonth;

            // Create month product quantity chart
            let labels = statistics.quantitiesByMonth.map(item => item.month);
            let data = statistics.quantitiesByMonth.map(item => item.quantity);
            let colors = statistics.quantitiesByMonth.map(item => randomColor());
            if(productChart) productChart.destroy();
            productChart = createBarChart('productchart', data, labels, colors, 'Monthly product quantities');
  
            

            // // Set export listeners
            // $('#exportproductsList').click(() => {
            //     saveCsv(stats.productQuantities, { filename: 'productQuantities.csv' });
            // })
            // $('#exportByYear').click(() => {
            //     saveCsv(stats.yearTotals, { filename: 'yearTotals.csv' });
            // })
            // $('#exportByMonth').click(() => {
            //     saveCsv(stats.monthTotals, { filename: 'monthTotals.csv' });
            // })

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
    return myChart;
}

function createBarChart(container, data, labels, colors, title) {
    var ctx = document.getElementById(container).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors
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
                        
                    }
                }]
            },
            
        }
    });
    return myChart;
}

function randomColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };
