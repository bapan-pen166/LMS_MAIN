import React, { useContext } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Datacontext } from './Context';
import App from './App';
// Admin pages 
import Overview from './pages/Overview';
import Login from './pages/Login';
import Login_new from './pages/Login_new.jsx';
import Test from './pages/Test';
import Student_List from './pages/Student_List';
import Meeting from './pages/Meeting';
import Courses from './pages/Courses';
import Mentors from './pages/Mentors';
import Batches from './pages/Batches';
import Mentor_Students_Dashboard from './pages/Mentor_Students_Dashboard';
import Admin_Change_password from './pages/Admin_Change_password';
import Placements from './pages/Placements';
import Settings from './pages/Settings';
import Admin_Placement_List from './pages/Admin_Placement_List.jsx';
import LeaveManagement from './pages/LeaveManagement';
import Placement_Dashboard from './pages/Placement_Dashboard.jsx';
// Mentor Pages 
import Mentor_Overview from './Mentor_section/pages/Mentor_Overview';
import Change_password from './Mentor_section/pages/Change_password.jsx';
import Mentor_courses from './Mentor_section/pages/Mentor_courses';
import Mentor_tests from './Mentor_section/pages/Mentor_tests.jsx';
import UpdateProfile from './Mentor_section/pages/UpdateProfile';
import Mentor_Evaluation_Status from './Mentor_section/pages/Mentor_Evaluation_Status.jsx';
import Mentor_Take_test from './Mentor_section/pages/Mentor_Take_test.jsx';
import Mentor_See_Results from './Mentor_section/pages/Mentor_See_Results.jsx';
import ViewTests from './Mentor_section/pages/ViewTests.jsx';
import ApplyLeave from './Mentor_section/pages/ApplyLeave';
import Mentor_Meeting from './Mentor_section/pages/Mentor_Meeting.jsx';
import Mentor_Assignments_creation from './Mentor_section/pages/Mentor_Assignments_creation.jsx';
import MentorViewQuestions from './Mentor_section/pages/MentorViewQuestions.jsx';
import Mentor_Assingment_Sub_List from './Mentor_section/pages/Mentor_Assingment_Sub_List.jsx';
import Mentor_Change_Password from './Mentor_section/pages/Mentor_Change_Password.jsx';
import Exam_Evaluation from './Mentor_section/pages/Exam_Evaluation.jsx'
// Student Pages 
import Student_Overview from './Student_section/Pages/Student_Overview.jsx';
import Student_Overview_new from './Student_section/Pages/Student_Overview_new.jsx';
import Student_courses from './Student_section/Pages/Student_courses.jsx';
import Student_test from './Student_section/Pages/Student_test.jsx';
import Student_Update_Profile from './Student_section/Pages/Student_Update_Profile.jsx';
import Certification from "./Student_section/Pages/Certification.jsx"
import Student_Meetings from './Student_section/Pages/Student_Meetings.jsx';
import Students_placements from "../src/Student_section/Pages/Students_Placements.jsx"
import Student_Assignment from "../src/Student_section/Pages/Student_Assignment.jsx"
import Student_change_password from './Student_section/Pages/Student_change_password.jsx';
import Student_test_details from './Student_section/Pages/Student_test_details.jsx';
// Placement Pages 
import Placement_Drives from './Placement_section/Pages/Placement_Droves.jsx';
import Placement_Selected from './Placement_section/Pages/Placement_Selected.jsx';
// Other 
import PageNotFound from './ErrorPage/PageNotFound';









const Router = () => {
  const { Usertype } = useContext(Datacontext);
  const [usertype, setUsertype] = useState(localStorage.getItem('userType'));

  useEffect(() => {
    if (Usertype) {
      setUsertype(Usertype);
      localStorage.setItem('userType', Usertype);
    }
  }, [Usertype]);

  const defaultRoute =
    usertype === 'Admin' ? (
      <Route index element={<Overview />} />
    ) : usertype === 'Mentor' ? (
      <Route index element={<Mentor_Overview />} />
    )
    : usertype === 'Student' ? (
      <Route index element={<Student_Overview_new />} />
    )
    : usertype === 'Placement' ? (
      <Route index element={<Placement_Drives/>} />
    )
    : (
      <Route index element={<Login_new />} />
    );

    const basename = '/'
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}>
        {defaultRoute}

        {/* Admin  */}
        {/* <Route path='login' element={<Login />} /> */}
        <Route path='test' element={<Test />} />
        <Route path='Student-List' element={<Student_List />} />
        <Route path='meeting' element={<Meeting />} />
       
        <Route path='change-password' element={<Change_password />} />
        <Route path='mentor-courses' element={<Mentor_courses />} />
        <Route path='mentors' element={<Mentors />}/>
        <Route path='courses' element={<Courses/>}/>
        <Route path='batches' element={<Batches/>}/>
        <Route path='mentor-test' element={<Mentor_tests/>}/>
        <Route path='member-profile' element={<UpdateProfile/>}/>
        <Route path='admin-change-password' element ={<Admin_Change_password/>}/>
        <Route path='placements' element={<Placements/>}/>
        <Route path='settings' element={<Settings/>}/>
        <Route path='mentor-apply-leave' element={<ApplyLeave/>}/>
        <Route path='mentor-meeting' element={<Mentor_Meeting/>}/>
        <Route path='testing' element={<h1>Bapan</h1>}/>
        <Route path='leave-management' element={<LeaveManagement />}/>
        <Route path='admin-placement-list' element={<Admin_Placement_List/>}/>
        <Route path='placement-dashboard' element={<Placement_Dashboard/>}/>


        {/* Mentor  */}
        <Route path='mentor-evaluation-status' element={<Mentor_Evaluation_Status/>} />
        <Route path='mentor-take-test' element={<Mentor_Take_test/>} />
        <Route path='mentor-see-results' element={<Mentor_See_Results/>} />
        <Route path='view-test' element={<ViewTests/>}/>
        <Route path='mentor-students-dashboard' element={<Mentor_Students_Dashboard/>}/>
        <Route path='mentor-assignments-creation' element={<Mentor_Assignments_creation/>}/>
        <Route path='Mentor-view-questions/:id' element={<MentorViewQuestions/>}/>
        <Route path='Mentor-Submission-List' element={<Mentor_Assingment_Sub_List/>}/>
        <Route path='Mentor-change-password' element={<Mentor_Change_Password/>}/>
        <Route path='test_evaluation' element={<Exam_Evaluation/>}/>

        {/* Student  */}
        <Route path='student-courses'element={<Student_courses/>} />
        <Route path='student-test' element={<Student_test/> } />
        <Route path='student-update-profile' element={<Student_Update_Profile/>}/>
        <Route path='certification' element={<Certification/>}/>
        <Route path='student-meetings' element={<Student_Meetings/>}/>
        <Route path='Students-placements' element={<Students_placements/>}/>
        <Route path='Student_Assignment' element={<Student_Assignment/>}/>
        <Route path='Student-change-password' element={<Student_change_password/>}/>
        <Route path='student-test-details/:id' element={<Student_test_details/>}/>


        
        {/*  route for error page */}
        <Route path='*' element={<PageNotFound/>}/>
        
        
        
        
       {/* Placement  */}
        <Route path='Placement_Selected' element={<Placement_Selected/>}/>
      </Route>
    ),
//    {basename}
  );

  return <RouterProvider router={router} />;
};

export default Router;
