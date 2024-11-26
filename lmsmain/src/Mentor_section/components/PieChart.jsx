// import React from 'react';
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import { useState,useEffect } from 'react';
// import axios from 'axios';
// import { api2 } from '../../ApiUrl/ApiUrl';



// const Batch_Wise_Course_Percent = () => {
//   const [classes, setClasses] = useState([]);
//   const [mail, setMail] = useState('');

//   const batchWiseApi = () => {
//      axios.post(`${api2}/mentor/getBatchWiseStudent`, { email: mail })
//         .then((response) => {
//            setClasses(response?.data?.result);
//         })
//         .catch((error) => {
//            console.log(error);
//         });
//   };
//   useEffect(() => {
//       setMail(localStorage.getItem('mentorEmail'));
//    }, []);

//   // batch wise number of assignments 

//   const [BatchData, setBatchData] = useState([]);

//   const BatchWiseNoOfAssignments = (email) => {
//      axios.post(`${api2}/dashboard/getAllCourseCompletionReport`, { mentorEmail: email })
//         .then((response) => {
//           setBatchData(response?.data);
//         })
//         .catch((error) => {
//            console.log(error);
//         });
//   };

//   useEffect(()=>{BatchWiseNoOfAssignments(localStorage.getItem('mentorEmail'))},[])

//   useEffect(() => {
//      if (mail) {
//         batchWiseApi();
//      }
//   }, [mail]);
//   const [showModal, setShowModal] = useState(false);
//   const modalClose=()=>setShowModal(false);
//   const modalShow=()=>setShowModal(true);
//   const [batchId,setBatchId]=useState('');

//   const generateChartData = () => {

//    const data = BatchData.map(batch => ({
//        name: batch.name,
//        y: batch.y,
//        events: {
//         click: () => {modalShow()
//            setBatchId(batch.id)
//         }, // Trigger modal with batch id
//       },
//     }));

  

//      return data;
//   };

//   const options = {
//      chart: {
//         type: 'column'
//      },
//      title: {
//         text: null
//      },
//      accessibility: {
//         announceNewData: {
//            enabled: true
//         }
//      },
//      xAxis: {
//         type: 'category',
//         gridLineWidth: 0
//      },
//      yAxis: {
//         title: {
//            text:null
//         },
//         min: 0,
//         gridLineWidth: 0, 
//       //   gridLineColor: '#e0e0e0',
//       //   gridLineDashStyle: 'Solid', 
//      },
//      legend: {
//         enabled: false
//      },
//      plotOptions: {
//         series: {
//            borderWidth: 0,
//            dataLabels: {
//               enabled: true,
//               format: '{point.y} %'
//            }
//         }
//      },
//      tooltip: {
//         headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
//      },
//      series: [
//         {
//            name: 'Activity',
//            colorByPoint: true,
//            data: generateChartData()
//         }
//      ],
//      credits: {
//         enabled: false
//      }
//   };

//   return (
//      <div>
//         <HighchartsReact
//            highcharts={Highcharts}
//            options={options}
//         />
       
//      </div>
//   );
// }

// export default Batch_Wise_Course_Percent;





import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api2 } from '../../ApiUrl/ApiUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, Pagination, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { Link } from 'react-router-dom';
import "../../assets/css/Mentor_dashboard/Batch_wiseAttendance_per.css"

const Batch_Wise_Course_Percent = () => {
  const [classes, setClasses] = useState([]);
  const [mail, setMail] = useState('');
  const [BatchData, setBatchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3; // Number of items per page
  const [batchAttendance, setBatchAttendance] = useState([]);

  // Fetch mentor email from localStorage
  useEffect(() => {
    setMail(localStorage.getItem('mentorEmail'));
  }, []);

  // Fetch Batch-wise data
  const batchWiseApi = () => {
    axios.post(`${api2}/mentor/getBatchWiseStudent`, { email: mail })
      .then((response) => {
        setClasses(response?.data?.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const BatchWiseNoOfAssignments = (email) => {
    axios.post(`${api2}/dashboard/getAllCourseCompletionReport`, { mentorEmail: email })
      .then((response) => {
        setBatchData(response?.data);
        setBatchAttendance(response?.data); // Set data for pagination
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch batch data when email is set
  useEffect(() => {
    if (mail) {
      batchWiseApi();
      BatchWiseNoOfAssignments(mail);
    }
  }, [mail]);

  // Pagination handler
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the items to show based on pagination
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = batchAttendance.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="card-body pr-0 pt-4 box-shadow mt-2" style={{height:"400px"}}>
    <div className="pr-3">
        {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
                <div key={index} className="d-flex align-items-center mb-30 gap-items-3 justify-content-between hover-effect">
                    <div className="d-flex align-items-center fw-500">
                        <div className="me-8 w-50 d-table">
                            {/* Replace with appropriate icon if needed */}
                            <span  className="display-6 lh-1 text-orange mb-0 mr-5"><FontAwesomeIcon style={{color:"green"}} icon={faUserCheck} /></span>
                        </div>
                        <div>
                            <p  className="text-dark hover-primary mb-2 d-block fs-16">
                                {item.name}
                            </p>
                            <div className="w-200">
                                <div className="progress progress-sm mb-0">
                                    <div
                                        className="progress-bar progress-bar-primary progress-bar-striped progress-bar-animated"
                                        role="progressbar"
                                        aria-valuenow={item.y}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                        style={{ width: `${item.y}%` }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-end">
                        <h5 className="fw-600 mb-0 badge badge-pill badge-primary mt-4">
                            {item.y}%
                        </h5>
                    </div>
                </div>
            ))
        ) : (
            <p>No data available</p>
        )}
        {/* Pagination Component */}
        {batchAttendance?.length > ITEMS_PER_PAGE && (
            <div className="d-flex justify-content-center mt-4">
                <Pagination
                    count={Math.ceil(batchAttendance?.length / ITEMS_PER_PAGE)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>
        )}
    </div>
</div>   


  
  
  );
};

export default Batch_Wise_Course_Percent;
