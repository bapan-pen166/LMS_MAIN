import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Mntor_Sidebar from '../Mentor_section/pages/Mntor_Sidebar';
import Mentor_Sidebar from '../Mentor_section/pages/Mentor_Sidebar';
import Student_Sidebar_new from '../Student_section/Pages/Student_Sidebar_new';
import Placement_Sidebar from '../Placement_section/Pages/Placement_Sidebar';
import { faCalendar, faListCheck, faAngleDown, faBook, faUserGraduate, faAward, faCogs, faHomeUser } from '@fortawesome/free-solid-svg-icons';

const Sidebar_new = () => {

    const [userType, setUserType] = useState();

    useEffect(() => {
        setUserType(localStorage.getItem('userType'))
    }, [])

    const [isOpen, setIsOpen] = useState(false);
    const [isPlacementOpen, setIsPlacementOpen] = useState(false);
    const [isTestOpen, setIsTestOpen] = useState(false);
    const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const togglePlacementMenu = () => {
        setIsPlacementOpen(!isPlacementOpen);
    };

    const toggleTestMenu = () => setIsTestOpen(!isTestOpen);
    const toggleAssignmentMenu = () => setIsAssignmentOpen(!isAssignmentOpen);
    //Sidebar
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <>
            <div className='offcanvas'>
                <div className="offcanvas-header bg-light">
                    {/* <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5> */}
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body p-3 p-xl-0">
                    <div className="bg-theme-green border rounded p-2 height-55vh overflow-auto">
                        {/* Dashboard menu */}
                        <div className="list-group list-group-dark list-group-borderless collapse-list">
                            {userType === "Admin" ? (
                                <>
                                    <NavLink className="list-group-item nav-link" to="/">
                                        <i className="fa fa-th-large" style={{ marginRight: '10px' }} />
                                        Overview</NavLink>

                                    <div
                                        className="list-group-item nav-link list-group-item-action p-2 d-flex"
                                        onClick={toggleMenu}
                                        role="button"
                                        aria-expanded={isOpen}
                                        aria-controls="collapseauthentication"
                                        style={{ alignItems: "center" }}
                                    >
                                        <FontAwesomeIcon className='mr-10' icon={faListCheck} />Students <span className='pull-right'><FontAwesomeIcon className='mr-10' icon={faAngleDown} /></span></div>
                                    {/* Submenu */}
                                    <div className={`collapse ${isOpen ? 'show' : ''}`} id="collapseauthentication">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to="mentor-students-dashboard">Student Dashboard</NavLink>
                                            </li>

                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to={'/Student-List'}>Student List</NavLink>
                                            </li>
                                        </ul>
                                    </div>

                                    <NavLink className="list-group-item nav-link" style={{ paddingLeft: "4%" }} to="/courses">
                                        <FontAwesomeIcon className='mr-10 ' icon={faBook} />
                                        Courses
                                    </NavLink>
                                    <NavLink className="list-group-item nav-link" style={{ paddingLeft: "4%" }} to="/mentors">
                                        <FontAwesomeIcon className='mr-10 ' icon={faUserGraduate} />
                                        Mentors
                                    </NavLink>
                                    <NavLink className="list-group-item nav-link" style={{ paddingLeft: "4%" }} to="/batches">
                                        <FontAwesomeIcon className='mr-10 ' icon={faAward} />
                                        Batches
                                    </NavLink>


                                    <div
                                        className="list-group-item nav-link list-group-item-action p-2"
                                        onClick={togglePlacementMenu}
                                        role="button"
                                        aria-expanded={isOpen}
                                        aria-controls="collapseauthentication"
                                    >
                                        <FontAwesomeIcon className='mr-10 ' icon={faListCheck} />Placement <span className=''><FontAwesomeIcon className='mr-10 ' icon={faAngleDown} /></span></div>
                                    {/* Submenu */}
                                    <div className={`collapse ${isPlacementOpen ? 'show' : ''}`} id="collapseauthentication">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to={'/placement-dashboard'}>Placement Dashboard</NavLink>
                                            </li>

                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to='/placements'>Company Details</NavLink>
                                            </li>

                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to={'/admin-placement-list'}>Placement List</NavLink>
                                            </li>
                                        </ul>
                                    </div>


                                    <NavLink className="nav-link pl-3" to="/meeting">
                                        <FontAwesomeIcon className='mr-10 ' icon={faCalendar} />
                                        Calendar
                                    </NavLink>

                                    {/* Test Menu */}
                                    <div
                                        className="list-group-item nav-link list-group-item-action p-2"
                                        onClick={toggleTestMenu}
                                        role="button"
                                        aria-expanded={isTestOpen}
                                        aria-controls="collapseTests"
                                    >
                                        <FontAwesomeIcon className="mr-10 " icon={faListCheck} />{' '}
                                        Tests
                                        <span className="">
                                            <FontAwesomeIcon className="mr-10 " icon={faAngleDown} />
                                        </span>
                                    </div>
                                    <div
                                        className={`collapse ${isTestOpen ? 'show' : ''}`}
                                        id="collapseTests"
                                    >
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to="/mentor-test">
                                                    Create Test
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to="/view-test">
                                                    View Tests
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to="/test_evaluation">
                                                    Test Evaluation
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to="/mentor-see-results">
                                                    Results
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Assignment Menu */}
                                    <div
                                        className="list-group-item nav-link list-group-item-action p-2"
                                        onClick={toggleAssignmentMenu}
                                        role="button"
                                        aria-expanded={isAssignmentOpen}
                                        aria-controls="collapseAssignments"
                                    >
                                        <FontAwesomeIcon className="mr-10 " icon={faListCheck} />{' '}
                                        Assignments
                                        <span className="">
                                            <FontAwesomeIcon className="mr-10 " icon={faAngleDown} />
                                        </span>
                                    </div>
                                    <div
                                        className={`collapse ${isAssignmentOpen ? 'show' : ''}`}
                                        id="collapseAssignments"
                                    >
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <NavLink
                                                    className="nav-link pl-3"
                                                    to="/Mentor-Assignments-creation"
                                                >
                                                    Create
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink
                                                    className="nav-link pl-3"
                                                    to="/Mentor-Submission-List"
                                                >
                                                    Submission List
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>


                                    <NavLink className="nav-link pl-3" to="/leave-management">
                                        <FontAwesomeIcon className='mr-10' icon={faHomeUser} />
                                        Leave Management
                                    </NavLink>

                                    <NavLink className="nav-link pl-3" to="/settings">
                                        <FontAwesomeIcon className='mr-10 ' icon={faCogs} />
                                        Settings
                                    </NavLink>
                                </>)
                                : userType === "Mentor" ?

                                    <Mentor_Sidebar /> : userType === "Student" ? <Student_Sidebar_new /> : userType === "Placement" ? <Placement_Sidebar /> : null
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar_new
