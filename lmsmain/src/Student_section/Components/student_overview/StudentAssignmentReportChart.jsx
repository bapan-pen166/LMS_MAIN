// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios'; 
// import { api } from '../../../ApiUrl/ApiUrl';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from 'chart.js';

// // Register necessary components for Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const StudentAssignmentReportChart = ({ studentEmail }) => {
//   const [assignmentData, setAssignmentData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [getBatchName, setGetBatchName] = useState();

//   const fetchAssignmentData = async () => {
//     try {
//       const response = await axios.post(`${api}/dashboard/getIndividualStudentAllAssignmentTracker`, { studentEmail, batchName: getBatchName });
//       setAssignmentData(response?.data?.assignments || []); 
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (getBatchName) {
//       fetchAssignmentData();
//     }
//   }, [getBatchName]);

//   const getBatchNM = () => {
//     axios.post(`${api}/dashboard/getStudentBatchName`, { studentEmail })
//       .then((response) => {
//         setGetBatchName(response?.data?.batch);
//       });
//   };

//   useEffect(() => {
//     getBatchNM();
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   // Processing the assignment data
//   const assignmentNames = assignmentData.map(assignment => Object.keys(assignment)[0]);
//   const notStartedData = assignmentData.map(assignment => Math.max(0, assignment[Object.keys(assignment)[0]] === 0 ? 0.5 : 0)); // Ensuring no negatives
//   const inProgressData = assignmentData.map(assignment => Math.max(0, assignment[Object.keys(assignment)[0]] === 2 ? 1 : 0));
//   const completedData = assignmentData.map(assignment => Math.max(0, assignment[Object.keys(assignment)[0]] === 1 ? 1.5 : 0));

//   const data = {
//     labels: assignmentNames,
//     datasets: [
//       {
//         label: 'Not Started',
//         data: notStartedData,
//         backgroundColor: '#6CA0DC', // Color for Not Started
//       },
//       {
//         label: 'In Progress',
//         data: inProgressData,
//         backgroundColor: '#FFD700', // Color for In Progress
//       },
//       {
//         label: 'Completed',
//         data: completedData,
//         backgroundColor: '#89CFF0', // Color for Completed
//       }
//     ],
//   };

//   const config = {
//     type: 'bar',
//     data: data,
//     options: {
//       layout: {
//         padding: {
//           top: 10, // Adjust top padding
//           bottom: 10, // Adjust bottom padding
//           left: 10, // Adjust left padding
//           right: 10, // Adjust right padding
//         }
//       },
//       plugins: {
//         title: {
//           display: true,
//           text: 'Assignment Report',
//           font: {
//             size: 24, // Increase the font size here
//           },
//         },
//       },
//       responsive: true,
//       scales: {
//         x: {
//           stacked: true,
//         },
//         y: {
//           stacked: true,
//           beginAtZero: true, // Ensure the y-axis starts at 0
//           ticks: {
//             display: false // Hide y-axis labels
//           },
//         }
//       }
//     }
//   };

//   return (
//     <div style={{ padding: '20px', margin: '0 auto' }}>
//       <Bar {...config} />
//     </div>
//   );
// };

// export default StudentAssignmentReportChart;




import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios'; 
import Highcharts3D from 'highcharts/highcharts-3d';
import { api } from '../../../ApiUrl/ApiUrl';

// Initialize the 3D module
Highcharts3D(Highcharts);

const StudentAssignmentReportChart = ({ studentEmail }) => {
  const [assignmentData, setAssignmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getBatchName, setGetBatchName] = useState();

  const fetchAssignmentData = async () => {
    try {
      const response = await axios.post(`${api}/dashboard/getIndividualStudentAllAssignmentTracker`, { studentEmail, batchName: getBatchName });
      setAssignmentData(response?.data?.assignments || []); 
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (getBatchName) {
      fetchAssignmentData();
    }
  }, [getBatchName]);

  const getBatchNM = () => {
    axios.post(`${api}/dashboard/getStudentBatchName`, { studentEmail })
      .then((response) => {
        setGetBatchName(response?.data?.batchName);
      });
  };

  useEffect(() => {
    getBatchNM();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const assignmentNames = assignmentData.map(assignment => Object.keys(assignment)[0]);
  const notStartedData = assignmentData.map(assignment => Object.values(assignment)[0] === 0 ? 0.5 : 0);
  const inProgressData = assignmentData.map(assignment => Object.values(assignment)[0] === 2 ? 1 : 0);
  const completedData = assignmentData.map(assignment => Object.values(assignment)[0] === 1 ? 1.5 : 0);

  const options = {
    chart: {
      type: 'column',
      options3d: {
        enabled: true,
        alpha: 0,
        beta: 0,
        depth: 30,
        viewDistance: 25,
      },
      width: null,
      height: 340,
    },
    title: {
      text: 'Assignment Report',
      align: 'left',
    },
    xAxis: {
      categories: assignmentNames || [],
      labels: {
        skew3d: true,
        style: {
          fontSize: '16px',
        },
      },
      gridLineWidth: 0, 
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Assignments',
      },
      labels: {
        enabled: false, // Hides the y-axis labels
      },
      gridLineWidth: 0, // Remove grid lines on y-axis
    },
    plotOptions: {
      column: {
        depth: 30,
        stacking: 'normal',
        pointPadding: 0.05,
        groupPadding: 0.05,
        borderWidth: 1,
        borderRadius: 5,
      },
    },
    series: [
      {
        name: 'Not Started',
        data: notStartedData,
        color: '#088F8F',
      },
      {
        name: 'In Progress',
        data: inProgressData,
        color: '#FFD700',
      },
      {
        name: 'Completed',
        data: completedData,
        color: '#95C1E6',
      },
    ],
    credits: {
      enabled: false,
    },
  };
  

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default StudentAssignmentReportChart;




