import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { api } from '../../ApiUrl/ApiUrl';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Cert_Elegible_chart from './mentor_dashboard/Cert_Elegible_chart';
import Assignment_Summery from './mentor_dashboard/Assignment_Summery';
import { Feedback, Height } from '@mui/icons-material';
// import Course_Completion from './mentor_dashboard/Course_Completion';
import Course_Completion from './mentor_dashboard/Course_Completion';

const BatchWiseNoOfClasses = () => {
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

   // assignment score count batchwise 
   const [batchName,setBatchName]=useState('')
   const [assignmentScore, setAssignmentScore] = useState('');

   const handlebatchAssignmentScore = (email) => {
      console.log('assignment score called')
      axios.post(`${api}/dashboard/getBatchWiseAssignmentData`, { mentorEmail: email })
         .then((response) => {
            console.log(response.data[0])
            setAssignmentScore(response?.data[0]?.totalAverageBatchAssignmentPerformance);
         })
         .catch((error) => {
            console.log(error);
         });
   };
   useEffect(()=>{console.log(assignmentScore)},[assignmentScore])

   useEffect(() => {
      setMail(localStorage.getItem('mentorEmail'));
   }, []);
   const [averagefeedback,setFeedback]=useState('');
   const [attendance,setAttendance]=useState('');

   // batch average feedback and attendance
   const handlebatchFeedAndAttendance = (email,batch) => {
      console.log('assignment score called')
      axios.post(`${api}/dashboard/getBatchWiseAttendanceData`, { mentorEmail: email, batch: batch })
         .then((response) => {
            console.log(response.data)
            setAttendance(response?.data.batchAverageAttendance);
            setFeedback(response?.data.batchAverageFeedback)
            
         })
         .catch((error) => {
            console.log(error);
         });
   };
   // useEffect(()=>{console.log(assignmentScore)},[assignmentScore])
   
   // test score
   const [testScore,setTestScore]=useState('') 
   const handlebatchAvgTestScore = (email,batch) => {
      // console.log('assignment score called')
      axios.post(`${api}/dashboard/getBatchWiseTestData`, { mentorEmail: email, batch: batch })
         .then((response) => {
            console.log(response.data)
            setTestScore(response?.data.totalAverageBatchTestPerformance);
           
            
         })
         .catch((error) => {
            console.log(error);
         });
   };
   
   // overall performance 

   const [overallperformance,setOverallPerformance]=useState('') 
   const handleperformance = (email,batch) => {
      // console.log('assignment score called')
      axios.post(`${api}/dashboard/getBatchOverallPerformance`, { mentorEmail: email, batch: batch })
         .then((response) => {
            console.log(response.data)
            setOverallPerformance(response?.data.overallPerformance);
           
            
         })
         .catch((error) => {
            console.log(error);
         });
   };

   // Top and Bottom student list 

   const [TopStudentsPerformance,setTopStudentsPerformance]=useState([])
   const [BottomStudentsPerformance,setBottomStudentsPerformance]=useState([])
   const handleStudentAsperformance = (email,batch) => {
      // console.log('assignment score called')
      axios.post(`${api}/dashboard/getStudentsRatingPerformances`, { mentorEmail: email, batch: batch })
         .then((response) => {
            console.log(response.data)
            setTopStudentsPerformance(response?.data.top_3_students.sort((a,b)=>b.overallScore-a.overallScore));
            setBottomStudentsPerformance(response?.data.bottom_3_students.sort((a,b)=>a.overallScore-b.overallScore));
           
            
         })
         .catch((error) => {
            console.log(error);
         });
   };
   // useEffect(()=>{console.log(TopStudentsPerformance)},[TopStudentsPerformance])
   // useEffect(()=>{console.log(BottomStudentsPerformance)},[BottomStudentsPerformance])

   // Certificate eligible chart data 
   const [certElgData,setChartElgData]=useState({});
   const batchWiseCertElgCount = (email,batch) => {
      axios.post(`${api}/dashboard/getCertificateEligiblityData`, { mentorEmail: email, batch: batch})
         .then((response) => {
            setChartElgData(response?.data);
         })
         .catch((error) => {
            console.log(error);
         });
   };
   useEffect(()=>{console.log(certElgData)},[certElgData])


   // Assignment pass and fail percentage 
   const [assignmentPass,setAssignmentPass]=useState(100);
   const [assignmentFail,setAssignmentFail]=useState(30);
   const batchWiseAssignmentPassFail = (email,batch) => {
      axios.post(`${api}/dashboard/getBatchAssignmentReport`, { mentorEmail: email, batch: batch})
         .then((response) => {
            setAssignmentPass(response?.data?.percentage_pass);
            setAssignmentFail(response?.data?.percentage_fail);
         })
         .catch((error) => {
            console.log(error);
         });
   };
   useEffect(()=>{console.log(certElgData)},[certElgData])

   const[percentage,setpercentage]=useState(85)
    const handlebatchWiseCourseCompletion = (email,batch) => {
        axios.post(`${api}/dashboard/getCourseCompletion`, { mentorEmail: email, batch: batch })
           .then((response) => {
            setpercentage(response?.data?.completion_percentage);
           })
           .catch((error) => {
              console.log(error);
           });
     };
   //   useEffect(() => {
   //      handlebatchWiseCourseCompletion(localStorage.getItem('mentorEmail'));
   //  }, []);


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

    const data = classes.map(batch => ({
        name: batch.name,
        y: batch.y,
        events: {
         click: () => {modalShow()
            setBatchId(batch.id)
            setBatchName(batch.name)
            handlebatchAssignmentScore(mail)
            handlebatchFeedAndAttendance(mail,batch.name)
            handlebatchAvgTestScore(mail,batch.name)
            handleperformance(mail,batch.name)
            handleStudentAsperformance(mail,batch.name)
            batchWiseCertElgCount(mail,batch.name)
            batchWiseAssignmentPassFail(mail,batch.name)
            handlebatchWiseCourseCompletion(mail,batch.name)
         }, // Trigger modal with batch id
       },
     }));

   //  const overall = data.reduce((sum, batch) => sum + batch.y, 0);
      
   //    data.push({
   //       name: 'Overall',
   //       y: overall
   //    });

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
         gridLineWidth: 0, 
      },
      yAxis: {
         title: {
            text: null
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
         <Modal show={showModal} onHide={modalClose} backdrop="static"
        keyboard={false}
        size='xl'>
        <Modal.Body>
          <div className='container-fluid'>
            <div className='row'>
               <div className='col-md-2 p-2'>
                <p style={{fontSize:'24px',fontWeight:'bold',paddingLeft:'10px',paddingTop:'15px',display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>{batchName}</p>  
               </div>
               <div className='col-md-4' style={{textAlign:'center',paddingTop:'25px'}}>
               <p style={{fontSize:'18px',fontWeight:'bold'}}>Course Progress</p>
                  <Course_Completion percentage={percentage}/>
                  
               </div>
               <div className='offset-md-6'>

               </div>
               <div className='col-md-12 p-2 d-flex justify-content-around'>
                  <div style={{minHeight:'150px', minWidth:'150px',background:'#bbf7d0',borderRadius:'20px',textAlign:'center'}}>
                     <div style={{paddingTop:'10px'}}>
                     <span style={{fontSize:'13px',fontWeight:'bold'}}>Batch Attendance</span>
                     <p style={{fontSize:'40px',fontWeight:'bold'}}>{attendance}%</p>
                     </div>
                  </div>
                  <div style={{minHeight:'150px', minWidth:'150px',background:'#e0f2fe',borderRadius:'20px',textAlign:'center'}}>
                     <div style={{paddingTop:'10px'}}>
                     <span style={{fontSize:'13px',fontWeight:'bold'}}>Rating</span>
                     <p style={{fontSize:'40px',fontWeight:'bold'}}>{averagefeedback}</p>
                     </div>
                  </div>
                  <div style={{minHeight:'150px', minWidth:'150px',background:'#fef9c3',borderRadius:'20px',textAlign:'center'}}>
                     <div style={{paddingTop:'10px'}}>
                     <span style={{fontSize:'13px',fontWeight:'bold'}}>Overall Performance</span>
                     <p style={{fontSize:'40px',fontWeight:'bold'}}>{overallperformance}%</p>
                     </div>
                  </div>
                  <div style={{minHeight:'150px', minWidth:'150px',background:'#fee2e2',borderRadius:'20px',textAlign:'center'}}>
                     <div style={{paddingTop:'10px'}}>
                     <span style={{fontSize:'13px',fontWeight:'bold'}}>Assignment Score</span>
                     <p style={{fontSize:'40px',fontWeight:'bold'}}>{assignmentScore}%</p>
                     </div>
                  </div>
                  <div style={{minHeight:'150px', minWidth:'150px',background:'#ccfbf1',borderRadius:'20px',textAlign:'center'}}>
                     <div style={{paddingTop:'10px'}}>
                     <span style={{fontSize:'13px',fontWeight:'bold'}}>Test Score</span>
                     <p style={{fontSize:'40px',fontWeight:'bold'}}>{testScore}%</p>
                     </div>
                  </div>
               </div>
               <div className='col-md-4 p-2'>
               <Cert_Elegible_chart certElgData={certElgData}/>
               </div>
               <div className='col-md-4  d-flex justify-content-between' style={{paddingLeft:'0px',paddingRight:'0px'}}>
                  <div className='col-md-6 ' style={{paddingLeft:'0px',paddingRight:'0px'}}>
                    <p style={{fontSize:'18px',fontWeight:"bold",paddingTop:'15px',paddingBottom:'40px',paddingLeft:'20px'}}>Top Students</p>
                    {TopStudentsPerformance?.map(students=>{
                        return(
                        <div className='d-flex justify-content-center pt-3'>
                        <div className='col-md-4' style={{paddingLeft:'2px'}}>
                           <i class="fa fa-graduation-cap" style={{height:'50px',width:'50px',fontSize:'30px',borderRadius:'50%', border: '2px solid black',display: 'inline-block',textAlign: 'center',lineHeight: '50px' }}></i>
                        </div>
                        <div className='col-md-8' style={{paddingLeft:'0px',paddingRight:'0px'}}>
                        <p style={{fontWeight:'bold',fontSize:'14px',marginBottom:'0',wordWrap:'break-word'}}>{students?.userName}</p>
                        <span style={{paddingLeft:'5px',fontSize:'12px'}}>{students?.overallScore}%</span> 
                        </div>
                        </div>
                        )
                     })} 
                 
                     
                  </div>
                  <div className='col-md-6'>
                     <p style={{fontSize:'18px',fontWeight:"bold",paddingTop:'15px',paddingBottom:'40px',paddingLeft:'13px'}}>Below Students</p> 
                   
                      {BottomStudentsPerformance?.map(students=>{
                        return(
                        <div className='d-flex justify-content-center pt-3'>
                        <div className='col-md-4' style={{paddingLeft:'2px'}}>
                        <i className="fa fa-exclamation-triangle" style={{height:'50px',width:'50px',fontSize:'30px',borderRadius:'50%', border: '2px solid black',display: 'inline-block',textAlign: 'center',lineHeight: '50px' }}></i>
                        </div>
                        <div className='col-md-8' style={{paddingLeft:'5px',paddingRight:'0px'}}>
                        <p style={{fontWeight:'bold',fontSize:'14px',marginBottom:'0',wordWrap:'break-word'}}>{students?.userName}</p>
                        <span style={{paddingLeft:'5px',fontSize:'12px'}}>{students?.overallScore}%</span> 
                        </div>
                        </div>
                        )
                     })} 
                     
                    
                  </div>
                  
                  
                  
               </div>
               <div className='col-md-4 p-2'>
               <Assignment_Summery assignmentPass={assignmentPass} assignmentFail={assignmentFail}/>
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

export default BatchWiseNoOfClasses;




// import React, { useState, useEffect } from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import axios from 'axios';
// import { api } from '../../ApiUrl/ApiUrl';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// import { Modal, Button } from 'react-bootstrap';
// import Cert_Elegible_chart from './mentor_dashboard/Cert_Elegible_chart';
// import Assignment_Summery from './mentor_dashboard/Assignment_Summery';
// import { Feedback, Height } from '@mui/icons-material';
// // import Course_Completion from './mentor_dashboard/Course_Completion';
// import Course_Completion from './mentor_dashboard/Course_Completion';
// import highcharts3d from 'highcharts/highcharts-3d'; // Import 3D module
// import Cylinder from 'highcharts/modules/cylinder';


// // Initialize the 3D module
// highcharts3d(Highcharts);
// Cylinder(Highcharts);

// const BatchWiseNoOfClasses = () => {
//    const [classes, setClasses] = useState([]);
//    const [mail, setMail] = useState('');

//    const batchWiseApi = () => {
//       axios.post(`${api}/mentor/getBatchWiseStudent`, { email: mail })
//          .then((response) => {
//             setClasses(response?.data?.result);
//          })
//          .catch((error) => {
//             console.log(error);
//          });
//    };

//    // assignment score count batchwise 
//    const [batchName,setBatchName]=useState('')
//    const [assignmentScore, setAssignmentScore] = useState('');

//    const handlebatchAssignmentScore = (email) => {
//       console.log('assignment score called')
//       axios.post(`${api}/dashboard/getBatchWiseAssignmentData`, { mentorEmail: email })
//          .then((response) => {
//             console.log(response.data[0])
//             setAssignmentScore(response?.data[0]?.totalAverageBatchAssignmentPerformance);
//          })
//          .catch((error) => {
//             console.log(error);
//          });
//    };
//    useEffect(()=>{console.log(assignmentScore)},[assignmentScore])

//    useEffect(() => {
//       setMail(localStorage.getItem('mentorEmail'));
//    }, []);
//    const [averagefeedback,setFeedback]=useState('');
//    const [attendance,setAttendance]=useState('');

//    // batch average feedback and attendance
//    const handlebatchFeedAndAttendance = (email,batch) => {
//       console.log('assignment score called')
//       axios.post(`${api}/dashboard/getBatchWiseAttendanceData`, { mentorEmail: email, batch: batch })
//          .then((response) => {
//             console.log(response.data)
//             setAttendance(response?.data.batchAverageAttendance);
//             setFeedback(response?.data.batchAverageFeedback)
            
//          })
//          .catch((error) => {
//             console.log(error);
//          });
//    };
//    // useEffect(()=>{console.log(assignmentScore)},[assignmentScore])
   
//    // test score
//    const [testScore,setTestScore]=useState('') 
//    const handlebatchAvgTestScore = (email,batch) => {
//       // console.log('assignment score called')
//       axios.post(`${api}/dashboard/getBatchWiseTestData`, { mentorEmail: email, batch: batch })
//          .then((response) => {
//             console.log(response.data)
//             setTestScore(response?.data.totalAverageBatchTestPerformance);
           
            
//          })
//          .catch((error) => {
//             console.log(error);
//          });
//    };
   
//    // overall performance 

//    const [overallperformance,setOverallPerformance]=useState('') 
//    const handleperformance = (email,batch) => {
//       // console.log('assignment score called')
//       axios.post(`${api}/dashboard/getBatchOverallPerformance`, { mentorEmail: email, batch: batch })
//          .then((response) => {
//             console.log(response.data)
//             setOverallPerformance(response?.data.overallPerformance);
           
            
//          })
//          .catch((error) => {
//             console.log(error);
//          });
//    };

//    // Top and Bottom student list 

//    const [TopStudentsPerformance,setTopStudentsPerformance]=useState([])
//    const [BottomStudentsPerformance,setBottomStudentsPerformance]=useState([])
//    const handleStudentAsperformance = (email,batch) => {
//       // console.log('assignment score called')
//       axios.post(`${api}/dashboard/getStudentsRatingPerformances`, { mentorEmail: email, batch: batch })
//          .then((response) => {
//             console.log(response.data)
//             setTopStudentsPerformance(response?.data.top_3_students.sort((a,b)=>b.overallScore-a.overallScore));
//             setBottomStudentsPerformance(response?.data.bottom_3_students.sort((a,b)=>a.overallScore-b.overallScore));
           
            
//          })
//          .catch((error) => {
//             console.log(error);
//          });
//    };
//    // useEffect(()=>{console.log(TopStudentsPerformance)},[TopStudentsPerformance])
//    // useEffect(()=>{console.log(BottomStudentsPerformance)},[BottomStudentsPerformance])

//    // Certificate eligible chart data 
//    const [certElgData,setChartElgData]=useState({});
//    const batchWiseCertElgCount = (email,batch) => {
//       axios.post(`${api}/dashboard/getCertificateEligiblityData`, { mentorEmail: email, batch: batch})
//          .then((response) => {
//             setChartElgData(response?.data);
//          })
//          .catch((error) => {
//             console.log(error);
//          });
//    };
//    useEffect(()=>{console.log(certElgData)},[certElgData])


//    // Assignment pass and fail percentage 
//    const [assignmentPass,setAssignmentPass]=useState(100);
//    const [assignmentFail,setAssignmentFail]=useState(30);
//    const batchWiseAssignmentPassFail = (email,batch) => {
//       axios.post(`${api}/dashboard/getBatchAssignmentReport`, { mentorEmail: email, batch: batch})
//          .then((response) => {
//             setAssignmentPass(response?.data?.percentage_pass);
//             setAssignmentFail(response?.data?.percentage_fail);
//          })
//          .catch((error) => {
//             console.log(error);
//          });
//    };
//    useEffect(()=>{console.log(certElgData)},[certElgData])

//    const[percentage,setpercentage]=useState(85)
//     const handlebatchWiseCourseCompletion = (email,batch) => {
//         axios.post(`${api}/dashboard/getCourseCompletion`, { mentorEmail: email, batch: batch })
//            .then((response) => {
//             setpercentage(response?.data?.completion_percentage);
//            })
//            .catch((error) => {
//               console.log(error);
//            });
//      };
//    //   useEffect(() => {
//    //      handlebatchWiseCourseCompletion(localStorage.getItem('mentorEmail'));
//    //  }, []);


//    useEffect(() => {
//       if (mail) {
//          batchWiseApi();
//       }
//    }, [mail]);
//    const [showModal, setShowModal] = useState(false);
//    const modalClose=()=>setShowModal(false);
//    const modalShow=()=>setShowModal(true);
//    const [batchId,setBatchId]=useState('');

//    const generateChartData = () => {

//     const data = classes.map(batch => ({
//         name: batch.name,
//         y: batch.y,
//         events: {
//          click: () => {modalShow()
//             setBatchId(batch.id)
//             setBatchName(batch.name)
//             handlebatchAssignmentScore(mail)
//             handlebatchFeedAndAttendance(mail,batch.name)
//             handlebatchAvgTestScore(mail,batch.name)
//             handleperformance(mail,batch.name)
//             handleStudentAsperformance(mail,batch.name)
//             batchWiseCertElgCount(mail,batch.name)
//             batchWiseAssignmentPassFail(mail,batch.name)
//             handlebatchWiseCourseCompletion(mail,batch.name)
//          }, // Trigger modal with batch id
//        },
//      }));

//    //  const overall = data.reduce((sum, batch) => sum + batch.y, 0);
      
//    //    data.push({
//    //       name: 'Overall',
//    //       y: overall
//    //    });

//       return data;
//    };

//   const options = {
//     chart: {
//       type: 'cylinder',  // Set the chart type to cylinder
//       options3d: {
//         enabled: true,
//         alpha: 15,   // Control the tilt of the chart
//         beta: 0,    // Control the rotation of the chart
//         depth: 50,   // Depth of the 3D chart
//         viewDistance: 30  // Distance of the chart from the viewer
//       }
//     },
//     title: {
//       text: ''
//     },
//     xAxis: {
//       type: 'category',
//       labels: {
//         skew3d: true,  // Skew the labels to match the 3D effect
//         style: {
//           fontSize: '15px'
//         }
//       }
//     },
//     yAxis: {
//       title: {
//         text: 'Number of Classes'
//       },
//       labels: {
//         skew3d: true  // Skew the labels to match the 3D effect
//       }
//     },
//     plotOptions: {
//       series: {
//         depth: 25,  // Depth of the cylinder
//         colorByPoint: true
//       }
//     },
//     tooltip: {
//       headerFormat: '<b>{point.name}</b><br>',
//       pointFormat: 'Classes: {point.y}'
//     },
//     series: [{
//       name: 'Classes',
//       data: generateChartData(),
//       showInLegend: false
//     }],
//     credits: {
//       enabled: false
//     }
//   };
//    return (
//       <div>
//          <HighchartsReact
//             highcharts={Highcharts}
//             options={options}
//          />
//          <Modal show={showModal} onHide={modalClose} backdrop="static"
//         keyboard={false}
//         size='xl'>
//         {/* <Modal.Header closeButton>
//           <Modal.Title>Bar Clicked</Modal.Title>
//         </Modal.Header> */}
//         <Modal.Body>
//           <div className='container-fluid'>
//             <div className='row'>
//                <div className='col-md-2 p-2'>
//                 <p style={{fontSize:'24px',fontWeight:'bold',paddingLeft:'10px',paddingTop:'15px',display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}>{batchName}</p>  
//                </div>
//                <div className='col-md-4' style={{textAlign:'center',paddingTop:'25px'}}>
//                <p style={{fontSize:'18px',fontWeight:'bold'}}>Course Progress</p>
//                   <Course_Completion percentage={percentage}/>
                  
//                </div>
//                <div className='offset-md-6'>

//                </div>
//                <div className='col-md-12 p-2 d-flex justify-content-around'>
//                   <div style={{minHeight:'150px', minWidth:'150px',background:'#bbf7d0',borderRadius:'20px',textAlign:'center'}}>
//                      <div style={{paddingTop:'10px'}}>
//                      <span style={{fontSize:'13px',fontWeight:'bold'}}>Batch Attendance</span>
//                      <p style={{fontSize:'40px',fontWeight:'bold'}}>{attendance}%</p>
//                      </div>
//                   </div>
//                   <div style={{minHeight:'150px', minWidth:'150px',background:'#e0f2fe',borderRadius:'20px',textAlign:'center'}}>
//                      <div style={{paddingTop:'10px'}}>
//                      <span style={{fontSize:'13px',fontWeight:'bold'}}>Rating</span>
//                      <p style={{fontSize:'40px',fontWeight:'bold'}}>{averagefeedback}</p>
//                      </div>
//                   </div>
//                   <div style={{minHeight:'150px', minWidth:'150px',background:'#fef9c3',borderRadius:'20px',textAlign:'center'}}>
//                      <div style={{paddingTop:'10px'}}>
//                      <span style={{fontSize:'13px',fontWeight:'bold'}}>Overall Performance</span>
//                      <p style={{fontSize:'40px',fontWeight:'bold'}}>{overallperformance}%</p>
//                      </div>
//                   </div>
//                   <div style={{minHeight:'150px', minWidth:'150px',background:'#fee2e2',borderRadius:'20px',textAlign:'center'}}>
//                      <div style={{paddingTop:'10px'}}>
//                      <span style={{fontSize:'13px',fontWeight:'bold'}}>Assignment Score</span>
//                      <p style={{fontSize:'40px',fontWeight:'bold'}}>{assignmentScore}%</p>
//                      </div>
//                   </div>
//                   <div style={{minHeight:'150px', minWidth:'150px',background:'#ccfbf1',borderRadius:'20px',textAlign:'center'}}>
//                      <div style={{paddingTop:'10px'}}>
//                      <span style={{fontSize:'13px',fontWeight:'bold'}}>Test Score</span>
//                      <p style={{fontSize:'40px',fontWeight:'bold'}}>{testScore}%</p>
//                      </div>
//                   </div>
//                </div>
//                <div className='col-md-4 p-2'>
//                <Cert_Elegible_chart certElgData={certElgData}/>
//                </div>
//                <div className='col-md-4  d-flex justify-content-between' style={{paddingLeft:'0px',paddingRight:'0px'}}>
//                   <div className='col-md-6 ' style={{paddingLeft:'0px',paddingRight:'0px'}}>
//                     <p style={{fontSize:'18px',fontWeight:"bold",paddingTop:'15px',paddingBottom:'40px',paddingLeft:'20px'}}>Top Students</p>
//                     {TopStudentsPerformance?.map(students=>{
//                         return(
//                         <div className='d-flex justify-content-center pt-3'>
//                         <div className='col-md-4' style={{paddingLeft:'2px'}}>
//                            <i class="fa fa-graduation-cap" style={{height:'50px',width:'50px',fontSize:'30px',borderRadius:'50%', border: '2px solid black',display: 'inline-block',textAlign: 'center',lineHeight: '50px' }}></i>
//                         </div>
//                         <div className='col-md-8' style={{paddingLeft:'0px',paddingRight:'0px'}}>
//                         <p style={{fontWeight:'bold',fontSize:'14px',marginBottom:'0',wordWrap:'break-word'}}>{students?.userName}</p>
//                         <span style={{paddingLeft:'5px',fontSize:'12px'}}>{students?.overallScore}%</span> 
//                         </div>
//                         </div>
//                         )
//                      })} 
                     
                     
//                   </div>
//                   <div className='col-md-6'>
//                      <p style={{fontSize:'18px',fontWeight:"bold",paddingTop:'15px',paddingBottom:'40px',paddingLeft:'13px'}}>Below Students</p> 
                     
//                       {BottomStudentsPerformance?.map(students=>{
//                         return(
//                         <div className='d-flex justify-content-center pt-3'>
//                         <div className='col-md-4' style={{paddingLeft:'2px'}}>
//                         <i className="fa fa-exclamation-triangle" style={{height:'50px',width:'50px',fontSize:'30px',borderRadius:'50%', border: '2px solid black',display: 'inline-block',textAlign: 'center',lineHeight: '50px' }}></i>
//                         </div>
//                         <div className='col-md-8' style={{paddingLeft:'5px',paddingRight:'0px'}}>
//                         <p style={{fontWeight:'bold',fontSize:'14px',marginBottom:'0',wordWrap:'break-word'}}>{students?.userName}</p>
//                         <span style={{paddingLeft:'5px',fontSize:'12px'}}>{students?.overallScore}%</span> 
//                         </div>
//                         </div>
//                         )
//                      })} 
                     
                   
//                   </div>
                  
                  
                  
//                </div>
//                <div className='col-md-4 p-2'>
//                <Assignment_Summery assignmentPass={assignmentPass} assignmentFail={assignmentFail}/>
//                </div>
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={modalClose}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       </div>
//    );
// }

// export default BatchWiseNoOfClasses;


 