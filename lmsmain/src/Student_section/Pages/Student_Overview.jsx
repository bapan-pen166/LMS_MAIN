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
import StudentAttendanceReport from '../Components/student_overview/StudentAttendanceReport';
import Student_Course_Completion from '../Components/student_overview/Student_Course_Completion';
import { api } from '../../ApiUrl/ApiUrl';
import cert_lock from "../../assets/img/student overview/lock_certificate.jpg"
import "../../assets/css/Student_dashboard/student_dashboard.css";
import { IoCalendarNumberOutline } from "react-icons/io5";
import overview_icon from "../../assets/img/student_overview/Overview-Icon.png"
import card_background from "../../assets/img/student_overview/for-cards.png"
import over_perfo_pre from "../../assets/img/student_overview/over_perfo_pre.png"
import assignment_pre_img from "../../assets/img/student_overview/assignment_pre_img.png"
import attendance_pre_img from "../../assets/img/student_overview/attendance-pre.png"
import remain_classes_pre_img from "../../assets/img/student_overview/Remaining-classes-pre.png"
import test_score from "../../assets/img/student_overview/test-score.png"
import classes_to_attend_pre from "../../assets/img/student_overview/classes_to_attend_pre.png"
import qualified_for_placements_pre_img from "../../assets/img/student_overview/Qualified-pre.png"
import grade_pre_img from "../../assets/img/student_overview/Professional_Grade-pre.png"
import batch from "../../assets/img/student_overview/batch.png"
import course from "../../assets/img/student_overview/course.png"
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import DuoIcon from '@mui/icons-material/Duo';

