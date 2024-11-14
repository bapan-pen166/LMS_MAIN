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
import StudentAttendanceReport from '../Components/student_overview/StudentAttendanceReport';
import Student_Course_Completion from '../Components/student_overview/Student_Course_Completion';
import { api } from '../../ApiUrl/ApiUrl';
import cert_lock from "../../assets/img/student overview/lock_certificate.jpg"
import "../../assets/css/Student_dashboard/student_dashboard.css";
import TopBar from '../../layout/TopBar';
import SideBar from '../../layout/Sidebar_new';
import { faIdBadge, faClipboardCheck, faBookOpen, faPlay, faClock, faMedal, faEye, faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Student_Overview_new = () => {
    const [userType, setUserType] = useState('');


    const [percentage, setPercentage] = useState(59)

    useEffect(() => {
        const type = localStorage.getItem('userType');
        setUserType(type);
    }, []);



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


    return (
        <>
            {/* <SideBar /> */}

            <div className="row">
                <div className="col-lg-6 box bg-green-100 rounded d-none">
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <div className="d-flex justify-content-center align-items-center  rounded">
                                <span className="display-6 lh-1 text-orange mb-0"><i className="fa fa-television"></i></span>
                                <div className="ml-3">
                                    <div className="d-flex">
                                        <h5 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="9" data-purecounter-delay="200" data-purecounter-duration="0">21.21%</h5>
                                    </div>
                                    <p className="mb-0 h6 fw-light text-dark">Overall Performance</p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-lg-0">
                            <div className="d-flex align-items-center  rounded">
                                <span className="display-6 lh-1 text-success mb-0">
                                    <FontAwesomeIcon icon={faMedal} />
                                </span>
                                <div className="ml-4">
                                    <div className="d-flex">
                                        <h5 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="9" data-purecounter-delay="200" data-purecounter-duration="0">9</h5>
                                    </div>
                                    <p className="mb-0 h6 fw-light text-dark">Grade</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 justify-content-center align-items-center d-none">
                        <StudentOverallPerformanceChart />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="">
                        <div className="pb-2 border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="card-header-title">Performance overview</h5>
                        </div>
                        <div className="card-body pr-0 box-shadow mt-2">
                            <div class="pr-5">
                                <div class="d-flex align-items-center mb-30 gap-items-3 justify-content-between">
                                    <div class="d-flex align-items-center fw-500">
                                        <div class="me-15 w-50 d-table">
                                            <FontAwesomeIcon icon={faFilePen} class="avatar avatar-lg rounded-10" alt="" />
                                        </div>
                                        <div>
                                            <a href="#" class="text-dark hover-primary mb-2 d-block fs-16">Overall Performance</a>
                                            <div class="w-200">
                                                <div class="progress progress-sm mb-0">
                                                    <div class="progress-bar progress-bar-primary progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `70%` }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="text-end">
                                        <h5 class="fw-600 mb-0 badge badge-pill badge-primary mt-4">75%</h5>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center mb-30 justify-content-between">
                                            <div class="d-flex align-items-center fw-500">
                                                <div class="me-15 w-50 d-table">
                                                    <img src="	https://eduadmin-template.multipurposethemes.com/bs5/images/avatar/avatar-2.png" class="avatar avatar-lg rounded-10" alt="" />
                                                </div>
                                                <div>
                                                    <a href="#" class="text-dark hover-primary mb-2 d-block fs-16">Cumulative Assignment Score </a>
                                                    <div class="w-200">
                                                        <div class="progress progress-sm mb-0">
                                                            <div class="progress-bar progress-bar-primary progress-bar-warning progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `75%` }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="text-end">
                                                <h5 class="fw-600 mb-0 badge badge-pill badge-warning mt-4">75%</h5>
                                            </div>
                                </div>
                                <div class="d-flex align-items-center mb-30 justify-content-between">
                                            <div class="d-flex align-items-center fw-500">
                                                <div class="me-15 w-50 d-table">
                                                    <img src="	https://eduadmin-template.multipurposethemes.com/bs5/images/avatar/avatar-2.png" class="avatar avatar-lg rounded-10" alt="" />
                                                </div>
                                                <div>
                                                    <a href="#" class="text-dark hover-primary mb-2 d-block fs-16">Cumulative Test Score</a>
                                                    <div class="w-200">
                                                        <div class="progress progress-sm mb-0">
                                                            <div class="progress-bar progress-bar-success progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `75%` }}>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="text-end">
                                                <h5 class="fw-600 mb-0 badge badge-pill badge-succes mt-4">75%</h5>
                                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="mb-4">
                        <div className="bg-blue-light rounded py-2">
                                    <div className=" ">
                                        <div className="px-2 py-0 d-flex justify-content-between align-items-center border-bottom">
                                            <h6 className=" mb-0 custom-card-header text-dark">Attendance</h6>
                                            <a href="#" className="btn btn-link p-0 mb-0"><FontAwesomeIcon icon={faEye} /></a>
                                        </div>
                                        <div className="card-body pr-0">
                                            <div className="row">
                                                <div className="col-lg-8 p-0">
                                                    <div className="progress mt-1">
                                                        {/* <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `${studentAttendance}%` }}></div> */}
                                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: `50%` }}></div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3 px-0 text-right line-height-1 ">
                                                    <span className='badge badge-pill badge-primary'>50%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </div>
                    {/* Counter item*/}
                    <div className="">
                        <div className="d-flex justify-content-center align-items-center  bg-success bg-opacity-10 rounded py-2">
                            <span className="display-6 lh-1 text-success mb-0">
                                <FontAwesomeIcon icon={faIdBadge} />
                            </span>
                            <div className="ml-2">
                                <div className="d-flex">
                                    <h5 className="purecounter mb-0 fw-bold" data-purecounter-start="0" data-purecounter-end="8" data-purecounter-delay="300" data-purecounter-duration="0">8</h5>
                                </div>
                                <p className="mb-0 h6 fw-light text-dark">Achieved Certificates</p>
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
                {/* <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-4"></div>
                                    <div className="col-lg-8">
                                        <StudentOverallPerformanceChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
            </div>

            <div className="row mt-5">
                <div className="col-lg-6">
                    <div>
                        <div class="shadow-box-header">
                            <h5 class="shadow-box-title">Today's Classes</h5>
                        </div>
                        <div className="shadow-box-body">
                            <ul className="list-group">
                                <li className="list-group-item mb-10 card text-gray">
                                    <div className="box-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                    <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                </div>
                                                <div className="d-flex flex-column fw-500">
                                                    <a href="#" className="text-theme hover-primary mb-1 fs-16 ">Introduction to BIM</a>
                                                    <p className='mb-0 font-12'>
                                                        <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                        <span>02:45 PM - 3:15 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="btn btn-link p-3">
                                                <span class="badge bg-success bg-opacity-15 text-success">Live</span>
                                            </button>
                                            <a href="#">
                                                <span><FontAwesomeIcon icon={faPlay} /></span>
                                            </a>
                                        </div>
                                    </div>

                                </li>
                                <li className="list-group-item mb-10 card text-gray">
                                    <div className="box-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                    <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                </div>
                                                <div className="d-flex flex-column fw-500">
                                                    <a href="#" className="text-theme hover-primary mb-1 fs-16 ">BIM Model Authoring using Revit</a>
                                                    <p className='mb-0 font-12'>
                                                        <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                        <span>02:45 PM - 3:15 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <a href="#">
                                                <span><FontAwesomeIcon icon={faPlay} /></span>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item mb-10 card text-gray">
                                    <div className="box-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                    <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                </div>
                                                <div className="d-flex flex-column fw-500">
                                                    <a href="#" className="text-theme hover-primary mb-1 fs-16 ">Steel Structure drawings using Advance Steel</a>
                                                    <p className='mb-0 font-12'>
                                                        <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                        <span>02:45 PM - 3:15 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <a href="#">
                                                <span><FontAwesomeIcon icon={faPlay} /></span>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item mb-10 card text-gray">
                                    <div className="box-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                    <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                </div>
                                                <div className="d-flex flex-column fw-500">
                                                    <a href="#" className="text-theme hover-primary mb-1 fs-16 ">Informatic Course</a>
                                                    <p className='mb-0 font-12'>
                                                        <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                        <span>02:45 PM - 3:15 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <a href="#">
                                                <span><FontAwesomeIcon icon={faPlay} /></span>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item card mb-10 text-gray">
                                    <div className="box-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                    <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                </div>
                                                <div className="d-flex flex-column fw-500">
                                                    <a href="#" className="text-theme hover-primary mb-1 fs-16 ">BIM in Civil and Infrastructure</a>
                                                    <p className='mb-0 font-12'>
                                                        <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                        <span>02:45 PM - 3:15 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <a href="#">
                                                <span><FontAwesomeIcon icon={faPlay} /></span>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div>
                        <div class="shadow-box-header">
                            <h5 class="shadow-box-title">Upcoming Classes</h5>
                        </div>
                        <div className="shadow-box-body">
                            <ul className="list-group">
                                <li className="list-group-item mb-10 card text-gray">
                                    <div className="box-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                    <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                </div>
                                                <div className="d-flex flex-column fw-500">
                                                    <a href="#" className="text-theme hover-primary mb-1 fs-16 ">BIM Studio</a>
                                                    <p className='mb-0 font-12'>
                                                        <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                        <span>02:45 PM - 3:15 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <a href="#">
                                                <span><FontAwesomeIcon icon={faPlay} /></span>
                                            </a>
                                        </div>
                                    </div>

                                </li>
                                <li className="list-group-item mb-10 card text-gray">
                                    <div className="box-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                    <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                </div>
                                                <div className="d-flex flex-column fw-500">
                                                    <a href="#" className="text-theme hover-primary mb-1 fs-16 ">Parametric
                                                        Modeling Studio</a>
                                                    <p className='mb-0 font-12'>
                                                        <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                        <span>02:45 PM - 3:15 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <a href="#">
                                                <span><FontAwesomeIcon icon={faPlay} /></span>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item mb-10 card text-gray">
                                    <div className="box-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                    <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                </div>
                                                <div className="d-flex flex-column fw-500">
                                                    <a href="#" className="text-theme hover-primary mb-1 fs-16 ">Sustainabily and
                                                        Rendering Studio</a>
                                                    <p className='mb-0 font-12'>
                                                        <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                        <span>02:45 PM - 3:15 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <a href="#">
                                                <span><FontAwesomeIcon icon={faPlay} /></span>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item mb-10 card text-gray">
                                    <div className="box-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                    <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                </div>
                                                <div className="d-flex flex-column fw-500">
                                                    <a href="#" className="text-theme hover-primary mb-1 fs-16 ">4D & 5D BIM Studio</a>
                                                    <p className='mb-0 font-12'>
                                                        <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                        <span>02:45 PM - 3:15 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <a href="#">
                                                <span><FontAwesomeIcon icon={faPlay} /></span>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item card mb-10 text-gray">
                                    <div className="box-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                    <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                </div>
                                                <div className="d-flex flex-column fw-500">
                                                    <a href="#" className="text-theme hover-primary mb-1 fs-16 ">Computational Design
                                                        and Automation Studio</a>
                                                    <p className='mb-0 font-12'>
                                                        <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                        <span>02:45 PM - 3:15 PM</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <a href="#">
                                                <span><FontAwesomeIcon icon={faPlay} /></span>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Student_Overview_new