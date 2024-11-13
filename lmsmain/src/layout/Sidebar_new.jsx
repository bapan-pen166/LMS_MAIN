import React from 'react'
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoCalendarNumberOutline } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faListCheck, faBook, faHandHoldingHand, faCertificate } from '@fortawesome/free-solid-svg-icons';

const Sidebar_new = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    //Sidebar
    const [activeDropdown, setActiveDropdown] = useState(null);
    
    return (
        <>  
            <div className='offcanvas'>
                <div class="offcanvas-header bg-light">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">My profile</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasSidebar" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body p-3 p-xl-0">
                    <div class="bg-theme-green border rounded p-3 w-100">
                        {/* Dashboard menu */}
                        <div class="list-group list-group-dark list-group-borderless collapse-list">
                            <a class="list-group-item active" href="student-dashboard.html">
                            <i class="fa fa-th-large custom-icon" style={{marginRight: '10px'}}/>
                                Overview</a>
                            <a class="list-group-item" href="student-subscription.html">
                                <FontAwesomeIcon icon={faCalendar} style={{marginRight: '10px'}} />Calender</a>
                            <a class="list-group-item" href=""><FontAwesomeIcon className='mr-10 text-white' icon={faBook} />My Courses</a>
                            <a
                                className="list-group-item list-group-item-action"
                                onClick={toggleMenu}
                                role="button"
                                aria-expanded={isOpen}
                                aria-controls="collapseauthentication"
                            >
                                <FontAwesomeIcon className='mr-10 text-white' icon={faListCheck} />Evaluation </a>
                            {/* Submenu */}
                            <div className={`collapse ${isOpen ? 'show' : ''}`} id="collapseauthentication">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Dropdown item 1</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Dropdown item 2</a>
                                    </li>
                                </ul>
                            </div>
   
                            <a class="list-group-item" href="student-quiz.html"><FontAwesomeIcon className='mr-10 text-white' icon={faHandHoldingHand} />Placement</a>
                            <a class="list-group-item" href="student-payment-info.html"><FontAwesomeIcon className='mr-10 text-white' icon={faCertificate} />Certification</a>
                        
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar_new
