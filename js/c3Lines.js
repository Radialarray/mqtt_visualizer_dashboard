var chart = c3.generate({
    bindto: '#c3Lines',
    size: {
        height: 240,
        width: 350
    },
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    }
});


var chart2 = c3.generate({
    bindto: '#c3Chart',
    size: {
        height: 240,
        width: 200
    },
    data: {
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
      ]
    },
    type : 'pie',

});
