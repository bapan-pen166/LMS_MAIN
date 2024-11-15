import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import "../../assets/css/Sidebar/Sidebar.css"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faList, faSquarePollHorizontal, faBook, faMagnifyingGlassChart, faFileClipboard, faFilePen, faListCheck, faArrowTrendUp, faClipboardList, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MdOutlineDashboard } from "react-icons/md";

const Mentor_Sidebar = () => {
    const [userType, setUserType] = useState();


    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenForAssignmets, setDropdownOpenForAssignmets] = useState(false);
    
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        // setDropdownOpen(true);
    };
    const toggleDropdownForAssignmets = () => {
        setDropdownOpenForAssignmets(!dropdownOpenForAssignmets);
        // setDropdownOpen(true);
    };

    useEffect(() => {
        setUserType(localStorage.getItem('userType'))
    }, [])



    return (

        <>
            {/* <a href="#">Products</a> */}
            <NavLink className="" style={{ paddingLeft: "5%" }} to="/">
                <MdOutlineDashboard className='mr-10'/>
                Dashboard
            </NavLink>



            <NavLink className="" style={{ paddingLeft: "5%" }} to="/mentor-meeting">
                <FontAwesomeIcon className='mr-15 ' icon={faCalendar} />
                Calendar
            </NavLink>





            <NavLink className=" " style={{ paddingLeft: "5%" }} to="mentor-courses">
                <FontAwesomeIcon className='mr-15 ' icon={faBook} />
                Courses
            </NavLink>

            {/* 
                <NavLink className=" " style={{ paddingLeft: "30%" }} to="mentor-test">
                    Tests
                </NavLink>
             */}
            <span onClick={toggleDropdown} className=" " style={{ fontSize: '12pt', color:'#fff', paddingLeft: "3%", display: "flex", alignItems: 'center' }}> <FontAwesomeIcon className='mr-10 ' icon={faFilePen} /><div>Tests</div>  <div style={{ cursor: "pointer" }}> {dropdownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</div> </span>
            {dropdownOpen && (
                <ul className="dropdown-menu-item" >

                    <NavLink style={{ paddingLeft: "10%", display: 'flex-inline' }} className="list-group" to="/mentor-test"><FontAwesomeIcon className='mr-10 ' icon={faPlus} />Create Tests</NavLink>


                    <NavLink style={{ paddingLeft: "10%" }} className="border-bottom" to="/view-test"><FontAwesomeIcon className='mr-10 ' icon={faList} />View Tests</NavLink>

                    <NavLink style={{ paddingLeft: "10%" }} className="border-bottom nav-link" to="/test_evaluation"><FontAwesomeIcon className='mr-10 ' icon={faMagnifyingGlassChart} />Test Evaluation</NavLink>

                    <NavLink style={{ paddingLeft: "10%" }} className="" to="/mentor-see-results"><FontAwesomeIcon className='mr-10 ' icon={faSquarePollHorizontal} />Results</NavLink>


                </ul>
            )}

            <span onClick={toggleDropdownForAssignmets} className=" " style={{ fontSize: '12pt', color:'#fff', paddingLeft: "3%", display: "flex", alignItems: 'center' }}> <FontAwesomeIcon className='mr-10 ' icon={faFileClipboard} /><div>Assignments</div>  <div style={{ cursor: "pointer" }}> {dropdownOpenForAssignmets ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</div> </span>
            {dropdownOpenForAssignmets && (
                <ul className="dropdown-menu-item" >


                    <NavLink style={{ paddingLeft: "10%" }} className="list-group" to="/Mentor-Assignments-creation"><FontAwesomeIcon className='mr-10 border-bottom' icon={faPlus} />Create</NavLink>


                    <NavLink style={{ paddingLeft: "10%" }} className="" to="/Mentor-Submission-List"><FontAwesomeIcon className='mr-10 ' icon={faListCheck} />Submission List</NavLink>



                </ul>
            )}

        </>





    )
}

export default Mentor_Sidebar