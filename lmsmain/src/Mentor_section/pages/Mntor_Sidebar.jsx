import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Mentor_Overview from './Mentor_Overview';
import "../../assets/css/Sidebar/Sidebar.css"
import { MdOutlineDashboard } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { IoBookOutline } from "react-icons/io5";
import { FaBookOpen, FaStar, FaUserEdit, FaWallet, FaCog, FaTrashAlt, FaUsers, FaChartLine, FaFolder } from"react-icons/fa";
import { MdOutlineAssignment } from "react-icons/md";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const Mntor_Sidebar = () => {
    const [userType, setUserType] = useState();


    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [dropdownOpenForAssignmets, setDropdownOpenForAssignmets] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        // setDropdownOpen(true);
    };

    const toggleDropdownForAssignmets = ()=>{
        setDropdownOpenForAssignmets(!dropdownOpenForAssignmets);
    }

    useEffect(() => {
        setUserType(localStorage.getItem('userType'))
    }, [])



    return (
        <div>
            
                {/* <a href="#">Products</a> */}
                <NavLink className="nav-link" style={{ paddingLeft: "10%" }} to="/">
                <MdOutlineDashboard /> Dashboard
                </NavLink>

            
            
                <NavLink className="nav-link" style={{ paddingLeft: "10%" }} to="/mentor-meeting">
                   <IoCalendarOutline/> Calendar
                </NavLink>
            



            
                <NavLink className="nav-link " style={{ paddingLeft: "10%" }} to="mentor-courses">
                   <IoBookOutline/> Courses
                </NavLink>
            
            {/* 
                <NavLink className="nav-link " style={{ paddingLeft: "30%" }} to="mentor-test">
                    Tests
                </NavLink>
             */}
            
                <span onClick={toggleDropdown} className="nav-link " > <DriveFileRenameOutlineIcon/> Tests <i class="fa fa-chevron-down"></i></span>
                {dropdownOpen && (
                    <ul className="dropdown-menu-item" style={{ background: '#C0C0C0'}}>
                        
                            <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/mentor-test"> Create Test</NavLink>
                        
                        
                            <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/view-test">View Tests</NavLink>
                        
                        
                        <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/test_evaluation">Test Evaluation</NavLink>
                        
                        
                        
                            <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/mentor-see-results">Results</NavLink>
                        

                    </ul>
                )}
            
            {/*  */}
            {/* <NavLink className="nav-link " style={{ paddingLeft: "30%" }} to="mentor-apply-leave">
                    Leave
                </NavLink>
             */}

            
                <span onClick={toggleDropdownForAssignmets} className="nav-link " ><MdOutlineAssignment/> Assignments <i class="fa fa-chevron-down"></i></span>
                {dropdownOpenForAssignmets && (
                    <ul className="dropdown-menu-item" style={{ background: '#C0C0C0' }}>
                        
                            <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/Mentor-Assignments-creation">Create</NavLink>
                        
                        
                            <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/Mentor-Submission-List">Submission List</NavLink>
                        
                        
                            {/* <NavLink style={{ paddingLeft: "30%" }} className="nav-link" to="/view-test">View Tests</NavLink> */}
                        
                        
                            {/* <NavLink style={{ paddingLeft: "30%" }} className="nav-link" to="/mentor-see-results">Results</NavLink> */}
                        

                    </ul>
                )}
            


        </div>
    )
}

export default Mntor_Sidebar