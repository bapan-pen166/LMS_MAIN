import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { api2 } from '../../ApiUrl/ApiUrl';



const Batch_Wise_Course_Percent = () => {
  const [classes, setClasses] = useState([]);
  const [mail, setMail] = useState('');

  const batchWiseApi = () => {
     axios.post(`${api2}/mentor/getBatchWiseStudent`, { email: mail })
        .then((response) => {
           setClasses(response?.data?.result);
        })
        .catch((error) => {
           console.log(error);
        });
  };
  useEffect(() => {
      setMail(localStorage.getItem('mentorEmail'));
   }, []);

  // batch wise number of assignments 

  const [BatchData, setBatchData] = useState([]);

  const BatchWiseNoOfAssignments = (email) => {
     axios.post(`${api2}/dashboard/getAllCourseCompletionReport`, { mentorEmail: email })
        .then((response) => {
          setBatchData(response?.data);
        })
        .catch((error) => {
           console.log(error);
        });
  };

  useEffect(()=>{BatchWiseNoOfAssignments(localStorage.getItem('mentorEmail'))},[])




  
 


  useEffect(() => {
     if (mail) {
        batchWiseApi();
     }
  }, [mail]);
  const [showModal, setShowModal] = useState(false);
  const modalClose=()=>setShowModal(false);
  const modalShow=()=>setShowModal(true);
  const [batchId,setBatchId]=useState('');

  const generateChartData = () => {

   const data = BatchData.map(batch => ({
       name: batch.name,
       y: batch.y,
       events: {
        click: () => {modalShow()
           setBatchId(batch.id)
          //  setBatchName(batch.name)
          //  handlebatchAssignmentScore(mail)
          //  handlebatchFeedAndAttendance(mail,batch.name)
          //  handlebatchAvgTestScore(mail,batch.name)
          //  handleperformance(mail,batch.name)
          //  handleStudentAsperformance(mail,batch.name)
          //  batchWiseCertElgCount(mail,batch.name)
          //  batchWiseAssignmentPassFail(mail,batch.name)
          //  handlebatchWiseCourseCompletion(mail,batch.name)
        }, // Trigger modal with batch id
      },
    }));

  

     return data;
  };

  const options = {
     chart: {
        type: 'column'
     },
     title: {
        text: null
     },
     accessibility: {
        announceNewData: {
           enabled: true
        }
     },
     xAxis: {
        type: 'category',
        gridLineWidth: 0
     },
     yAxis: {
        title: {
           text:null
        },
        min: 0,
        gridLineWidth: 0
     },
     legend: {
        enabled: false
     },
     plotOptions: {
        series: {
           borderWidth: 0,
           dataLabels: {
              enabled: true,
              format: '{point.y} %'
           }
        }
     },
     tooltip: {
        headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
     },
     series: [
        {
           name: 'Activity',
           colorByPoint: true,
           data: generateChartData()
        }
     ],
     credits: {
        enabled: false
     }
  };

  return (
     <div>
        <HighchartsReact
           highcharts={Highcharts}
           options={options}
        />
       
     </div>
  );
}

export default Batch_Wise_Course_Percent;

// import React, { useState, useEffect } from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import Highcharts3D from 'highcharts/highcharts-3d';
// import axios from 'axios';
// import { api2 } from '../../ApiUrl/ApiUrl';

// Highcharts3D(Highcharts);

// const Batch_Wise_Course_Percent = () => {
//   const [classes, setClasses] = useState([]);
//   const [mail, setMail] = useState('');
//   const [BatchData, setBatchData] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [batchId, setBatchId] = useState('');

//   useEffect(() => {
//     setMail(localStorage.getItem('mentorEmail'));
//   }, []);

//   const batchWiseApi = () => {
//     axios.post(`${api2}/mentor/getBatchWiseStudent`, { email: mail })
//       .then((response) => {
//         setClasses(response?.data?.result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const BatchWiseNoOfAssignments = (email) => {
//     axios.post(`${api2}/dashboard/getAllCourseCompletionReport`, { mentorEmail: email })
//       .then((response) => {
//         setBatchData(response?.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   useEffect(() => {
//     if (mail) {
//       batchWiseApi();
//       BatchWiseNoOfAssignments(mail);
//     }
//   }, [mail]);

//   const modalClose = () => setShowModal(false);
//   const modalShow = () => setShowModal(true);

//   const generateChartData = () => {
//     return BatchData.map(batch => ({
//       name: batch.name,
//       y: batch.y,
//       events: {
//         click: () => {
//           modalShow();
//           setBatchId(batch.id);
//           // Additional actions based on batch ID can be placed here
//         },
//       },
//     }));
//   };

//   const options = {
//     chart: {
//       type: 'column',
//       options3d: {
//         enabled: true,
//         alpha: 0,
//         beta: 0,
//         viewDistance: 25,
//         depth: 30,
//       },
//     },
//     title: {
//       text: null,
//     },
//     xAxis: {
//       type: 'category',
//       gridLineWidth: 0,
//       labels: {
//         skew3d: true,
//         style: {
//           fontSize: '16px',
//         },
//       },
//     },
//     yAxis: {
//       title: {
//         text: null,
//         skew3d: true,
//         style: {
//           fontSize: '16px',
//         },
//       },
//       min: 0,
//       gridLineWidth: 0,
//     },
//     legend: {
//       enabled: false,
//     },
//     plotOptions: {
//       column: {
//         depth: 40,
//         stacking: 'normal',
//       },
//       series: {
//         borderWidth: 0,
//         dataLabels: {
//           enabled: true,
//           format: '{point.y} %',
//         },
//       },
//     },
//     tooltip: {
//       headerFormat: '<b>{point.key}</b><br>',
//       pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y}',
//     },
//     series: [
//       {
//         name: 'Activity',
//         colorByPoint: true,
//         data: generateChartData(),
//       },
//     ],
//     credits: {
//       enabled: false,
//     },
//   };

//   return (
//     <div>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//     </div>
//   );
// };

// export default Batch_Wise_Course_Percent;
