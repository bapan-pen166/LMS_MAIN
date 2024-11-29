// import React, { useEffect, useState } from 'react'
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import axios from 'axios';
// import { api2 } from '../../ApiUrl/ApiUrl';


// const Batch_wise_attendance_percentage = () => {

//     // getBatchWiseAttendanceReport 
//     const [batchAttendance,setBatchAttendance]=useState('');
//     const batchWiseAttendanceReport = (email) => {
//         axios.post(`${api2}/dashboard/getBatchWiseAttendanceReport`, { mentorEmail: email })
//            .then((response) => {
//             setBatchAttendance(response?.data?.result);
//            })
//            .catch((error) => {
//               console.log(error);
//            });
//      };

//      useEffect(()=>{
//         batchWiseAttendanceReport(localStorage.getItem('mentorEmail'))
//      },[])
//     const options = {
//         chart: {
//             type: 'column'
//         },
//         title: {
//             text: ''
//         },
//         accessibility: {
//             announceNewData: {
//                 enabled: true
//             }
//         },
//         xAxis: {
//             type: 'category',
//             gridLineWidth: 0
//         },
//         yAxis: {
//             title: {
//                 text: ''
//             },
//             min: 0,
//             max: 100, 
//             gridLineWidth: 0, 
//             // gridLineColor: '#e0e0e0',
//             // gridLineDashStyle: 'Solid', 
//         },
//         legend: {
//             enabled: false,
//             itemStyle: {
//                 fontSize: '12px'
//               }
//         },
//         plotOptions: {
//             series: {
//                 borderWidth: 0,
//                 dataLabels: {
//                     enabled: true,
//                     format: '{point.y:.1f}%' // Format data labels with one decimal place
//                 },

//             }
//         },
//         tooltip: {
//             headerFormat: '<span style="font-size:11px">{point.name}</span><br>',
//             // pointFormat: 'Students: <b>{point.y}</b><br/>Click to show names of the users.'
//         },
//         series: [
//             {
//                 name: 'Activity',
//                 colorByPoint: true,
//                 // data: [
//                 //     {
//                 //         name: '2024_Nickel_M5',
//                 //         y: 36,
//                 //     },
//                 //     {
//                 //         name: 'SELENIUM',
//                 //         y: 76,
//                 //     },
//                 //     {
//                 //         name: 'TSA MANGANESE(MEP)',
//                 //         y: 41,
//                 //     },
//                 //     {
//                 //         name: 'Overall',
//                 //         y: 59,
//                 //     }
//                 // ]
//                 data:batchAttendance
//             }
//         ],
//         credits: {
//             enabled: false
//         }
//     };

//     return (
//         <div>
//             <HighchartsReact
//                 highcharts={Highcharts}
//                 options={options}
//             />
//         </div>
//     )
// }

// export default Batch_wise_attendance_percentage;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { api2 } from '../../ApiUrl/ApiUrl';

// const Batch_wise_attendance_percentage = () => {
//     // State to store batch attendance data
//     const [batchAttendance, setBatchAttendance] = useState([]);

//     // Fetch the batch-wise attendance report
//     const batchWiseAttendanceReport = (email) => {
//         axios.post(`${api2}/dashboard/getBatchWiseAttendanceReport`, { mentorEmail: email })
//            .then((response) => {
//                 setBatchAttendance(response?.data?.result || []);
//            })
//            .catch((error) => {
//                console.log(error);
//            });
//     };

//     // Use effect to trigger data fetch on component mount
//     useEffect(() => {
//         batchWiseAttendanceReport(localStorage.getItem('mentorEmail'));
//     }, []);

