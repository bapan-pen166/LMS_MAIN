import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState } from 'react';
import { api2 } from '../../../ApiUrl/ApiUrl';
import axios from 'axios';
import { api } from '../../../ApiUrl/ApiUrl';
import { Modal, Button } from 'react-bootstrap';

// const Assignment_tracker = () => {
//     const options = {
//         chart: {
//             type: 'column'
//         },
//         credits: {
//             enabled: false
//         },
//         title: {
//             text: 'Assignment Tracker',
//             // align: 'Center'
//         },
//         xAxis: {
//             categories: ['A11', 'A12', 'A13', 'A14'],
//             gridLineWidth: 0
//         },
//         yAxis: {
//             min: 0,
//             title: {
//                 text: null
//             },
//             stackLabels: {
//                 enabled: true
//             },
//             gridLineWidth: 0
//         },
//         // legend: {
//         //     align: 'left',
//         //     x: 70,
//         //     verticalAlign: 'top',
//         //     y: 70,
//         //     floating: true,
//         //     backgroundColor:
//         //         Highcharts.defaultOptions.legend.backgroundColor || 'white',
//         //     borderColor: '#CCC',
//         //     borderWidth: 1,
//         //     shadow: false
//         // },
//         tooltip: {
//             headerFormat: '<b>{point.x}</b><br/>',
//             // pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
//         },
//         plotOptions: {
//             column: {
//                 stacking: 'normal',
//                 dataLabels: {
//                     enabled: true
//                 }
//             }
//         },
//         series: [
//             {
//                 name: 'Fail',
//                 data: [68, 67, 70, 66]
//             },
//             {
//                 name: 'Pass',
//                 data: [32,33, 30, 64]
//             },
            
//         ]
//     };

//     return (
//         <div>
//             <HighchartsReact highcharts={Highcharts} options={options} />
//         </div>
//     );
// };

// export default Assignment_tracker;


// const Assignment_tracker = () => {
//     // State containing assignment data in the new format
//     const [assignmentData, setAssignmentData] = useState({
//         A11: { pass: 68, fail: 32 },
//         A12: { pass: 70, fail: 30 },
//         A13: { pass: 60, fail: 40 },
//         A14: { pass: 66, fail: 34 }
//     });


//     const handleAssignmentTracker = (email) => {
//         axios.post(`${api2}/dashboard/getAssignmentReport`, { mentorEmail: email })
//             .then((Response) => {
//                 console.log("today's meetings : ",Response?.data?.meetings);
//                 setAssignmentData(Response?.data)
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }
//     useEffect(()=>{
//         handleAssignmentTracker(localStorage.getItem('mentorEmail'));
//     },[])

//     // Extract categories and series data from the assignmentData object
//     const categories = Object.keys(assignmentData); // ['A11', 'A12', 'A13', 'A14']
//     const passData = categories.map(key => assignmentData[key].pass); // [68, 70, 60, 66]
//     const failData = categories.map(key => assignmentData[key].fail); // [32, 30, 40, 34]

//     const options = {
//         chart: {
//             type: 'column'
//         },
//         credits: {
//             enabled: false
//         },
//         title: {
//             text: null
//         },
//         xAxis: {
//             categories: categories, // Use extracted categories from state
//             gridLineWidth: 0
//         },
//         yAxis: {
//             min: 0,
//             title: {
//                 text: null
//             },
//             stackLabels: {
//                 enabled: true
//             },
//             gridLineWidth: 0
//         },
//         tooltip: {
//             headerFormat: '<b>{point.x}</b><br/>',
//         },
//         plotOptions: {
//             column: {
//                 stacking: 'normal',
//                 dataLabels: {
//                     enabled: true
//                 }
//             }
//         },
//         series: [
//             {
//                 name: 'Fail',
//                 data: failData, // Use extracted fail data from state
//                 color:'#93c5fd'
//             },
//             {
//                 name: 'Pass',
//                 data: passData, // Use extracted pass data from state
//                 color:'#3b82f6'
//             }
//         ]
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

// export default Assignment_tracker;


const Assignment_tracker = () => {
    const [classes, setClasses] = useState([]);
    const [mail, setMail] = useState('');
 
    const batchWiseApi = () => {
       axios.post(`${api}/mentor/getBatchWiseStudent`, { email: mail })
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
       axios.post(`${api}/dashboard/getBatchwiseAssignmentEachStudent`, { email: email })
          .then((response) => {
            setBatchData(response?.data?.result);
          })
          .catch((error) => {
             console.log(error);
          });
    };

    useEffect(()=>{BatchWiseNoOfAssignments(localStorage.getItem('mentorEmail'))},[])

    // getEachStudentAssignmentData          

    const [batchAssignmentDetails, setBatchAssignmentDetails] = useState([]);
 
    const BatchWiseStudentsAssignments = (batch) => {
       axios.post(`${api}/dashboard/getEachStudentAssignmentData`, { mentorEmail: mail,batch:batch })
          .then((response) => {
            setBatchAssignmentDetails(response?.data);
          })
          .catch((error) => {
             console.log(error);
          });
    };
   
 
 
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
 
     const data = BatchData?.map(batch => ({
         name: batch.name,
         y: batch.y,
         events: {
          click: () => {modalShow()
            BatchWiseStudentsAssignments(batch.name)
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
          gridLineWidth: 1, 
          gridLineColor: '#e0e0e0',
          gridLineDashStyle: 'Solid', 
       },
       legend: {
          enabled: false
       },
       plotOptions: {
          series: {
             borderWidth: 0,
             dataLabels: {
                enabled: true,
                format: '{point.y}'
             }
          }
       },
       tooltip: {
          headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
       },
       series: [
          {
             name: 'Number Of Assignments',
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
          <Modal show={showModal} onHide={modalClose} backdrop="static"
         keyboard={false}
         size='xl'>
        
         <Modal.Body>
           <div className='container-fluid'>
             <div className='row'>
             <div className=" col-md-12 col-lg-12 col-sm-12 headLineBox">
                            <h4>Students Assignments Data</h4>
                        </div>
                        
                        <div className='col-md-12'>
                            <div className="table-container" style={{ maxHeight: '100vh', overflow: 'auto' }} >
                                <div class="table-wrapper">
                                <table className="table table-bordered pt-1" >
                                    <thead style={{ position: 'sticky', top: -2, zIndex: 3 }}>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>No</th>
                                            <th style={{ textAlign: 'center' }}>Student Name</th>
                                            <th style={{ textAlign: 'center' }}>Assignment Name</th>
                                            <th style={{ textAlign: 'center' }}>Submission Date</th>
                                            <th style={{ textAlign: 'center' }}>Last Date</th>
                                            <th style={{ textAlign: 'center' }}>Total Marks</th>
                                            <th style={{ textAlign: 'center' }}>Marks</th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            batchAssignmentDetails?.map((assignment,index)=>{
                                                return(
                                                    <tr>
                                            <td>{index+1}</td>
                                            <td>{assignment?.studentName}</td>
                                            <td>{assignment?.assignmentName}</td>
                                            
                                            <td>{assignment?.submittedDate}</td>
                                            <td>{assignment?.lastDate}</td>
                                            <td>{assignment?.totalMarks}</td>
                                            <td>{assignment?.marks}</td>
                                            
                                        </tr>
                                                )
                                            })
                                        }
                                     
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
             </div>
           </div>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={modalClose}>
             Close
           </Button>
         </Modal.Footer>
       </Modal>
       </div>
    );
 }
 
 export default Assignment_tracker;