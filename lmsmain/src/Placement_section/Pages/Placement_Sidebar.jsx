import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";


export default function Placement_Sidebar(){

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
        <div className='mt-4'>
            <li>
                {/* <a href="#">Products</a> */}
                <NavLink className="nav-link" style={{ paddingLeft: "30%" }} to="/">
                    Applied 
                </NavLink>

            </li>
            {/* <li>
                
                <NavLink className="nav-link" style={{ paddingLeft: "30%" }} to="/on-process">
                   On Process 
                </NavLink>

            </li> */}
            <li>
                <NavLink className="nav-link" style={{ paddingLeft: "30%" }} to="/Placement_Selected">
                    Selected 
                </NavLink>
            </li>



{/*            
            <li>
                <span onClick={toggleDropdown} className="nav-link " style={{ fontSize: '12pt', paddingLeft: "30%" }}>Tests <i class="fa fa-chevron-down"></i></span>
                {dropdownOpen && (
                    <ul className="dropdown-menu-item" style={{ background: '#C0C0C0' }}>
                        <li>
                            <NavLink style={{ paddingLeft: "30%" }} className="nav-link" to="/mentor-test">Create Test</NavLink>
                        </li>
                        <li>
                            <NavLink style={{ paddingLeft: "30%" }} className="nav-link" to="/view-test">View Tests</NavLink>
                        </li>
                        <li>
                            <NavLink style={{ paddingLeft: "30%" }} className="nav-link" to="/mentor-see-results">Results</NavLink>
                        </li>

                    </ul>
                )}
            </li> */}
            

           


        </div>
    )
}