//     return (
//         <div className="card-body pr-0 pt-4 box-shadow mt-2">
//             <div className="pr-3">
//                 {batchAttendance.length > 0 ? (
//                     batchAttendance.map((item, index) => (
//                         <div key={index} className="d-flex align-items-center mb-30 gap-items-3 justify-content-between">
//                             <div className="d-flex align-items-center fw-500">
//                                 <div className="me-15 w-50 d-table">
//                                     {/* Replace with appropriate icon if needed */}
//                                     <img src="path/to/your/icon.png" className="avatar avatar-lg rounded-10" alt="icon" />
//                                 </div>
//                                 <div>
//                                     <a href="#" className="text-dark hover-primary mb-2 d-block fs-16">
//                                         {item.name} {/* Display the name of the batch */}
//                                     </a>
//                                     <div className="w-200">
//                                         <div className="progress progress-sm mb-0">
//                                             <div
//                                                 className="progress-bar progress-bar-primary progress-bar-striped progress-bar-animated"
//                                                 role="progressbar"
//                                                 aria-valuenow={item.y}
//                                                 aria-valuemin="0"
//                                                 aria-valuemax="100"
//                                                 style={{ width: `${item.y}%` }}
//                                             >
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="text-end">
//                                 <h5 className="fw-600 mb-0 badge badge-pill badge-primary mt-4">
//                                     {item.y}%
//                                 </h5>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No data available</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Batch_wise_attendance_percentage;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { api2 } from '../../ApiUrl/ApiUrl';
import Pagination from '@mui/material/Pagination';
import { faPeopleGroup, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../assets/css/Mentor_dashboard/Batch_wiseAttendance_per.css"

const ITEMS_PER_PAGE = 3;

const Batch_wise_attendance_percentage = () => {
    // State to store batch attendance data
    const [batchAttendance, setBatchAttendance] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch the batch-wise attendance report
    const batchWiseAttendanceReport = (email) => {
        axios.post(`${api2}/dashboard/getBatchWiseAttendanceReport`, { mentorEmail: email })
            .then((response) => {
                setBatchAttendance(response?.data?.result || []);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Use effect to trigger data fetch on component mount
    useEffect(() => {
        batchWiseAttendanceReport(localStorage.getItem('mentorEmail'));
    }, []);

    // Calculate the current data to display based on the current page
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = batchAttendance.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="card-body pr-0 " style={{ height: "400px",marginLeft:"-15px" }}>
            <div className="">
                <div style={{display:"flex",marginBottom:"10px",justifyContent:"space-between",marginTop:"-15px",marginLeft:"-5px" }}>
                    <div className='p-2' style={{ fontSize: ".9vw",marginTop:"0px",paddingTop:"0px" }}>Attendance %</div>
                    <div>
                    {batchAttendance?.length > ITEMS_PER_PAGE && (
                        <div className="d-flex justify-content-center mb-3">
                            <Pagination
                                count={Math.ceil(batchAttendance?.length / ITEMS_PER_PAGE)}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                style={{fontSize:".9vw"}}
                            />
                        </div>
                    )}
                   </div>
                </div>


                {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                        // <div key={index} className="d-flex align-items-center mb-30  justify-content-between hover-effect pr-2">
                            <div className="d-flex align-items-center mb-30  justify-content-between hover-effect p-2 flex-wrap">
                                {/* <div className="  d-table"> */}
                                    <span className="text-white mb-0" style={{
                                        width: "3vw",
                                        height: "3vw",
                                        backgroundColor: "#4BAAC8",
                                        color: "#ffffff",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "50%",
                                        fontWeight: "bold",
                                        fontSize: "2vw",
                                        margin: 0,
                                    }}>
                                        {/* <FontAwesomeIcon style={{ color: "green" }} icon={faUserCheck} /> */}
                                        {item.name.charAt(0).toUpperCase()}
                                    </span>
                                {/* </div> */}
                                <div>
                                    <p className="text-dark hover-primary mb-2 d-block fs-16">
                                        {item.name}
                                    </p>
                                    <div style={{width:"10vw"}}>
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
                                <div >
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

            </div>
        </div>
    );
};

export default Batch_wise_attendance_percentage;

