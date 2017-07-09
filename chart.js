var ctx = document.getElementById("myChart").getContext('2d');
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: [12,3,4,136,56,4],
    options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
      });
