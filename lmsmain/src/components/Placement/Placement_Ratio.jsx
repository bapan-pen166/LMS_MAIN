// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';

// const Placement_Ratio = () => {
//     const options = {
//         chart: {
//             type: 'area',
//             inverted: true, // Inverted axis for the chart
//             backgroundColor: '#f9f9f9', // Light background color for the chart
//         },
//         title: {
//             text: 'Placement_Ratio by Year',
//             align: 'left',
//             style: {
//                 fontSize: '16px',
//                 fontWeight: 'bold',
//                 color: '#333',
//             },
//         },
//         tooltip: {
//             pointFormat: '<b>{point.y:.2f}</b>' // Show data point with two decimals
//         },
//         legend: {
//             enabled: false // No legend as per the image
//         },
//         xAxis: {
//             // categories: ['Year 1', 'Year 2', 'Year 3', 'Year 4'], // Add years as x-axis labels
//             categories: ['0.2', '0.3', '0.4'],
//             tickmarkPlacement: 'on',
//             title: {
//                 enabled: false,
//             }
//         },
//         yAxis: {
//             title: {
//                 text: 'Placement_Ratio',
//                 // categories: ['0.2', '0.3', '0.4', '0.5'],
//                 style: {
//                     fontSize: '12px',
//                     fontWeight: 'bold',
//                     color: '#333',
//                 },
//             },
//             labels: {
//                 format: '{value:.1f}', // Display with one decimal place
//             },
//             // min: 0.2, // Start y-axis from 0.2 as seen in the image
//             // max: 0.4, // Maximum value on the y-axis is 0.4
//             tickInterval: 0.1, // Space between ticks
//         },
//         plotOptions: {
//             area: {
//                 fillOpacity: 0.5, // Semi-transparent fill
//                 marker: {
//                     enabled: true,
//                     radius: 4,
//                     symbol: 'circle', // Markers are circles
//                     fillColor: '#2f7ed8', // Marker color
//                 },
//                 lineWidth: 2, // Thicker line for the area plot
//                 color: '#2f7ed8', // Line color
//             },
//         },
//         series: [{
//             name: 'Placement_Ratio',
//             data: [0.1,0.24, 0.23, 0.26, 0.41], // Data points from the image
//             showInLegend: false, // No legend
//         }],
//         credits: {
//             enabled: false // Disable Highcharts credits
//         },
//     };

//     return (
//         <div>
//             <HighchartsReact
//                 highcharts={Highcharts}
//                 options={options}
//             />
//         </div>
//     );
// };

// export default Placement_Ratio;

import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
 
const Placement_Ratio = ({placementRatioYear, placementRatioPercent}) => {
  console.log(placementRatioYear, placementRatioPercent)
  const options = {
    chart: {
      type: 'area',
    },
     credits: {
        enabled: false
     },
    title: {
      text: null,
    },
    xAxis: {
      // categories: ['2020', '2021', '2022', '2023'],
      categories:placementRatioYear,
      title: {
        text: 'Year',
      },
    },
    yAxis: {
      title: {
        text: 'Placement_Ratio',
      },
      tickInterval: 20, // Set tick interval to 0.1
      min: 0, // Set min y-axis value to 0
      max: 100, // Set max y-axis value (optional, adjust based on data)
    },
    series: [
      {
        name: 'Placement_Ratio',
        data: placementRatioPercent,
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
          ],
        },
      },
    ],
    plotOptions: {
      area: {
        marker: {
          enabled: true,
        },
      },
    },
  };
 
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
 
export default Placement_Ratio;
