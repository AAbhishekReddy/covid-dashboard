console.log("This is a script");

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/AAbhishekReddy/file_dump/main/cases.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var dates = [];
    var cases = [];
    var rec = [];
    var line = allText.split("\n");
    for(var i =0; i<line.length; i++)
    {
        var content = line[i].split(',');
        dates.push(content[1]);
        cases.push(parseInt(content[2]));
        rec.push(parseInt(content[3]));
    }
    
    console.log(cases);
    draw(dates, cases, rec);
}


function draw(dates, cases, rec){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.slice(1, -1),
            datasets: [{
                label: 'Active Cases',
                data: cases.slice(1, -1),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    '#FF0000',
                ],
                borderWidth: 2
            },{
            label: 'Recovered Cases',
            data: rec.slice(1, -1),
            backgroundColor: [
                'rgba(255, 255, 255, 0.2)',
            ],
            borderColor: [
                '#5142f5',
            ],
            borderWidth: 2
        }],
    },

        options: {
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: '# Number of Cases'
                },
                stacked: true
              }]
            }
          }
    });
}