const Student_Overview = () => {
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
    const [getCourseName, setGetCourseName] = useState();

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
    const [assignmentsList, setAssignmentsList] = useState();

    useEffect(() => {
        setStudentMail(localStorage.getItem('studentEmail'))
        setLastName(localStorage.getItem('lastName'))
        setFirstName(localStorage.getItem('firstName'))
        setUserId(localStorage.getItem('id'))
    }, []);

    const getBatchNM = () => {
        axios.post(`${api}/dashboard/getStudentBatchName`, { studentEmail: studentMail })
            .then((Response) => {
                console.log("BatchName", Response?.data?.batchName);
                setGetBatchName(Response?.data?.batchName)
                setGetCourseName(Response?.data?.courseName)
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



    const fetchAssignmentData = async () => {
        try {
            const response = await axios.post(`${api}/dashboard/getIndividualStudentAllAssignmentTracker`, { studentEmail: studentMail, batchName: getBatchName });
            setAssignmentsList(response?.data?.assignments || []);
            console.log("ASSIGNMENTS    LISt  all", response?.data?.assignments)
        } catch (err) {

        }
    };

    useEffect(() => {
        if (getBatchName) {
            fetchAssignmentData();
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

    // const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
    const currentDay = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date());

    const items = ["Assignment 1", "Assignment 2", "Assignment 3", "Assignment 4", "Assignment 5", "Assignment 6", "Assignment 7",];

    // For this it is hardcoded

    const forStatusJOINcallstatus = 1;

    const getButtonBackground = () => {
        switch (forStatusJOINcallstatus) {
            case 1:
                return 'linear-gradient(to top, #0000FF 0%, #3c92ba 100%)';
            case 2:
                return 'linear-gradient(to top, #0ba360 0%, #3cba92 100%)';
            case 3:
                return 'linear-gradient(to top, #FF0000 0%, #ba3c3c 100%)';
            default:
                return 'linear-gradient(to top, #0000FF 0%, #3c92ba 100%)';
        }
    };

    const isSmallScreen = window.innerWidth <= 600;

    return (
        <>
            <div style={{ marginTop: "58px", backgroundColor: "#f2edf3" }} className='row g-3'>
                <div className='row'>
                    <div className='container-fluid'>
                        {/* <div className=' col-md-12 col-lg-12   d-flex justify-content-start align-items-center' >
                            <img src={overview_icon} alt={overview_icon} style={{ width: "40px" }} />
                            <h4 style={{ color: "black", marginTop: "5px" }}>Dashboard</h4>
                        </div> */}
                        {/* <div className="row mt-2 mb-2" style={{ minHeight: "210px", overflow: "hidden" }}>
                                <div className='col-md-6 col-lg-4' style={{ maxHeight: "210px", overflow: "hidden" }}>
                                    <h1 className='chart-heading-batchwise' >Attendance %</h1>
                                    <div className='table-bordered ' style={{ display: "flex", gap: "10px", alignItems: "center" }}>

                                        <div className="img">
                                            <img src={attendance} alt="" style={{ width: "140px", padding: "5px" }} />
                                        </div>
                                        <div style={{ width: "1px", height: "160px", backgroundColor: "black" }}></div>
                                        <div style={{ width: 155, height: 155 }}><CircularProgressbar value={attendancePercentage} text={`${attendancePercentage}%`} /></div>
                                    </div>

                                </div>

                                <div className='col-md-6 col-lg-4' style={{ maxHeight: "210px", overflow: "hidden" }}>
                                    <h1 className='chart-heading-batchwise' >Course completion %</h1>
                                    <div className='table-bordered ' style={{ display: "flex", gap: "10px", alignItems: "center" }}>

                                        <div className="img">
                                            <img src={course_completion} alt="" style={{ width: "140px", padding: "5px" }} />
                                        </div>
                                        <div style={{ width: "1px", height: "160px", backgroundColor: "black" }}></div>
                                        <div style={{ width: 155, height: 155 }}><CircularProgressbar value={coursePercentage} text={`${coursePercentage}%`} /></div>
                                    </div>

                                </div>
                                <div className='col-md-6 col-lg-4' style={{ maxHeight: "210px", overflow: "hidden" }}>
                                    <h1 className='chart-heading-batchwise' >Exam completion %</h1>
                                    <div className='table-bordered ' style={{ display: "flex", gap: "10px", alignItems: "center" }}>

                                        <div className="img">
                                            <img src={exam_completion} alt="" style={{ width: "140px", padding: "5px" }} />
                                        </div>
                                        <div style={{ width: "1px", height: "160px", backgroundColor: "black" }}></div>
                                        <div style={{ width: 155, height: 155 }}><CircularProgressbar value={examCompletionPercentage} text={`${examCompletionPercentage}%`} /></div>
                                    </div>
                                </div>
                            </div> */}

                        {/* 
                            <div className="row mt-2 mb-2" style={{ minHeight: "350px" }}>
                                <div className='col-md-6 col-lg-4' style={{ maxHeight: "350px", overflow: "hidden" }}>
                                    <h1 className='chart-heading-batchwise' >Assignment completion%</h1>
                                    <div className='table-bordered ' style={{ display: "flex", gap: "10px", alignItems: "center", height: "257px" }}>

                                        <div className="img">
                                            <img src={assignment_completion} alt="" style={{ width: "140px", padding: "5px" }} />
                                        </div>
                                        <div style={{ width: "1px", height: "255px", backgroundColor: "black" }}></div>
                                        <div style={{ width: 155, height: 155 }}><CircularProgressbar value={assignmentCompletionPercentage} text={`${assignmentCompletionPercentage}%`} /></div>
                                    </div>

                                </div>

                                <div className='col-md-6 col-lg-4' style={{}}>
                                    <h1 className='chart-heading-batchwise'>Today's class</h1>
                                    <div style={{ height: "260px", overflow: "auto", backgroundColor: "blue" }}>
                                        <table className="custom-table table-bordered" style={{ width: "100%", tableLayout: "fixed" }}>
                                            <thead style={{ position: "sticky", top: 0, zIndex: 3 }}>
                                                <tr>
                                                    <th>Time</th>
                                                    <th>Class Name</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody style={{ zIndex: '1' }}>
                                                <tr>
                                                    <td>12:10 pm - 1 pm</td>
                                                    <td>Class 1</td>
                                                    <td><Button variant="contained">Join</Button></td>
                                                </tr>
                                                <tr>
                                                    <td>12:10 pm - 1 pm</td>
                                                    <td>Class 2</td>
                                                    <td><Button variant="contained">Join</Button></td>
                                                </tr>
                                                <tr>
                                                    <td>12:10 pm - 1 pm</td>
                                                    <td>Class 3</td>
                                                    <td><Button variant="contained">Join</Button></td>
                                                </tr>
                                                <tr>
                                                    <td>12:10 pm - 1 pm</td>
                                                    <td>Class 4</td>
                                                    <td><Button variant="contained">Join</Button></td>
                                                </tr>
                                                <tr>
                                                    <td>12:10 pm - 1 pm</td>
                                                    <td>Class 5</td>
                                                    <td><Button variant="contained">Join</Button></td>
                                                </tr>
                                                <tr>
                                                    <td>12:10 pm - 1 pm</td>
                                                    <td>Class 6</td>
                                                    <td><Button variant="contained">Join</Button></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className='col-md-6 col-lg-4' style={{ height: "300px" }}>
                                    <h1 className='chart-heading-batchwise' >Upcoming classes</h1>
                                    <table className="custom-table table-bordered" style={{ height: "300px", overflow: "scroll" }}>
                                        <thead style={{ position: "sticky", top: 0, zIndex: 3 }}>
                                            <tr>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Class name</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody style={{ zIndex: '1' }}>
                                            <tr>
                                                <td>12-08-2024</td>
                                                <td>12:10 pm - 1 pm</td>
                                                <td>Class 1</td>
                                                <td><Button variant="contained">Join</Button></td>

                                            </tr>
                                            <tr>
                                                <td>12-08-2024</td>
                                                <td>12:10 pm - 1 pm</td>
                                                <td>Class 2</td>
                                                <td><Button variant="contained">Join</Button></td>
                                            </tr>
                                            <tr>
                                                <td>12-08-2024</td>
                                                <td>12:10 pm - 1 pm</td>
                                                <td>Class 3</td>
                                                <td><Button variant="contained">Join</Button></td>
                                            </tr>
                                            <tr>
                                                <td>12-08-2024</td>
                                                <td>12:10 pm - 1 pm</td>
                                                <td>Class 4</td>
                                                <td><Button variant="contained">Join</Button></td>
                                            </tr>
                                            <tr>
                                                <td>12-08-2024</td>
                                                <td>12:10 pm - 1 pm</td>
                                                <td>Class 5</td>
                                                <td><Button variant="contained">Join</Button></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <div className='col-md-6 col-lg-4' style={{ maxHeight: "310px" }}>
                                    <h1 className='chart-heading-batchwise' >Upcoming Placements</h1>
                                    <table className="custom-table table-bordered">
                                        <thead style={{ position: "sticky", top: 0, zIndex: 3 }}>
                                            <tr>
                                                <th>Company name</th>
                                                <th>Location</th>
                                                <th>Package</th>

                                            </tr>
                                        </thead>
                                        <tbody style={{ zIndex: '1' }}>
                                            <tr>
                                                <td>Sansung</td>
                                                <td>Bangalore</td>
                                                <td>8-10 LPA</td>
                                            </tr>
                                            <tr>
                                                <td>Microsoft</td>
                                                <td>USA</td>
                                                <td>18-28 LPA</td>
                                            </tr>
                                            <tr>
                                                <td>Sansung</td>
                                                <td>Bangalore</td>
                                                <td>8-10 LPA</td>
                                            </tr>
                                            <tr>
                                                <td>Microsoft</td>
                                                <td>USA</td>
                                                <td>18-28 LPA</td>
                                            </tr>


                                        </tbody>
                                    </table>

                                </div>


                            </div> */}
                        {/* background: 'linear-gradient(90deg,#ffbf96, #fe7096)' */}

                        <div className="container-fluid">
                            <div className=' p-2 d-flex outer' style={{ gap: "30px", position: "relative" }}>
                                <div style={{
                                    width: "98%",
                                    display: "flex",
                                    gap: "30px",
                                    justifyContent: "center",
                                    position: "relative",
                                    alignItems: "center",
                                    margin: "auto"
                                }}
                                    className="cards">
                                    <div style={{
                                        height: '180px',
                                        width: '33%',
                                        background: 'white',
                                        borderRadius: '10px',
                                        display: "flex",
                                        justifyContent: "center",
                                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                        position: "relative"
                                    }} className='sub-card'>
                                        <div style={{ width: "100%", textAlign: "center" }}>
                                            <span style={{
                                                background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)',
                                                width: "100%",
                                                display: "block",
                                                padding: "10px 0",
                                                borderRadius: '10px 10px 0 0',
                                                fontWeight: "bold",
                                                color: "white"
                                            }} className='roboto-medium '>Batch Name | Course Name</span>
                                            <p style={{
                                                fontSize: '18px',
                                                fontWeight: 'bold',
                                                position: "absolute",
                                                bottom: "20%",
                                                left: isSmallScreen ? '0px' : '30px',
                                                display: "block"
                                            }}>
                                                {/* <span style={{display:'block'}}> */}
                                                <span>
                                                    <img src={batch} alt={batch} style={{ width: "36px", marginRight: "4px", marginBottom: "2px" }} />
                                                    {getBatchName}
                                                </span>
                                                {/* <br /> */}
                                                <span style={{ paddingLeft: '50px' }}>
                                                    <img src={course} alt={course} style={{ width: "36px", marginRight: "4px", marginBottom: "2px" }} />
                                                    {getCourseName}
                                                </span>
                                                {/* </span> */}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{
                                        height: '180px',
                                        width: '33%',
                                        background: 'white',
                                        borderRadius: '10px',
                                        display: "flex",
                                        justifyContent: "center",
                                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                        position: "relative"
                                    }} className='sub-card'>
                                        <div style={{ width: "100%", textAlign: "center" }}>
                                            <span style={{
                                                background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)',
                                                width: "100%",
                                                display: "block",
                                                padding: "10px 0",
                                                borderRadius: '10px 10px 0 0',
                                                fontWeight: "bold",
                                                color: "white"
                                            }} className='roboto-medium '>Qualified for Placement</span>
                                            <p style={{
                                                fontSize: '30px',
                                                fontWeight: 'bold',
                                                position: "absolute",
                                                bottom: "20%",
                                                left: "30px",
                                                display: "block"
                                            }}>
                                                <img src={qualified_for_placements_pre_img} alt={qualified_for_placements_pre_img} style={{ width: "40px", marginRight: "4px", marginBottom: "2px" }} />
                                                {qualifiedForPlacement?.qualifyForPlacement ? "Yes" : "No"}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{
                                        height: '180px',
                                        width: '33%',
                                        background: 'white',
                                        borderRadius: '10px',
                                        display: "flex",
                                        justifyContent: "center",
                                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                        position: "relative"
                                    }} className='sub-card'>
                                        <div style={{ width: "100%", textAlign: "center" }}>
                                            <span style={{
                                                background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)',
                                                width: "100%",
                                                display: "block",
                                                padding: "10px 0",
                                                borderRadius: '10px 10px 0 0',
                                                fontWeight: "bold",
                                                color: "white"
                                            }} className='roboto-medium'>Course Progress</span>
                                            <div style={{ position: "absolute", bottom: "0px", left: "30px" }}>
                                                <Student_Course_Completion percentage={courseProgress} />

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='p-2 d-flex outer' style={{ gap: "30px", position: "relative" }}>
                                <div
                                    style={{
                                        width: "98%",
                                        display: "flex",
                                        gap: "30px",
                                        justifyContent: "center",
                                        position: "relative",
                                        alignItems: "center",
                                        margin: "auto"
                                    }}
                                    className="cards"
                                >
                                    {/* Card 1: Overall Performance */}
                                    <div
                                        style={{
                                            height: '180px',
                                            width: '33%',
                                            background: 'white',
                                            borderRadius: '10px',
                                            display: "flex",
                                            justifyContent: "center",
                                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                            position: "relative",

                                            backgroundPosition: "left"
                                        }}
                                        className="sub-card"
                                    >
                                        {/* backgroundImage: `url(${card_background})`, */}

                                        <div style={{ width: "100%", textAlign: "center" }}>
                                            <span
                                                style={{
                                                    background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)',
                                                    width: "100%",
                                                    display: "block",
                                                    padding: "10px 0",
                                                    borderRadius: '10px 10px 0 0',
                                                    fontWeight: "bold",
                                                    color: "white"
                                                }}
                                                className="roboto-medium"
                                            >
                                                Overall Performance
                                            </span>
                                            <p
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    position: "absolute",
                                                    bottom: "20%",
                                                    left: "30px",
                                                    display: "block"
                                                }}
                                            >
                                                <div>

                                                </div>
                                                <img src={over_perfo_pre} alt={over_perfo_pre} style={{ width: "36px", marginRight: "4px", marginBottom: "2px" }} />

                                                {overallPerformn}%
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card 2: Assignment */}
                                    <div
                                        style={{
                                            height: '180px',
                                            width: '33%',
                                            background: 'white',
                                            borderRadius: '10px',
                                            display: "flex",
                                            justifyContent: "center",
                                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                                        }}
                                        className="sub-card"
                                    >
                                        <div style={{ width: "100%", textAlign: "center", position: "relative" }}>
                                            <span
                                                style={{
                                                    background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)',
                                                    width: "100%",
                                                    display: "block",
                                                    padding: "10px 0",
                                                    borderRadius: '10px 10px 0 0',
                                                    fontWeight: "bold",
                                                    color: "white"
                                                }}
                                                className="roboto-medium"
                                            >
                                                Cumulative assignment Score
                                            </span>
                                            <p
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    position: "absolute",
                                                    bottom: "20%",
                                                    left: "30px",
                                                    display: "block"
                                                }}
                                            >
                                                <img src={assignment_pre_img} alt={assignment_pre_img} style={{ width: "36px", marginRight: "4px", marginBottom: "2px" }} />
                                                {assignmentPercentage}%
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card 3: Attendance */}
                                    <div
                                        style={{
                                            height: '180px',
                                            width: '33%',
                                            background: 'white',
                                            borderRadius: '10px',
                                            display: "flex",
                                            justifyContent: "center",
                                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                                        }}
                                        className="sub-card"
                                    >
                                        <div style={{ width: "100%", textAlign: "center", position: "relative" }}>
                                            <span
                                                style={{
                                                    background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)',
                                                    width: "100%",
                                                    display: "block",
                                                    padding: "10px 0",
                                                    borderRadius: '10px 10px 0 0',
                                                    fontWeight: "bold",
                                                    color: "white"
                                                }}
                                                className="roboto-medium"
                                            >
                                                Attendance
                                            </span>
                                            <p
                                                style={{
                                                    fontSize: '30px',
                                                    fontWeight: 'bold',
                                                    position: "absolute",
                                                    bottom: "20%",
                                                    left: "30px",
                                                    display: "block"
                                                }}
                                            >
                                                <img style={{ width: "36px", marginRight: "4px", marginBottom: "2px" }} src={attendance_pre_img} alt={attendance_pre_img} />
                                                {studentAttendance}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* second row */}
                            <div className=' p-2 d-flex outer' style={{ gap: "30px", position: "relative" }}>
                                <div
                                    style={{
                                        width: "98%",
                                        display: "flex",
                                        gap: "30px",
                                        justifyContent: "center",
                                        position: "relative",
                                        alignItems: "center",
                                        margin: "auto"
                                    }}
                                    className="cards"
                                >
                                    <div
                                        style={{
                                            height: '180px',
                                            width: '33%',
                                            background: 'white',
                                            borderRadius: '10px',
                                            display: "flex",
                                            justifyContent: "center",
                                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                            position: "relative"
                                        }}
                                        className="sub-card"
                                    >
                                        <div style={{ width: "100%", textAlign: "center" }}>
                                            <span style={{
                                                background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)',
                                                width: "100%",
                                                display: "block",
                                                padding: "10px 0",
                                                borderRadius: '10px 10px 0 0',
                                                fontWeight: "bold",
                                                color: "white"
                                            }}
                                                className="roboto-medium">Cumulative Test Score</span>
                                            <p style={{
                                                fontSize: '30px',
                                                fontWeight: 'bold',
                                                position: "absolute",
                                                bottom: "20%",
                                                left: "30px",
                                                display: "block"
                                            }}>
                                                <img src={test_score} alt={test_score} style={{ width: "36px", marginRight: "4px", marginBottom: "2px" }} />

                                                {testResult}%
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{
                                        height: '180px',
                                        width: '33%',
                                        background: 'white',
                                        borderRadius: '10px',
                                        display: "flex",
                                        justifyContent: "center",
                                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                        position: "relative"
                                    }} className='sub-card'>
                                        <div style={{ width: "100%", textAlign: "center" }}>
                                            <span style={{
                                                background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)',
                                                width: "100%",
                                                display: "block",
                                                padding: "10px 0",
                                                borderRadius: '10px 10px 0 0',
                                                fontWeight: "bold",
                                                color: "white"
                                            }} className='roboto-medium '>Grade Till Now</span>
                                            <p style={{
                                                fontSize: '30px',
                                                fontWeight: 'bold',
                                                position: "absolute",
                                                bottom: "20%",
                                                left: "30px",
                                                display: "block"
                                            }}>
                                                <img src={grade_pre_img} alt={grade_pre_img} style={{ width: "36px", marginRight: "4px", marginBottom: "2px" }} />

                                                {studentGrade?.finalGrade}
                                            </p>
                                        </div>
                                    </div>


                                    <div style={{
                                        height: '180px',
                                        width: '33%',
                                        background: 'white',
                                        borderRadius: '10px',
                                        display: "flex",
                                        justifyContent: "center",
                                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                        position: "relative"
                                    }} className='sub-card'>
                                        <div style={{ width: "100%", textAlign: "center" }}>
                                            <span style={{
                                                background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)',
                                                width: "100%",
                                                display: "block",
                                                padding: "10px 0",
                                                borderRadius: '10px 10px 0 0',
                                                fontWeight: "bold",
                                                color: "white"
                                            }} className='roboto-medium '>Minimum classes to Attend | Remaining classes</span>
                                            <p style={{
                                                fontSize: '30px',
                                                fontWeight: 'bold',
                                                position: "absolute",
                                                bottom: "20%",
                                                left: "30px",
                                                display: "flex",
                                                gap: "80px"
                                            }}>
                                                {/* <div style={{display:'flex',justifyContent:'space-between',width:'100%'}}> */}
                                                <span>
                                                    <img src={classes_to_attend_pre} alt={classes_to_attend_pre} style={{ width: "40px", marginRight: "4px", marginBottom: "2px" }} />

                                                    {minClassToAttendToReachFifty
                                                    }
                                                </span>
                                                <span >
                                                    <img src={remain_classes_pre_img} alt={remain_classes_pre_img} style={{ width: "36px", marginRight: "2px", marginBottom: "2px" }} />
                                                    {remainingClassesStudent}
                                                </span>
                                                {/* </div> */}
                                            </p>
                                        </div>
                                    </div>


                                </div>

                            </div>

                            {/* third row  */}
                            {/* <div className=' p-2 d-flex outer' style={{ gap: "30px", position: "relative" }}>
                                <div style={{
                                    width: "98%",
                                    display: "flex",
                                    gap: "30px",
                                    justifyContent: "center",
                                    position: "relative",
                                    alignItems: "center",
                                    margin:"auto"
                                }}
                                    className="cards">
                                    <div style={{
                                        height: '180px',
                                        width: '33%',
                                        background: 'white',
                                        borderRadius: '10px',
                                        display: "flex",
                                        justifyContent: "center",
                                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                        position: "relative"
                                    }} className='sub-card'>
                                        <div style={{ width: "100%", textAlign: "center" }}>
                                            <span style={{
                                                background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)',
                                                width: "100%",
                                                display: "block",
                                                padding: "10px 0",
                                                borderRadius: '10px 10px 0 0',
                                                fontWeight: "bold",
                                                color:"white"
                                            }} className='roboto-medium '>Remaining classes</span>
                                            <p style={{
                                                fontSize: '30px',
                                                fontWeight: 'bold',
                                                position: "absolute",
                                                bottom: "25%",
                                                left: "30px",
                                                display: "block"
                                            }}>
                                                <img src={remain_classes_pre_img} alt={remain_classes_pre_img} style={{ width: "36px", marginRight: "4px", marginBottom: "2px" }}/>
                                                {remainingClassesStudent}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{
                                        height: '180px',
                                        width: '33%',
                                        background: 'white',
                                        borderRadius: '10px',
                                        display: "flex",
                                        justifyContent: "center",
                                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                        position: "relative"
                                    }} className='sub-card'>
                                        <div style={{ width: "100%", textAlign: "center" }}>
                                            <span style={{
                                                background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)',
                                                width: "100%",
                                                display: "block",
                                                padding: "10px 0",
                                                borderRadius: '10px 10px 0 0',
                                                fontWeight: "bold",
                                                color:"white"
                                            }} className='roboto-medium '>Qualified for Placement</span>
                                            <p style={{
                                                fontSize: '30px',
                                                fontWeight: 'bold',
                                                position: "absolute",
                                                bottom: "25%",
                                                left: "30px",
                                                display: "block"
                                            }}>
                                                <img src={qualified_for_placements_pre_img} alt={qualified_for_placements_pre_img} style={{ width: "40px", marginRight: "4px", marginBottom: "2px" }} />
                                                {qualifiedForPlacement?.qualifyForPlacement ? "Yes" : "No"}
                                                </p>
                                        </div>
                                    </div>
                                    <div style={{
                                    height: '180px',
                                    width: '33%',
                                    background: 'white',
                                    borderRadius: '10px',
                                    display: "flex",
                                    justifyContent: "center",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                    position: "relative"
                                }} className='sub-card'>
                                    <div style={{ width: "100%", textAlign: "center" }}>
                                        <span style={{
                                            background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)',
                                            width: "100%",
                                            display: "block",
                                            padding: "10px 0",
                                            borderRadius: '10px 10px 0 0',
                                            fontWeight: "bold",
                                            color:"white"
                                        }} className='roboto-medium'>Course Progress</span>
                                        <div style={{ position: "absolute", bottom: "0px", left: "30px" }}>
                                            <Student_Course_Completion percentage={courseProgress} />

                                        </div>
                                    </div>
                                </div>
                                </div>
                              
                            </div> */}



                            <div className="row mt-2 mb-2 outer-meeting" style={{ height: "320px", overflow: "hidden", width: "99%", margin: "auto" }}>
                                <div className='col-md-6 col-lg-6 col-sm-12'>
                                    <h1 className='chart-heading-batchwise' style={{ background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)', borderRadius: "10px 10px 0px 0px" }}>Today's Classes</h1>
                                    <div style={{ height: '300px', overflowY: 'auto', backgroundColor: "white" }}>
                                        <div style={{ fontWeight: "bold", paddingTop: '6px', fontSize: '18px', color: '#333', display: "flex", alignItems: "center", paddingLeft: "6px" }}>
                                            <IoCalendarNumberOutline style={{ marginRight: "6px", marginBottom: "4px" }} /> {currentDay}

                                        </div>
                                        <hr style={{ paddingBottom: "0px", marginBottom: "0px" }} />
                                        {todaysMeetings?.length > 0 ? (
                                            todaysMeetings.map((meeting, index) => (
                                                <div key={index} className="lesson-card" style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    padding: '25px',
                                                    borderRadius: '4px',
                                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                                    marginBottom: "10px",
                                                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                                                }}>
                                                    <div className="lesson-details" style={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
                                                        <h3 style={{ margin: '0', fontSize: '16px' }}>{meeting?.topic}</h3>
                                                    </div>
                                                    <div className="lesson-info" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: "80px" }}>
                                                        <p style={{ margin: '0', color: '#666' }}><AccessAlarmIcon style={{ marginBottom: "8px" }} />: {meeting?.startTime} - {meeting?.endTime}</p>
                                                        <p style={{ margin: '0', color: '#333' }}>{meeting?.lessonNumber}</p>
                                                        {meeting?.startTime && <Button style={{ background: getButtonBackground() }} onClick={() => handleMeeting(meeting?.meetingLink)} variant="contained"><DuoIcon style={{ marginRight: "5px" }} /> Join class</Button>}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{ padding: '10px', color: '#666' }}>
                                                No meetings available for today
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='col-md-6 col-lg-6 col-sm-12' style={{ width: "100%" }}>
                                    <StudentAssignmentReportChart studentEmail={studentMail} />
                                </div>

                            </div>
                            {/* Third row */}
                            <div className='row' style={{ width: "99%", margin: "auto", marginTop: "20px" }}>
                                {/* <div className='col-md-6' style={{ paddingLeft: "13px" }}> */}
                                {/* <h1 className='chart-heading-batchwise'>Assignment Report</h1> */}

                                {/* upcoming classes */}
                                <div className='col-md-6 col-lg-6 col-sm-12' style={{ borderRadius: "10px" }}>
                                    <h1 className='chart-heading-batchwise' style={{ background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)', borderRadius: "10px 10px 0px 0px" }}>Upcoming Classes</h1>
                                    <div style={{ height: '280px', overflowY: 'auto', backgroundColor: "white" }}>

                                        {Object.keys(groupedMeetings).map((date, index) => (
                                            <div key={index} className="date-group">
                                                <h2 style={{ margin: '10px 0', fontSize: '18px', color: '#333' }}><IoCalendarNumberOutline style={{ marginRight: "6px", marginBottom: "4px", marginLeft: "5px" }} /> {date}</h2> {/* Date heading */}
                                                <hr style={{ paddingBottom: "0px", marginBottom: "0px" }} />
                                                {groupedMeetings[date].map((meeting, meetingIndex) => (
                                                    <div key={meetingIndex} className="lesson-card" style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: '25px',
                                                        marginBottom: '10px',
                                                        borderRadius: '4px',
                                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                                        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                                                    }}>
                                                        <div className="lesson-details" style={{ flex: 1, display: "flex", justifyContent: "space-between" }}>
                                                            <h3 style={{ margin: '0', fontSize: '16px' }}>{meeting?.topic}</h3>
                                                            <p style={{ margin: '0', color: '#666' }}><AccessAlarmIcon style={{ marginBottom: "8px" }} />: {meeting?.startTime}</p>
                                                        </div>
                                                        <div className="lesson-info" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: "80px" }}>
                                                            <p style={{ margin: '0', color: '#333' }}>{meeting?.lessonNumber}</p>
                                                            {/* <p style={{ margin: '0', color: '#333' }}>{meeting?.duration} Min</p> */}
                                                            <Button style={{ background: getButtonBackground() }} onClick={() => handleMeeting(meeting?.meetingLink)} variant="contained"><DuoIcon style={{ marginRight: "5px" }} /> Join class</Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* </div> */}
                                {/* <div className='col-md-4'>
                                    <StudentAttendanceReport />
                                </div> */}
                                <div className='col-md-6 pt-6' >
                                    {/* {certificatePath?.success ? <img src={`${api}/${certificatePath?.path}`} alt={cert_lock} style={{ width: "100%" }} />
                                        : <img src={cert_lock} alt={cert_lock} style={{ width: "100%", height: "350px" }} />

                                    } */}
                                    <h1 className='chart-heading-batchwise' style={{ background: 'radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%)', borderRadius: "10px 10px 0px 0px" }}>Pending Assignments</h1>
                                    <div style={{ height: '280px', overflowY: 'auto', backgroundColor: "white" }}>


                                        <ul style={{ listStyleType: 'none', paddingTop: '10px', margin: '0', width: '100%' }}>
                                            {assignmentsList && assignmentsList
                                                .filter(item => Object.values(item)[0] === 2 || Object.values(item)[0] === 0)
                                                .map((item, index) => (
                                                    <li
                                                        key={index}
                                                        style={{
                                                            padding: '10px',
                                                            color: '#fff',
                                                            background: index % 2 === 0
                                                                ? 'linear-gradient(to right, #b8beda, #becee2, #cbdde7, #deeaed, #f3f6f6)'
                                                                : 'linear-gradient(to left, #b8beda, #becee2, #cbdde7, #deeaed, #f3f6f6)',
                                                            borderRadius: '4px',
                                                            marginBottom: '8px',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        {Object.keys(item)[0]}
                                                    </li>
                                                ))}

                                        </ul>

                                    </div>
                                </div>

                            </div>
                            <div className='row' style={{ width: "99%", margin: "auto", marginTop: "20px" }}>
                                <div className='col-md-6 pt-6' >
                                    {certificatePath?.success ? <img src={`${api}/${certificatePath?.path}`} alt={cert_lock} style={{ width: "100%" }} />
                                        : <img src={cert_lock} alt={cert_lock} style={{ width: "100%", height: "350px" }} />

                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* <Modal show={showPlacementStatus} onHide={handlePlacementStatusClose} backdrop="static"
                    keyboard={false}
                    size='md'>

                    <Modal.Body>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className=' col-md-12 headLineBox ' >
                                    <h4>Placement Status</h4>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12 mb-3 justify-content-center d-flex'>
                                        <img src={congratulation} alt="" height={'200px'} width={'200px'} />
                                    </div>
                                    <div className='col-md-12 mb-1 justify-content-center d-flex'>
                                        <b style={{ fontSize: '30px' }}>Congratulations !</b>
                                    </div>
                                    <div className='col-md-12 mb-3 justify-content-center d-flex'>
                                        <span style={{ fontSize: '22px' }}>you are selected in {placementData?.statusData?.companyName}</span>
                                    </div>
                                </div>
                            </div>




                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        
                        <Stack spacing={2} direction="row" >

                            <Button variant="secondary"
                                onClick={() => { handlePlacementStatusClose() }}
                            >
                                Close
                            </Button>
                        </Stack>
                    </Modal.Footer>
                </Modal> */}
        </>
    )
}

export default Student_Overview