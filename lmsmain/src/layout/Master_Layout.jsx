import React, { useState, useContext, useEffect } from 'react';
import Navber from './Navbar';
import Sidebar from './Sidebar';
import Sidebar_new from './Sidebar_new';
import Body from './Body';
import Footer from './Footer';
import { Datacontext } from '../Context';
import section_bg from "../assets/img/student_overview/section_bg.png";
import student_profile from "../assets/img/student_overview/nav-avatar.jpg";
import headerbg from "../assets/img/student_overview/headerbg.jpg";
import '../assets/css/Navbar/Navbar.css';
import { useLocation, matchPath } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faCalendar, faStar } from '@fortawesome/free-solid-svg-icons';
import { api, api2 } from '../ApiUrl/ApiUrl';
import StudentCourseProgressChart from '../Student_section/Components/student_overview/StudentCourseProgressChart';
import axios from 'axios';
function Master_Layout() {
    const { hamburger } = useContext(Datacontext);
    const location = useLocation();

    // List all your valid paths here
    const validPaths = [
        '/', '/overview', '/login', '/test', '/Student-List', '/meeting',
        '/mentor-overview', '/change-password', '/mentor-courses', '/mentors',
        '/courses', '/batches', '/mentor-test', '/member-profile',
        '/mentor-evaluation-status', '/mentor-take-test', '/mentor-see-results',
        '/view-test', '/student-courses', '/student-test', '/student-update-profile',
        '/mentor-students-dashboard', '/admin-change-password', '/placements',
        '/settings', '/mentor-apply-leave', '/mentor-meeting', '/leave-management', '/certification',
        '/student-meetings', '/admin-placement-list', '/mentor-assignments-creation', '/Students-placements', '/Student_Assignment', 'Mentor-view-questions', 'Mentor-view-questions/:id', '/Mentor-Submission-List', '/Mentor-change-password', '/Student-change-password', '/Placement_Selected', 'student-test-details/:id', '/test_evaluation', 'placement-dashboard'
    ];

    // Check if the current location matches any of the valid paths
    const isValidPath = validPaths.some(path =>
        matchPath({ path, end: true }, location.pathname)
    );

    /*
       matchPath => matches the of two path and location.pathname
       { path, end: true }: This is an object passed as the first argument to matchPath. The path key is the current path being checked (from the validPaths array), and end: true indicates that the entire location.pathname must match the path exactly, not just the beginning of it.
    
    */

    // If the path is not valid, treat it as an error page
    const isErrorPage = !isValidPath;
    // State to manage sidebar visibility
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [getBatchName, setGetBatchName] = useState();
    const [getCourseName, setGetCourseName] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userId, setUserId] = useState()
    const [studentMail, setStudentMail] = useState();
    const [userType, setUserType] = useState();
    const [courseProgress, setCourseProgress] = useState();
    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
        console.log("isSidebarVisible", isSidebarVisible);

    };


    useEffect(() => {
        setStudentMail(localStorage.getItem('studentEmail'));
        setLastName(localStorage.getItem('lastName'));
        setFirstName(localStorage.getItem('firstName'));
        setUserId(localStorage.getItem('id'));
    }, []);

    useEffect(() => {
        if (studentMail) {
            getBatchNM();
        }
    }, [studentMail]);

    const getBatchNM = () => {
        axios.post(`${api}/dashboard/getStudentBatchName`, { studentEmail: studentMail })
            .then((Response) => {
                console.log("BatchName", Response?.data?.batchName);
                setGetBatchName(Response?.data?.batchName);
                setGetCourseName(Response?.data?.courseName);
            })
            .catch((error) => {
                console.error("Error fetching batch name:", error);
            });
    }

    useEffect(() => {
        const storedUser_Type = localStorage.getItem('userType');
        setUserType(storedUser_Type);

        if (storedUser_Type === 'Student' && studentMail && getBatchName) {
            courseProgressBar();
        }
    }, [studentMail, getBatchName, userType]);  // Add userType to the dependencies to ensure it's up to date

    const courseProgressBar = () => {
        // Ensure both studentMail and getBatchName are available before making the API request
        if (studentMail && getBatchName) {
            axios.post(`${api2}/dashboard/getIndividualCourseProgressBar`, { studentEmail: studentMail, batchName: getBatchName })
                .then((Response) => {
                    console.log("Course progress:", Response?.data?.completion_percentage);
                    setCourseProgress(Response?.data?.completion_percentage);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            console.log("Missing studentMail or getBatchName, cannot fetch course progress.");
        }
    };

    useEffect(() => {
        console.log("Course progress updated: ", courseProgress);
    }, [courseProgress]);
    return (
        <>
            <div className='full-page'>
                <div className='container-fluid px-0'>

                    <div className='row container-fluid px-0' style={{ marginLeft: '0px', marginRight: "0px" }}>
                        {!isErrorPage && <Navber />}
                        <div class="container-fluid px-0">
                            <div class="card header-bg h-130px rounded-0" style={{ backgroundImage: `url(${headerbg})`, backgroundSize: 'cover' }}>
                            </div>
                        </div>
                        <div class="container-fluid mt-n4 px-5">
                            <div class="row">
                                <div class="col-md-2">
                                    <div class="avatar avatar-xxl position-relative mt-n3">
                                        <img class="avatar-img rounded-circle " src={student_profile} alt="" />

                                    </div>
                                </div>
                                <div class="col-lg-8 mt-2 px-0 d-sm-flex align-items-center">
                                    <div className='mt-n3'>
                                        <h1 class="mb-2 mt-n4 fs-4">
                                            <span className='mr-2'>{firstName ? firstName : ''}</span>
                                            <span>{lastName ? lastName : ''}</span></h1>
                                        <ul class="list-inline mb-0 mt-2">
                                            {userType == 'Student' ?
                                                <>
                                                    <li class="list-inline-item me-3 mb-1 mb-sm-0">
                                                        <span class=" fw-light mr-1">Batch Name</span>
                                                        <span class="text-body h6 font-weight-bold mr-1">{getBatchName}</span>

                                                    </li>
                                                    <li class="list-inline-item me-3 mb-1 mb-sm-0">
                                                        <span class="fw-light mr-1">Course Name</span>
                                                        <span class="text-body font-weight-bold h6 mr-1">{getCourseName ? getCourseName : ''}</span>
                                                    </li>
                                                    <li class="list-inline-item me-3 mb-1 mb-sm-0">
                                                        <span class="fw-light mr-1">Student ID</span>
                                                        <span class="text-body font-weight-bold h6 mr-1">{userId}</span>
                                                    </li>
                                                </>
                                                : <></>

                                            }
                                        </ul>


                                        {userType === 'Mentor' &&
                                            <ul class="list-inline mb-0">
                                                <li className="list-inline-item h6 fw-light me-3 mb-1 mb-sm-0 d-flex align-items-center" style={{ gap: "4px" }}>
                                                    <FontAwesomeIcon style={{ fontSize: "60px" }} className="fas fa-star text-warning me-2" icon={faStar} />
                                                    <span>4.5/5.0</span>
                                                </li>


                                            </ul>

                                        }

                                    </div>
                                    {/* Button */}
                                </div>
                                <div class="col-lg-2">
                                    {/* <a href="student-course-list.html" class="btn btn-outline-primary mb-0">Join live classes</a> */}
                                    {userType === 'Student' ?
                                        <StudentCourseProgressChart courseProgressValue={courseProgress} /> :
                                        <div className="pt-2 mt-n3 pl-5" style={{ height: '165px' }}></div>
                                    }
                                </div>
                                <div class="col-12">
                                    <div class="bg-transparent card-body p-0 mt-2 mt-sm-0 d-flex">
                                        <div class="row d-sm-flex justify-sm-content-between mt-2 mt-md-0">
                                            {/* Avatar */}

                                            {/* Profile info */}


                                        </div>
                                        
                                    </div>

                                    {/* Advanced filter responsive toggler START */}
                                    {/* Divider */}
                                    <span class="d-xl-none" />
                                    <div class="col-12 col-xl-3 d-flex justify-content-between align-items-center">
                                        <a class="h6 mb-0 fw-bold d-xl-none" href="#">Menu</a>
                                        <button class="btn btn-primary d-xl-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar" aria-controls="offcanvasSidebar">
                                            <FontAwesomeIcon icon={faSliders} onClick={toggleSidebar} />
                                        </button>
                                    </div>
                                    {/* Advanced filter responsive toggler END */}
                                </div>
                            </div>
                        </div>
                        {/* {hamburger && <div className="col-lg-3 col-md-2 gx-4 mt-5">
                            {!isErrorPage && <Sidebar_new />}
                        </div>}
                        {hamburger ? <div className='col-md-9 col-lg-10 col-sm-12 content'>
                            <div className=''>
                                
                                <Body />
                                <Footer />
                            </div>
                        </div> :
                            <div className='col-md-12 col-lg-12 col-sm-12 content'>
                                <div className=''>
                                    {!isErrorPage && <Navber />}
                                    <Body />
                                    <Footer />
                                </div>
                            </div>
                        } */}
                        <div className="container-fluid mt-4 px-5">
                            <div className="row">
                                <div className="col-md-2 d-sm-done">
                                    <div>

                                        {!isErrorPage && <Sidebar_new />}
                                    </div>
                                </div>
                                <div className="col-md-2 d-lg-none d-xl-none">
                                    <div className={`sidebar transition-width duration-300 bgt bgo  ${isSidebarVisible ? ' ' : 'sidebar translate-100'}`}>

                                        {!isErrorPage && <Sidebar_new />}
                                    </div>
                                </div>

                                <div className="col-md-10">
                                    <Body />
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Master_Layout;