import React, { useEffect, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
// import logo from '../assets/img/Login_img/logo.png';
import logo from '../assets/img/Technostruct_Logo/TSA Logo 2024-EPS-01.png'
import { useState } from 'react';
import "../assets/css/Sidebar/Sidebar.css"
import Mntor_Sidebar from '../Mentor_section/pages/Mntor_Sidebar';
import axios from 'axios';
import Student_Sidebar from '../Student_section/Pages/Student_Sidebar';
import Placement_Sidebar from '../Placement_section/Pages/Placement_Sidebar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Datacontext } from '../Context';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MdOutlineAssignment } from "react-icons/md";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
function Sidebar() {
    const [userType, setUserType] = useState();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenPlacement, setDropdownOpenPlacement] = useState(false);
    const { sethamburger, hamburger, setLogedin } = useContext(Datacontext);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        // setDropdownOpen(true);
    };

    const toggleDropdownPlacement = () => {
        setDropdownOpenPlacement(!dropdownOpenPlacement)
    }

    useEffect(() => {
        setUserType(localStorage.getItem('userType'))
    }, [])


    //  useEffect(()=>{
    //      axios.post(`http://192.168.1.7:5000/accessRight`,{userType})
    //       .then(response =>{
    //           console.log("sidebar :",response.data);
    //       })
    //  },[])


    const hamburgerToggle = () => {
        sethamburger(!hamburger)
        // console.log("I am from burger   for checking    ",hamburger);
    }

    const toggleDropdownForAssignmets = () => {
        setDropdownOpenForAssignmets(!dropdownOpenForAssignmets);
    }

    const [dropdownOpenForAssignmets, setDropdownOpenForAssignmets] = useState(false);

    const toggleDropdownForTests = () => {
        setDropdownOpenForTests(!dropdownOpenForTests);
    }

    const [dropdownOpenForTests, setDropdownOpenForTests] = useState(false);


    return (
        <>

            <div className='sidebar col-md-2 col-lg-2 g-5 full-sidebar ' style={{ zIndex: "5", backgroundColor: "#f2edf3", paddingLeft: "15px", boxShadow: "2px 2px 2px rgba(128, 128, 128, 0.2)" }}>
                <ul className="list-unstyled ">
                    <img src={logo} alt="" className='nav-logo' style={{ paddingLeft: "20px", width: "85%", height: '4%', paddingRight: "5px", marginTop: "0px" }} />
                    <button onClick={hamburgerToggle} className="bar_icon" style={{ backgroundColor: 'transparent', border: 'none' }}> <ArrowBackIosNewIcon style={{ marginTop: "15px", marginLeft: "0px" }} /> </button>
                    {userType === "Admin" ? (<div className='mt-4'>

                        <li className='ml-4'>
                            {/* <a href="#">Products</a> */}
                            <NavLink className="nav-link" style={{ paddingLeft: "4%" }} to="/">
                                Overview
                            </NavLink>

                        </li>

                        <li className='ml-4'>
                            <span onClick={toggleDropdown} className="nav-link " style={{ fontSize: '12pt', paddingLeft: "4%", display: "flex", justifyContent: "space-between" }}> <div> Students</div>  <div style={{ cursor: "pointer" }}> {dropdownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</div> </span>
                            {dropdownOpen && (
                                <ul className="dropdown-menu-item" style={{}}>
                                    <li>
                                        <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="mentor-students-dashboard">Student Dashboard</NavLink>
                                    </li>
                                    <li>
                                        <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to={'/Student-List'}>Student List</NavLink>
                                    </li>

                                </ul>
                            )}
                        </li>
                        <li className='ml-4'>
                            <NavLink className="nav-link " style={{ paddingLeft: "4%" }} to="/courses">
                                Courses
                            </NavLink>
                        </li>

                        <li className='ml-4'>
                            <NavLink className="nav-link " style={{ paddingLeft: "4%" }} to="/mentors">
                                Mentors
                            </NavLink>
                        </li>

                        <li className='ml-4'>
                            <NavLink className="nav-link " style={{ paddingLeft: "4%" }} to="/batches">
                                Batches
                            </NavLink>
                        </li>

                        <li className='ml-4'>
                            <span onClick={toggleDropdownPlacement} className="nav-link " style={{ fontSize: '12pt', paddingLeft: "4%", display: "flex", justifyContent: "space-between" }}> <div>Placement</div> <div style={{ cursor: "pointer" }}> {dropdownOpenPlacement ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</div> </span>
                            {dropdownOpenPlacement && (
                                <ul className="dropdown-menu-item" style={{}}>
                                    <li>
                                        <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to={'/placement-dashboard'}>Placement Dashboard</NavLink>
                                    </li>
                                    <li>
                                        <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/placements">Company Details</NavLink>
                                    </li>
                                    <li>
                                        <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to={'/admin-placement-list'}>Placement List</NavLink>
                                    </li>

                                </ul>
                            )}
                        </li>


                        <li className='ml-4'>
                            <NavLink className="nav-link" style={{ paddingLeft: "4%" }} to="/meeting">
                                Calendar
                            </NavLink>
                        </li>
                        <li className='ml-4'>
                            <span onClick={toggleDropdownForTests} className="nav-link " style={{ fontSize: '12pt', paddingLeft: "4%", display: "flex", justifyContent: "space-between" }}> <div><DriveFileRenameOutlineIcon /> Tests</div>  <div style={{ cursor: "pointer" }}> {dropdownOpenForTests ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</div> </span>
                            {/* <span onClick={toggleDropdown} className="nav-link " style={{ fontSize: '12pt', paddingLeft: "8%" }}> <DriveFileRenameOutlineIcon/> Tests <i class="fa fa-chevron-down"></i></span> */}
                            {dropdownOpenForTests && (
                                <ul className="dropdown-menu-item" >
                                    <li>
                                        <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/mentor-test"> Create Test</NavLink>
                                    </li>
                                    <li>
                                        <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/view-test">View Tests</NavLink>
                                    </li>
                                    <li>
                                        <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/test_evaluation">Test Evaluation</NavLink>

                                    </li>
                                    <li>
                                        <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/mentor-see-results">Results</NavLink>
                                    </li>

                                </ul>
                            )}
                        </li>
                        {/* <li> */}
                        {/* <NavLink className="nav-link " style={{ paddingLeft: "30%" }} to="mentor-apply-leave">
                    Leave
                </NavLink>
            </li> */}

                        <li className='ml-4'>
                            <span onClick={toggleDropdownForAssignmets} className="nav-link " style={{ fontSize: '12pt', paddingLeft: "4%", display: "flex", justifyContent: "space-between" }}> <div><MdOutlineAssignment />  Assignments</div>  <div style={{ cursor: "pointer" }}> {dropdownOpenForAssignmets ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</div> </span>
                            {/* <span onClick={toggleDropdownForAssignmets} className="nav-link " style={{ fontSize: '12pt', paddingLeft: "10%" }}><MdOutlineAssignment/> Assignments <i class="fa fa-chevron-down"></i></span> */}
                            {dropdownOpenForAssignmets && (
                                <ul className="dropdown-menu-item" >
                                    <li>
                                        <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/Mentor-Assignments-creation">Create</NavLink>
                                    </li>
                                    <li>
                                        <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/Mentor-Submission-List">Submission List</NavLink>
                                    </li>
                                    <li>
                                        {/* <NavLink style={{ paddingLeft: "30%" }} className="nav-link" to="/view-test">View Tests</NavLink> */}
                                    </li>
                                    <li>
                                        {/* <NavLink style={{ paddingLeft: "30%" }} className="nav-link" to="/mentor-see-results">Results</NavLink> */}
                                    </li>

                                </ul>
                            )}
                        </li>

                        <li className='ml-4'>
                            <NavLink className="nav-link" style={{ paddingLeft: "4%" }} to="/leave-management">
                                Leave Management
                            </NavLink>
                        </li>

                        <li className='ml-4'>
                            <NavLink className="nav-link" style={{ paddingLeft: "4%" }} to="/settings">
                                Settings
                            </NavLink>

                        </li>


                    </div>) : userType === "Mentor" || userType == "Mentor_Assistant" ?

                        <Mntor_Sidebar /> : userType === "Student" ? <Student_Sidebar /> : userType === "Placement" ? <Placement_Sidebar /> : null
                    }
                </ul>
            </div>


        </>
    );
}

export default Sidebar;