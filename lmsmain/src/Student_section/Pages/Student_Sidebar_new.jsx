import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Student_Overview from './Student_Overview';
import "../../assets/css/Sidebar/Sidebar.css"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faListCheck, faAngleDown, faBook, faUserGraduate, faAward, faCogs, faHomeUser, faArrowTrendUp, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const Student_Sidebar_new = () => {
    const [userType, setUserType] = useState();


    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        // setDropdownOpen(true);
    };

    useEffect(() => {
        setUserType(localStorage.getItem('userType'))
    }, [])



    return (

        <>
            {/* <a href="#">Products</a> */}
            <NavLink className="" style={{ paddingLeft: "5%" }} to="/">
                <FontAwesomeIcon className='mr-10 ' icon={faListCheck} />
                Overview
            </NavLink>



            <NavLink className="" style={{ paddingLeft: "5%" }} to="/student-meetings">
                <FontAwesomeIcon className='mr-15 ' icon={faCalendar} />
                Calendar
            </NavLink>





            <NavLink className=" " style={{ paddingLeft: "5%" }} to="student-courses">
                <FontAwesomeIcon className='mr-15 ' icon={faBook} />
                Courses
            </NavLink>

            {/* 
                <NavLink className=" " style={{ paddingLeft: "30%" }} to="mentor-test">
                    Tests
                </NavLink>
             */}
            <span onClick={toggleDropdown} className=" " style={{ fontSize: '14px', color:'#fff', paddingLeft: "3%", display: "flex", alignItems: 'center' }}> <FontAwesomeIcon className='mr-15' icon={faArrowTrendUp} /><div>Evaluation</div>  <div style={{ cursor: "pointer" }}> {dropdownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</div> </span>
            {dropdownOpen && (
                <ul className="dropdown-menu-item" >

                    <NavLink style={{ paddingLeft: "10%" }} className="list-group" to='/Student_Assignment'>
                        <FontAwesomeIcon className='mr-10' icon={faClipboardList} />
                        Assignment
                    </NavLink>


                    <NavLink style={{ paddingLeft: "10%" }} className="list-group" to="/student-test"> Tests</NavLink>


                    {/* <NavLink style={{ paddingLeft: "30%" }} className="" to="/view-test">View Tests</NavLink> */}


                    {/* <NavLink style={{ paddingLeft: "30%" }} className="" to="/mentor-see-results">Results</NavLink> */}


                </ul>
            )}



            <NavLink  style={{ paddingLeft: "5%" }} to="Students-placements">
                <FontAwesomeIcon className="mr-15" icon={faUserGraduate} />
                Placement
            </NavLink>


            <NavLink className=" " style={{ paddingLeft: "5%" }} to="certification">
                <FontAwesomeIcon className="mr-15" icon={faAward} />
                Certification
            </NavLink>
        </>





    )
}

export default Student_Sidebar_new