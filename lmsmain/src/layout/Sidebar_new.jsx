import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faListCheck, faBook, faHandHoldingHand, faCertificate } from '@fortawesome/free-solid-svg-icons';

const Sidebar_new = () => {

    const [userType,setUserType] = useState();

    useEffect(()=>{
        setUserType(localStorage.getItem('userType'))
     },[])

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
                    <div className="bg-theme-green border rounded p-3 w-100">
                        {/* Dashboard menu */}
                        <div className="list-group list-group-dark list-group-borderless collapse-list">
                            <NavLink className="list-group-item nav-link" to="/">
                            <i className="fa fa-th-large" style={{marginRight: '10px'}}/>
                                Overview</NavLink>
                            <NavLink className="list-group-item nav-link" to="/student-meetings">
                                <FontAwesomeIcon icon={faCalendar} style={{marginRight: '10px'}} />Calender</NavLink>
                            <NavLink className="list-group-item nav-link" to="/courses"><FontAwesomeIcon className='mr-10 text-white' icon={faBook} />My Courses</NavLink>
                            {/* <NavLink
                                className="list-group-item nav-link list-group-item-action"
                                onClick={toggleMenu}
                                role="button"
                                aria-expanded={isOpen}
                                aria-controls="collapseauthentication"
                            >
                                <FontAwesomeIcon className='mr-10 text-white' icon={faListCheck} />Evaluation </NavLink> */}
                            {/* Submenu */}
                            {/* <div className={`collapse ${isOpen ? 'show' : ''}`} id="collapseauthentication">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="#">Dropdown item 1</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="#">Dropdown item 2</NavLink>
                                    </li>
                                </ul>
                            </div> */}
   
                            <NavLink className="list-group-item nav-link" to="student-quiz.html"><FontAwesomeIcon className='mr-10 text-white' icon={faHandHoldingHand} />Placement</NavLink>
                            <NavLink className="list-group-item nav-link" to="student-payment-info.html"><FontAwesomeIcon className='mr-10 text-white' icon={faCertificate} />Certification</NavLink>
                        
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar_new
