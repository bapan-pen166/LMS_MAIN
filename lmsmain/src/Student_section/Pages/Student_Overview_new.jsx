import React from 'react';
import axios from 'axios';
import { api2 } from '../../ApiUrl/ApiUrl';
import Button from '@mui/material/Button';
import attendance from "../../assets/img/student_overview/attendance.jpg"
import course_completion from "../../assets/img/student_overview/course_completion.jpg"
import exam_completion from "../../assets/img/student_overview/examp completion.jpg"
import assignment_completion from "../../assets/img/student_overview/assignment completion.jpg"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { button, Modal } from 'react-bootstrap';
import congratulation from "../../assets/img/student_overview/congratulation.gif"
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
import motivation_logo from "../../assets/img/student overview/student_overview.png"
import StudentAssignmentReportChart from '../Components/student_overview/StudentAssignmentReportChart';
import StudentOverallPerformanceChart from '../Components/student_overview/StudentOverallPerformanceChart';
import StudentTestScore from '../Components/student_overview/StudentTestScore';
import StudentClassOverview from '../Components/student_overview/StudentClassOverview';
import StudentAttendanceReport from '../Components/student_overview/StudentAttendanceReport';
import Student_Course_Completion from '../Components/student_overview/Student_Course_Completion';
import { api } from '../../ApiUrl/ApiUrl';
import cert_lock from "../../assets/img/student overview/lock_certificate.jpg"
import "../../assets/css/Student_dashboard/student_dashboard.css";
import TopBar from '../../layout/TopBar';
import SideBar from '../../layout/Sidebar_new';
import { faIdBadge, faClipboardCheck, faBookOpen, faPlay, faClock, faMedal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination } from '@mui/material';


