import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Student_Overview from './Student_Overview';
import "../../assets/css/Sidebar/Sidebar.css"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Student_Sidebar = () => {
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
        <div className='mt-4 pl-4'>
            <li>
                {/* <a href="#">Products</a> */}
                <NavLink className="nav-link" style={{ paddingLeft: "5%" }} to="/">
                    Overview
                </NavLink>

            </li>
            <li>
                <NavLink className="nav-link" style={{ paddingLeft: "5%" }} to="/student-meetings">
                    Calendar
                </NavLink>
            </li>



            <li>
                <NavLink className="nav-link " style={{ paddingLeft: "5%" }} to="student-courses">
                    Courses
                </NavLink>
            </li>
            {/* <li>
                <NavLink className="nav-link " style={{ paddingLeft: "30%" }} to="mentor-test">
                    Tests
                </NavLink>
            </li> */}
            <li >
                <span onClick={toggleDropdown} className="nav-link " style={{ fontSize: '12pt', paddingLeft: "5%",display:"flex",justifyContent:"space-between" }}> <div>Evaluation</div>  <div style={{cursor:"pointer"}}> {dropdownOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/> }</div> </span>
                {dropdownOpen && (
                    <ul className="dropdown-menu-item" >
                        <li>
                            <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to='/Student_Assignment'>Assignment</NavLink>
                        </li>
                        <li>
                            <NavLink style={{ paddingLeft: "10%" }} className="nav-link" to="/student-test"> Tests</NavLink>
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

            <li>
                <NavLink className="nav-link " style={{ paddingLeft: "5%" }} to="Students-placements">
                    Placement
                </NavLink>
            </li>
            <li>
                <NavLink className="nav-link " style={{ paddingLeft: "5%" }} to="certification">
                   Certification
                </NavLink>
            </li>

            


        </div>
    )
}

export default Student_Sidebar