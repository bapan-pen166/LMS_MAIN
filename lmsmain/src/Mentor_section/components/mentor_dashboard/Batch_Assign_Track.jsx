import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { api2 } from '../../../ApiUrl/ApiUrl';
import axios from 'axios';
import { useState,useEffect } from 'react';


const Batch_Assign_Track = () => {

    const [assignmentDetails, setAssignmentDetails] = useState([]);
 
    const BatchWiseNoOfAssignments = (email) => {
       axios.post(`${api2}/dashboard/getBatchWiseAllAssignmentTracker`, { mentorEmail: email })
          .then((response) => {
            setAssignmentDetails(response?.data);
          })
          .catch((error) => {
             console.log(error);
          });
    };

    useEffect(()=>{BatchWiseNoOfAssignments(localStorage.getItem('mentorEmail'))},[])

// Prepare data for Highcharts
const prepareChartData = (data) => {
    const categories = [];
    const series = {
        'Completed': [],
        'In progress': [],
        'Not Started': []
    };

    Object?.keys(data)?.forEach(batchKey => {
        const batchData = data[batchKey];
        Object.keys(batchData).forEach(assignment => {
            if (!categories.includes(`${batchKey}: ${assignment}`)) {
                categories.push(`${batchKey}: ${assignment}`);
            }
            Object.keys(series).forEach(status => {
                series[status].push(batchData[assignment][status]);
            });
        });
    });

    return { categories, series };
};

const { categories, series } = prepareChartData(assignmentDetails);


    
    const options = {
        chart: {
            type: 'column'
        },
        credits: {
            enabled: false
        },
        title: {
            text: null,
            align: 'left'
        },
        xAxis: {
            categories: categories, // Combined categories (batch -> assignment)
            title: {
                text: null
            },
            labels: {
                rotation: -45,
                align: 'right'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || 'gray'
                }
            }
        },
        tooltip: {
            formatter: function () {
                return `<b>${this.x}</b><br/>${this.series.name}: ${this.y}`;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal', // Stack the sections within each bar
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [
            {
                name: 'Completed',
                data: series.Completed,
                color: '#38bdf8' // Green for Completed
            },
            {
                name: 'In Progress',
                data: series['In progress'],
                color: '#1d4ed8' // Orange for In Progress
            },
            {
                name: 'Not Started',
                data: series['Not Started'],
                color: '#dbeafe' // Red for Not Started
            }
        ]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default Batch_Assign_Track;

// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';
// import { api2 } from '../../../ApiUrl/ApiUrl';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Batch_Assign_Track = () => {
//     const [assignmentDetails, setAssignmentDetails] = useState([]);

//     const BatchWiseNoOfAssignments = (email) => {
//         axios.post(`${api2}/dashboard/getBatchWiseAllAssignmentTracker`, { mentorEmail: email })
//             .then((response) => {
//                 setAssignmentDetails(response?.data);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     };

//     useEffect(() => {
//         BatchWiseNoOfAssignments(localStorage.getItem('mentorEmail'));
//     }, []);

//     // Prepare data for Chart.js
//     const prepareChartData = (data) => {
//         const labels = []; // Stores assignment labels in format: "Batch: Assignment"
//         const completedData = [];
//         const inProgressData = [];
//         const notStartedData = [];

//         // Separate batch and assignment keys
//         Object.keys(data).forEach(batchKey => {
//             const batchData = data[batchKey];
//             Object.keys(batchData).forEach(assignment => {
//                 // Push combined label of batch and assignment
//                 labels.push(`${assignment}\n(${batchKey})`);
//                 completedData.push(batchData[assignment]['Completed'] || 0);
//                 inProgressData.push(batchData[assignment]['In progress'] || 0);
//                 notStartedData.push(batchData[assignment]['Not Started'] || 0);
//             });
//         });

//         return {
//             labels, // Combined assignment and batch labels
//             datasets: [
//                 {
//                     label: 'Completed',
//                     data: completedData,
//                     backgroundColor: '#38bdf8',
//                 },
//                 {
//                     label: 'In Progress',
//                     data: inProgressData,
//                     backgroundColor: '#1d4ed8',
//                 },
//                 {
//                     label: 'Not Started',
//                     data: notStartedData,
//                     backgroundColor: '#dbeafe',
//                 },
//             ]
//         };
//     };

//     const chartData = prepareChartData(assignmentDetails);

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'right', // Display the legend on the right side, like in the image
//             },
//             tooltip: {
//                 callbacks: {
//                     label: function (tooltipItem) {
//                         const { dataset, raw } = tooltipItem;
//                         return `${dataset.label}: ${raw}`;
//                     }
//                 }
//             },
//             title: {
//                 display: true,
//                 text: 'Batchwise Assignment Tracker',
//                 font: {
//                     size: 18
//                 },
//                 padding: {
//                     top: 10,
//                     bottom: 30
//                 }
//             },
//         },
//         scales: {
//             x: {
//                 stacked: true,
//                 ticks: {
//                     autoSkip: false, // Show all labels
//                     maxRotation: 0, // Horizontal labels for better readability
//                     minRotation: 0,
//                     callback: function (value) {
//                         // Custom tick callback to group assignments per batch
//                         const batchName = chartData.labels[value].split('\n')[1];
//                         const assignmentName = chartData.labels[value].split('\n')[0];
//                         return `${assignmentName} (${batchName})`;
//                     },
//                 },
//                 grid: {
//                     display: false,
//                 }
//             },
//             y: {
//                 stacked: true,
//                 title: {
//                     display: true,
//                     text: 'Number of Students',
//                 },
//                 grid: {
//                     display: true,
//                 }
//             },
//         },
//     };

//     return (
//         <div style={{ width: '100%', height: '400px' }}>
//             <Bar data={chartData} options={options} />
//         </div>
//     );
// };

// export default Batch_Assign_Track;





// import React, { useState, useEffect } from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import Highcharts3D from 'highcharts/highcharts-3d';
// import axios from 'axios';
// import { api2 } from '../../../ApiUrl/ApiUrl';

// // Initialize 3D module
// Highcharts3D(Highcharts);

// const Batch_Assign_Track = () => {
//   const [assignmentDetails, setAssignmentDetails] = useState([]);

//   const BatchWiseNoOfAssignments = (email) => {
//     axios.post(`${api2}/dashboard/getBatchWiseAllAssignmentTracker`, { mentorEmail: email })
//       .then((response) => {
//         setAssignmentDetails(response?.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     BatchWiseNoOfAssignments(localStorage.getItem('mentorEmail'));
//   }, []);

//   // Prepare data for Highcharts
//   const prepareChartData = (data) => {
//     const categories = [];
//     const series = {
//       'Completed': [],
//       'In progress': [],
//       'Not Started': []
//     };

//     Object.keys(data)?.forEach(batchKey => {
//       const batchData = data[batchKey];
//       Object.keys(batchData).forEach(assignment => {
//         if (!categories.includes(`${batchKey}: ${assignment}`)) {
//           categories.push(`${batchKey}: ${assignment}`);
//         }
//         Object.keys(series).forEach(status => {
//           series[status].push(batchData[assignment][status]);
//         });
//       });
//     });

//     return { categories, series };
//   };

//   const { categories, series } = prepareChartData(assignmentDetails);

//   const options = {
//     chart: {
//       type: 'column',
//       options3d: {
//         enabled: true,
//         alpha: 0,
//         beta: 0,
//         depth: 30,
//         viewDistance: 25,
//       }
//     },
//     credits: {
//       enabled: false
//     },
//     title: {
//       text: null,
//       align: 'left'
//     },
//     xAxis: {
//       categories: categories, // Combined categories (batch -> assignment)
//       title: {
//         text: null
//       },
//       labels: {
//         rotation: -45,
//         align: 'right'
//       }
//     },
//     yAxis: {
//       min: 0,
//       title: {
//         text: null
//       },
//       stackLabels: {
//         enabled: true,
//         style: {
//           fontWeight: 'bold',
//           color: (Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || 'gray'
//         }
//       }
//     },
//     tooltip: {
//       formatter: function () {
//         return `<b>${this.x}</b><br/>${this.series.name}: ${this.y}`;
//       }
//     },
//     plotOptions: {
//       column: {
//         stacking: 'normal', // Stack the sections within each bar
//         depth: 40, // 3D depth for each column
//         dataLabels: {
//           enabled: true
//         }
//       }
//     },
//     series: [
//       {
//         name: 'Completed',
//         data: series.Completed,
//         color: '#38bdf8' // Green for Completed
//       },
//       {
//         name: 'In Progress',
//         data: series['In progress'],
//         color: '#1d4ed8' // Blue for In Progress
//       },
//       {
//         name: 'Not Started',
//         data: series['Not Started'],
//         color: '#dbeafe' // Light blue for Not Started
//       }
//     ]
//   };

//   return (
//     <div>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//     </div>
//   );
// };

// export default Batch_Assign_Track;


