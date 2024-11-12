import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// const Assignment_Summery = () => {
//     const options = {
//         chart: {
//             type: 'column'
//         },
//         title: {
//             text: 'Assignment Summery',
//             align: 'left'
//         },
//         credits: {
//             enabled: false
//         },
//         // subtitle: {
//         //     text:
//         //         'Source: <a target="_blank" href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
//         //     align: 'left'
//         // },
//         xAxis: {
//             categories: ['A11', 'A12', 'A13', 'A14', 'A14', 'A15'],
//             crosshair: true,
//             accessibility: {
//                 description: 'Countries'
//             }
//         },
//         yAxis: {
//             min: 0,
//             tickInterval: 20,
//             title: {
//                 text: null  // This hides the Y-axis title
//             },
//         },
//         // tooltip: {
//         //     valueSuffix: ' (1000 MT)'
//         // },
//         // plotOptions: {
//         //     column: {
//         //         pointPadding: 0.2,
//         //         borderWidth: 0
//         //     }
//         // },
//         series: [
//             {
//                 name: 'Completed',
//                 data: [100, 80, 30, 70, 60, 70]
//             },
//             {
//                 name: 'In Progress',
//                 data: [40, 30, 40, 50, 60, 50]
//             },
//             {
//                 name: 'Not Complete',
//                 data: [20, 10, 40, 60, 50, 40]
//             }
//         ]
//     };

//     return (
//         <div>
//             <HighchartsReact highcharts={Highcharts} options={options} />
//         </div>
//     );
// };

// export default Assignment_Summery;


const Assignment_Summery = ({ assignmentPass, assignmentFail }) => {
    // Define the chart options
    const options = {
        chart: {
            type: 'column' // Horizontal bar chart
        },
        title: {
            text: 'Assignment Summary'
        },
        xAxis: {
            categories: ['Pass', 'Fail'], // X-axis categories for pass and fail
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            formatter: function () {
                // Tooltip content with pass/fail percentage
                return this.x + ': ' + this.y + '%';
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            enabled: false // Disable the legend
        },
        credits: {
            enabled: false
        },
        series: [{
            // name: null,
            data: [
                { y: assignmentPass, color: '#38bdf8' }, // Green color for Pass
                { y: assignmentFail, color: '#f43f5e' }  // Red color for Fail
            ] // Use props to set pass and fail percentages
        }]
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default Assignment_Summery;