import React,{ useState, useContext } from 'react';
import Navber from './Navbar';
import Sidebar from './Sidebar';
import Body from './Body';
import Footer from './Footer';
import { Datacontext } from '../Context';


import '../assets/css/Navbar/Navbar.css';
import { useLocation,  matchPath } from 'react-router-dom';


function Master_Layout() {
    const {hamburger } = useContext(Datacontext);
    const location = useLocation();

        // List all your valid paths here
        const validPaths = [
            '/', '/overview', '/login', '/test', '/Student-List', '/meeting',
            '/mentor-overview', '/change-password', '/mentor-courses', '/mentors',
            '/courses', '/batches', '/mentor-test', '/member-profile',
            '/mentor-evaluation-status', '/mentor-take-test', '/mentor-see-results',
            '/view-test', '/student-courses', '/student-test', '/student-update-profile',
            '/mentor-students-dashboard', '/admin-change-password', '/placements',
            '/settings', '/mentor-apply-leave', '/mentor-meeting', '/leave-management','/certification',
            '/student-meetings','/admin-placement-list','/mentor-assignments-creation','/Students-placements','/Student_Assignment','Mentor-view-questions','Mentor-view-questions/:id','/Mentor-Submission-List','/Mentor-change-password','/Student-change-password','/Placement_Selected','student-test-details/:id','/test_evaluation','placement-dashboard'
        ];
    
        // Check if the current location matches any of the valid paths
        const isValidPath = validPaths.some(path =>
            matchPath({ path, end: true }, location.pathname)
        );

        /*
           matchPath => matches the of two path and location.pathname
           { path, end: true }: This is an object passed as the first argument to matchPath. The path key is the current path being checked (from the validPaths array), and end: true indicates that the entire location.pathname must match the path exactly, not just the beginning of it.
        
        */
    
        // If the path is not valid, treat it as an error page
        const isErrorPage = !isValidPath;

    return ( 
        <>
        <div className='full-page'>
            <div className='container-fluid'>
                <div className='row container-fluid' style={{marginLeft:'0px',marginRight:"0px"}}>
                    {hamburger &&<div className="col-lg-2 col-md-2 gx-4">
                        {!isErrorPage && <Sidebar/>}
                   </div>}
                    {hamburger ? <div className='col-md-10 col-lg-10 col-sm-12 content'>
                        <div className=''>
                        {!isErrorPage && <Navber/> }
                            <Body/>
                            <Footer/>
                        </div>
                    </div> :
                        <div className='col-md-12 col-lg-12 col-sm-12 content'>
                        <div className=''>
                        {!isErrorPage &&  <Navber/>}
                            <Body/>
                            <Footer/>
                        </div>
                    </div> 
                    }
                </div>
            </div>
        </div>
        </>
     );
}

export default Master_Layout;