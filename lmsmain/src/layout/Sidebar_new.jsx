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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const togglePlacementMenu = () => {
        setIsPlacementOpen(!isPlacementOpen);
    };
    //Sidebar
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <>
            <div className='offcanvas'>
                <div className="offcanvas-header bg-light">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body p-3 p-xl-0">
                    <div className="bg-theme-green border rounded p-2 w-100">
                        {/* Dashboard menu */}
                        <div className="list-group list-group-dark list-group-borderless collapse-list">
                            {userType === "Admin" ? (
                                <>
                                    <NavLink className="list-group-item nav-link" to="/">
                                        <i className="fa fa-th-large" style={{ marginRight: '10px' }} />
                                        Overview</NavLink>

                                    <div
                                        className="list-group-item nav-link list-group-item-action p-2"
                                        onClick={toggleMenu}
                                        role="button"
                                        aria-expanded={isOpen}
                                        aria-controls="collapseauthentication"
                                    >
                                        <FontAwesomeIcon className='mr-10' icon={faListCheck} />Students <span className='pull-right'><FontAwesomeIcon className='mr-10' icon={faAngleDown} /></span></div>
                                    {/* Submenu */}
                                    <div className={`collapse ${isOpen ? 'show' : ''}`} id="collapseauthentication">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to="mentor-students-dashboard">Student Dashboard</NavLink>
                                            </li>
                                            <hr className='my-1' />
                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to={'/Student-List'}>Student List</NavLink>
                                            </li>
                                        </ul>
                                    </div>

                                    <NavLink className="list-group-item nav-link" style={{ paddingLeft: "4%" }} to="/courses">
                                        <FontAwesomeIcon className='mr-10 text-white' icon={faBook} />
                                        Courses
                                    </NavLink>
                                    <NavLink className="list-group-item nav-link" style={{ paddingLeft: "4%" }} to="/mentors">
                                        <FontAwesomeIcon className='mr-10 text-white' icon={faUserGraduate} />
                                        Mentors
                                    </NavLink>
                                    <NavLink className="list-group-item nav-link" style={{ paddingLeft: "4%" }} to="/batches">
                                        <FontAwesomeIcon className='mr-10 text-white' icon={faAward} />
                                        Batches
                                    </NavLink>


                                    <div
                                        className="list-group-item nav-link list-group-item-action p-2"
                                        onClick={togglePlacementMenu}
                                        role="button"
                                        aria-expanded={isOpen}
                                        aria-controls="collapseauthentication"
                                    >
                                        <FontAwesomeIcon className='mr-10 text-white' icon={faListCheck} />Placement <span className='pull-right'><FontAwesomeIcon className='mr-10 text-white' icon={faAngleDown} /></span></div>
                                    {/* Submenu */}
                                    <div className={`collapse ${isPlacementOpen ? 'show' : ''}`} id="collapseauthentication">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to={'/placement-dashboard'}>Placement Dashboard</NavLink>
                                            </li>
                                            <hr className='my-1' />
                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to='/placements'>Company Details</NavLink>
                                            </li>
                                            <hr className='my-1' />
                                            <li className="nav-item">
                                                <NavLink className="nav-link pl-3" to={'/admin-placement-list'}>Placement List</NavLink>
                                            </li>
                                        </ul>
                                    </div>


                                    <NavLink className="nav-link pl-3" to="/meeting">
                                        <FontAwesomeIcon className='mr-10 text-white' icon={faCalendar} />
                                        Calendar
                                    </NavLink>

                                    <NavLink className="nav-link pl-3" to="/leave-management">
                                        <FontAwesomeIcon className='mr-10 text-white' icon={faHomeUser} />
                                        Leave Management
                                    </NavLink>

                                    <NavLink className="nav-link pl-3" to="/settings">
                                        <FontAwesomeIcon className='mr-10 text-white' icon={faCogs} />
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