const Student_Overview_new = () => {
    const [userType, setUserType] = useState('');


    const [percentage, setPercentage] = useState(59)

    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
    }, []);


    // for the pagination
    const [currentPageToday, setCurrentPageToday] = useState(1);
    const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
    const itemsPerPage = 3;




    const attendancePercentage = 66;
    const coursePercentage = 50;
    const examCompletionPercentage = 40;
    const assignmentCompletionPercentage = 72;

    // Got placement modal 
    const [showPlacementStatus, setPlacementStatus] = useState(false);
    const handlePlacementStatusClose = () => setPlacementStatus(false);
    const handlePlacementStatusShow = () => setPlacementStatus(true);
    const [getBatchName, setGetBatchName] = useState();

    const [placementData, setPlacementData] = useState();
    const [todaysMeetings, setTodaysMeetings] = useState();
    const [upcomingMeetings, setUpcomingMeetings] = useState();
    // 
    const [studentMail, setStudentMail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userId, setUserId] = useState()
    const [studentAttendance, setStudentAttendance] = useState();
    const [testResult, setTestResult] = useState()
    const [assignmentPercentage, setAssignmentPercentage] = useState()
    const [courseProgress, setCourseProgress] = useState();
    const [overallPerformn, setOverallPerformn] = useState();
    const [studentGrade, setStudentGrade] = useState();
    const [certificatePath, setCertificatePath] = useState();
    const [minClassToAttendToReachFifty, setMinClassToAttendToReachFifty] = useState()
    const [remainingClassesStudent, setRemainingClassesStudent] = useState();
    const [qualifiedForPlacement, setQualifiedForPlacement] = useState();

    useEffect(() => {
        setStudentMail(localStorage.getItem('studentEmail'))
        setLastName(localStorage.getItem('lastName'))
        setFirstName(localStorage.getItem('firstName'))
        setUserId(localStorage.getItem('id'))
    }, []);

    const getBatchNM = () => {
        axios.post(`${api}/dashboard/getStudentBatchName`, { studentEmail: studentMail })
            .then((Response) => {
                console.log("BatchName", Response?.data?.batch);
                setGetBatchName(Response?.data?.batch)
            })
    }

    useEffect(() => {
        if (studentMail) {
            getBatchNM()
        }
    }, [studentMail])


    const handleStudentPlacementstatus = (email) => {
        console.log('submit click');
        axios.post(`${api2}/student/getPlacementStatus`, { studentEmail: email })

            .then((Response) => {
                console.log(" data : ", Response.data);
                setPlacementData(Response.data);
                // setPlamentRoundClear(Response.data.roundsData)
                // handleMetorData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        const studentEmail = localStorage.getItem('studentEmail');
        handleStudentPlacementstatus(studentEmail)
    }, [])

    useEffect(() => {
        console.log(placementData)
        if (placementData?.statusData?.status == true) {
            handlePlacementStatusShow()
        }

    }, [placementData])
    useEffect(() => {
        if (getBatchName) {
            todaysClass();
        }
    }, [getBatchName]);

    useEffect(() => {
        if (getBatchName) {
            upcomingClass();
        }
    }, [getBatchName]);

    const getStudentAttendance = () => {
        axios.post(`${api2}/dashboard/getIndividualStudentAttendance`, { studentEmail: studentMail, batchName: getBatchName })

            .then((Response) => {
                console.log(" attendance : ", Response?.data?.attendancePercentage);
                setStudentAttendance(Response?.data?.attendancePercentage)
                // setPlacementData(Response.data);
                // setPlamentRoundClear(Response.data.roundsData)
                // handleMetorData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getTestResPer = () => {
        axios.post(`${api2}/dashboard/getIndividualStudentTestResult`, { studentEmail: studentMail, batchName: getBatchName })

            .then((Response) => {
                console.log(" test score : ", Response?.data?.averageTestMarks);
                setTestResult(Response?.data?.averageTestMarks)
                // setPlacementData(Response.data);
                // setPlamentRoundClear(Response.data.roundsData)
                // handleMetorData();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const assignmentRes = () => {

        axios.post(`${api2}/dashboard/getIndividualStudentAssignmentResult`, { studentEmail: studentMail, batchName: getBatchName })

            .then((Response) => {
                console.log(" Assignment Result ", Response?.data?.assignmentResult?.assignmentResultPercentage);
                setAssignmentPercentage(Response?.data?.assignmentResult?.assignmentResultPercentage)

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }



    const courseProgressBar = () => {

        axios.post(`${api2}/dashboard/getIndividualCourseProgressBar`, { studentEmail: studentMail, batchName: getBatchName })

            .then((Response) => {
                console.log(" course progress bar ", Response?.data?.completion_percentage);
                setCourseProgress(Response?.data?.completion_percentage);

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const getOverallPerformance = () => {
        axios.post(`${api2}/dashboard/getIndividualStudentOverallPerformanceResult`, { studentEmail: studentMail, batchName: getBatchName })

            .then((Response) => {
                console.log(" overallPerformance ", Response?.data?.overallPerformance);
                setOverallPerformn(Response?.data?.overallPerformance)

            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    const studentgrade = () => {
        axios.post(`${api2}/dashboard/getIndividualStudentGrades`, { studentEmail: studentMail, batchName: getBatchName })

            .then((Response) => {
                console.log(" student grade ", Response?.data);
                setStudentGrade(Response?.data)
                setQualifiedForPlacement(Response?.data)

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const certificate = () => {

        axios.post(`${api2}/cert/generateCertificate`, { studentEmail: studentMail })

            .then((Response) => {
                console.log(" certificate ", Response?.data);
                // setStudentGrade(Response?.data?.finalGrade)
                setCertificatePath(Response?.data)

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    const fiftyPercentPercentage = () => {
        axios.post(`${api2}/dashboard/getIndividualStudentFiftyPercentAttendanceTarget`, { studentEmail: studentMail, batchName: getBatchName })

            .then((Response) => {
                console.log(" minimum class to attend 50% ", Response?.data);
                // setStudentGrade(Response?.data?.finalGrade)
                setMinClassToAttendToReachFifty(Response?.data?.minClassToReach50)
                setRemainingClassesStudent(Response?.data?.remainingClasses)

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    useEffect(() => {
        if (getBatchName) {
            getStudentAttendance();
            getTestResPer();
            assignmentRes()
            courseProgressBar()
            getOverallPerformance();
            studentgrade()
            certificate()
            fiftyPercentPercentage()
        }
    }, [getBatchName])

    if (userType !== 'Student') {
        return (<>
            <p>This page doesn't exist!</p>
        </>);
    }






    const todaysClass = () => {
        axios.post(`${api}/dashboard/getStudentTodayClass`, { batchName: getBatchName })
            .then((Response) => {
                console.log("today's meetings : ", Response?.data);
                setTodaysMeetings(Response?.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const upcomingClass = () => {
        axios.post(`${api}/dashboard/getStudentUpcomingClasses`, { batchName: getBatchName })
            .then((Response) => {
                console.log("upcoming : ", Response?.data);
                setUpcomingMeetings(Response?.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleMeeting = (meetingLink) => {
        window.open(`${meetingLink}?username=${firstName || ''}%20${lastName || ''}_${userId}`, '_blank');
    }


    // Helper function to group meetings by date
    const groupByDate = (meetings) => {
        return meetings?.reduce((acc, meeting) => {
            const date = meeting.startDate; // Assuming `startDate` holds the date value
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(meeting);
            return acc;
        }, {}) || {}; // Return an empty object if meetings is undefined
    };

    const groupedMeetings = groupByDate(upcomingMeetings);

    const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());


    //   :::::::::::::::::::::::::::: FOR THE PAGINATION  ::::::::::::::::::::::::::::::::::::::
    const paginatedTodaysMeetings = todaysMeetings?.slice((currentPageToday - 1) * itemsPerPage, currentPageToday * itemsPerPage);
    const paginatedUpcomingMeetings = upcomingMeetings?.slice((currentPageUpcoming - 1) * itemsPerPage, currentPageUpcoming * itemsPerPage);

    const handlePageChangeToday = (_, value) => {
        setCurrentPageToday(value);
    };

    const handlePageChangeUpcoming = (_, value) => {
        setCurrentPageUpcoming(value);
    };


    return (
        <>
            {/* <SideBar /> */}

            <div className="row">

                        <div className="col-lg-4 col-md-6 col-sm-6 ">
                            <div className="card h-100">
                                <StudentTestScore />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6 ">
                            <div className="card h-100 mb-2">
                                <StudentOverallPerformanceChart />
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6 ">
                            <div className="card h-100">
                                <StudentClassOverview />
                            </div>
                        </div>

                <div className="col-lg-12 d-none">
                    <div className="mb-3 box rounded">
                        <div className="bg-blue-light rounded py-2 d-none">
                            <div className=" ">
                                <div className="px-2 line-height-2 py-0 d-flex justify-content-between align-items-center">
                                    <h6 className=" mb-0 custom-card-header text-dark">Attendance</h6>
                                    <a href="#" className="btn btn-link p-0 mb-0">View all</a>
                                </div>
                                <div className="card-body pr-0">
                                    <div className="row">
                                        <div className="col-lg-8 p-0">
                                            <div className="progress">
                                                {/* <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${studentAttendance}%` }}></div> */}
                                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `50%` }}></div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 px-0 text-right line-height-1 ">
                                            <span className='badge-primary'>50%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    {/* Counter item*/}
                    
                </div>
                
            </div>
            <div className="row">
                <div className="col-lg-6 mt-4">
                    <div className="">
                        <div className="bg-success rounded py-2">
                                <div className=" ">
                                    <div className="px-2 line-height-2 py-0 d-flex justify-content-between align-items-center">
                                        <h6 className=" mb-0 custom-card-header text-dark">Course Progress</h6>
                                    </div>
                                    <div className="card-body pr-0">
                                        <div className="row">
                                            <div className="col-lg-8 p-0">
                                                <div className="progress">

                                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `50%` }}></div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 px-0 text-right line-height-1 ">
                                                <span className='badge-success px-2 rounded py-1'>37%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mt-4">
                    <div className="">
                        <div className="bg-success rounded py-2">
                                <div className=" ">
                                    <div className="px-2 line-height-2 py-0 d-flex justify-content-between align-items-center">
                                        <h6 className=" mb-0 custom-card-header text-dark">Attendance Progress</h6>
                                    </div>
                                    <div className="card-body pr-0">
                                        <div className="row">
                                            <div className="col-lg-8 p-0">
                                                <div className="progress">

                                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `50%` }}></div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 px-0 text-right line-height-1 ">
                                                <span className='badge-success px-2 rounded py-1'>50%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row d-none">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="card-header-title">Attendance</h5>
                            <a href="#" className="btn btn-link p-0 mb-0">View all</a>
                        </div>
                        <div className="card-body pr-0">
                            <div className="row">
                                <div className="col-lg-10 p-0">
                                    <div className="progress">
                                        {/* <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${studentAttendance}%` }}></div> */}
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `50%` }}></div>
                                    </div>
                                </div>
                                <div className="col-lg-2 px-0 text-right line-height-1 ">
                                    <span className='badge-primary'>50%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='mt-4 px-2' style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(600px, 1fr))", gap: "10px", height: "310px", marginBottom: "20px",}}>
                {/* Today's Classes */}
                <div className="row">
                    <div className="col-lg-6">
                        <div className='box rounded p-3' style={{ borderRadius: "10px", backgroundColor: "white" }}>
                            <p className="text-center p-2" style={{ fontSize: "20px" }}>Today's Classes</p>
                            <div style={{ backgroundColor: "white" }} >
                                {paginatedTodaysMeetings?.length > 0 ? (
                                    paginatedTodaysMeetings.map((meeting, index) => (
                                        <div key={index} className="list-group-item mb-10 card text-gray" style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            // alignItems: 'center',
                                            padding: '10px',
                                            marginBottom: '10px',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                        }}>
                                            <div className="box-body">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                            <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                        </div>
                                                        <div className="d-flex flex-column fw-500">
                                                            <p className="text-theme hover-primary mb-1 fs-16">{meeting?.topic}</p>
                                                            <p className="mb-0 font-12">
                                                                <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                                <span>{meeting?.startTime} - {meeting?.endTime}</span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <a href="#" onClick={() => handleMeeting(meeting?.meetingLink)}>
                                                        <span><FontAwesomeIcon icon={faPlay} /></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                    ))
                                ) : (
                                    <div style={{ padding: '10px', color: '#666' }}>No meetings available for today</div>
                                )}
                                <Pagination
                                    count={Math.ceil(todaysMeetings?.length / itemsPerPage)}
                                    page={currentPageToday}
                                    onChange={handlePageChangeToday}
                                    color="primary"
                                    style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Classes */}
                    <div className="col-lg-6">
                        <div className='box rounded p-3' style={{ borderRadius: "10px", backgroundColor: "white" }}>
                            <p className="text-center p-2" style={{ fontSize: "20px" }}>Upcoming Classes</p>
                            <div style={{ backgroundColor: "white" }}>
                                {paginatedUpcomingMeetings?.length > 0 ? (
                                    paginatedUpcomingMeetings.map((meeting, index) => (
                                        <div key={index} className="list-group-item mb-10 card text-gray" style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            padding: '10px',
                                            marginBottom: '10px',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                        }}>
                                            <div className="box-body">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                            <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                        </div>
                                                        <div className="d-flex flex-column fw-500">
                                                            <p className="text-theme hover-primary mb-1 fs-16">{meeting?.topic}</p>
                                                            <p className="mb-0 font-12">
                                                                <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                                <span>{meeting?.startTime} - {meeting?.endTime}</span>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <a href="#" onClick={() => handleMeeting(meeting?.meetingLink)}>
                                                        <span><FontAwesomeIcon icon={faPlay} /></span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '10px', color: '#666' }}>No upcoming meetings available</div>
                                )}
                                <Pagination
                                    count={Math.ceil(upcomingMeetings?.length / itemsPerPage)}
                                    page={currentPageUpcoming}
                                    onChange={handlePageChangeUpcoming}
                                    color="primary"
                                    style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
                                />
                            </div>

                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}

export default Student_Overview_new