import React, { useEffect, useState } from 'react';
import '../../assets/css/Overview/Overview.css'
import "../../assets/css/Utility/utilityColor.css"
import "../../assets/css/Mentor/Mentor_overview.css"
import "../../assets/css/Mentor/Batch_Wise_no_of_classes.css"
import Batch_wise_no_of_classes from '../components/Batch_wise_no_of_classes';
import Batch_wise_attendance_percentage from '../components/Batch_wise_attendance_percentage';
import PieChart from '../components/./PieChart';
import Batch_Wise_Course_Percent from '../components/./PieChart';
import Button from '@mui/material/Button';
import axios from 'axios';
import { api } from '../../ApiUrl/ApiUrl';
import Batch_Assign_Track from '../components/mentor_dashboard/Batch_Assign_Track';
import Assignment_tracker from '../components/mentor_dashboard/Assignment_tracker';
import { IoCalendarNumberOutline } from "react-icons/io5";
import { Pagination } from '@mui/material';
import { faIdBadge, faClipboardCheck, faBookOpen, faPlay, faClock, faMedal, faUserGraduate, faPeopleGroup, faFileClipboard, faUserCheck, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mentor_batch from "../../assets/img/mentor_overview/mentor_batches.png";




const Mentor_Overview = () => {
  const [userType, setUserType] = useState('');
  const [mentorMail, setMentorMail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userId, setUserId] = useState()

  const [todaysMeetings, setTodaysMeetings] = useState();
  const [upcomingMeetings, setUpcomingMeetings] = useState();

  // for the pagination
  const [currentPageToday, setCurrentPageToday] = useState(1);
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
  const itemsPerPage = 4;


  useEffect(() => {
    const type = localStorage.getItem('userType');
    setUserType(type);
    setMentorMail(localStorage.getItem('mentorEmail'))
    setLastName(localStorage.getItem('lastName'))
    setFirstName(localStorage.getItem('firstName'))
    setUserId(localStorage.getItem('id'))
  }, []);

  useEffect(() => {
    if (userType === 'Mentor') {
      todaysClass();
    }
  }, [mentorMail]);

  useEffect(() => {
    if (userType === 'Mentor') {
      upcomingClass();
    }
  }, [mentorMail]);


  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  if (userType !== 'Mentor') {
    return (<>
      <p>This page doesn't exist!</p>
    </>);
  }

  // today's className 
  const todaysClass = () => {
    axios.post(`${api}/mentor/getMentorTodayMeeting`, { email: mentorMail })
      .then((Response) => {
        console.log("today's meetings : ", Response?.data?.meetings);
        setTodaysMeetings(Response?.data?.meetings)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  // upcoming Class 
  const upcomingClass = () => {
    axios.post(`${api}/mentor/getUpcomingMeeting`, { email: mentorMail })
      .then((Response) => {
        console.log("upcoming : ", Response?.data?.meetings);
        setUpcomingMeetings(Response?.data?.meetings);
      })
      .catch((error) => {
        console.log(error);
      })
  }



  const handleMeeting = (meetingLink) => {
    window.open(`${meetingLink}?username=${firstName || ''}%20${lastName || ''}_${userId}`, '_blank');
  }






  // Helper function to group meetings by date
  const groupByDate = (meetings) => {
    return meetings?.reduce((acc, meeting) => {
      const date = meeting.startDate; // Assuming `startDate` holds the date value
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(meeting);
      return acc;
    }, {}) || {}; // Return an empty object if meetings is undefined
  };

  const groupedMeetings = groupByDate(upcomingMeetings);

  const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());


  //   :::::::::::::::::::::::::::: FOR THE PAGINATION  ::::::::::::::::::::::::::::::::::::::
  const paginatedTodaysMeetings = todaysMeetings?.slice((currentPageToday - 1) * itemsPerPage, currentPageToday * itemsPerPage);
  const paginatedUpcomingMeetings = upcomingMeetings?.slice((currentPageUpcoming - 1) * itemsPerPage, currentPageUpcoming * itemsPerPage);

  const handlePageChangeToday = (_, value) => {
    setCurrentPageToday(value);
  };

  const handlePageChangeUpcoming = (_, value) => {
    setCurrentPageUpcoming(value);
  };




  return (
    <div className='row  mentor-overview-main' style={{ backgroundColor: "#fafbfd", fontFamily: "Roboto, sans-serif", marginTop: "0px" }} >

      <div className="col-lg-12 pb-2 border-bottom rounded-lg d-flex justify-content-between align-items-center mb-2">
        <p style={{ fontFamily: "Roboto", fontWeight: "80px", fontSize: "30px" }}>Dashboard</p>
      </div>

      <div className='row'>
        {/* Batches, Students, and Assignments */}
        <div className="col-md-4 col-lg-4 mb-4">
          <div className="card mb-1">
            <div className="d-flex justify-content-between align-items-center p-3 bg-orange bg-opacity-15 rounded-3 " >
              <span className="text-orange">
                <FontAwesomeIcon style={{ fontSize: "5vw" }} icon={faPeopleGroup} />
              </span>
              <div className="ms-4">
                <h5 className="purecounter fw-bold pb-2" style={{ fontSize: "2vw" }}>9</h5>
                <p className="mb-0 h6 fw-light">Total Batches</p>
              </div>
            </div>
          </div>

          <div className="card mb-1">
            <div className="d-flex justify-content-between align-items-center p-3 bg-purple bg-opacity-15 rounded-3">
              <span className="text-purple">
                <FontAwesomeIcon style={{ fontSize: "5vw" }} icon={faUserGraduate} />
              </span>
              <div className="ms-4">
                <h5 className="purecounter fw-bold pb-2" style={{ fontSize: "2vw" }}>52</h5>
                <p className="mb-0 h6 fw-light">Total Students</p>
              </div>
            </div>
          </div>

          <div className="card mb-1">
            <div className="d-flex justify-content-between align-items-center p-3 bg-success bg-opacity-10 rounded-3">
              <span className="text-success">
                <FontAwesomeIcon style={{ fontSize: "5vw" }} icon={faFileClipboard} />
              </span>
              <div className="ms-4">
                <h5 className="purecounter fw-bold pb-2" style={{ fontSize: "2vw" }}>8</h5>
                <p className="mb-0 h6 fw-light">Total Assignments</p>
              </div>
            </div>
          </div>
        </div>
        {/* Today's Classes */}
        <div className='col-md-4'>
          <div className="mb-4" style={{ borderRadius: "10px", backgroundColor: "#fafbfd" }}>
            <p className="text-center p-2" style={{ fontSize: "20px" }}>Today's Classes</p>
            <div>
              {paginatedTodaysMeetings?.length > 0 ? (
                paginatedTodaysMeetings.map((meeting, index) => (
                  <div key={index} className="list-group-item card text-gray" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  }}>
                    <div className="box-body d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center" style={{ fontSize: ".9vw" }}>
                          <FontAwesomeIcon icon={faBookOpen} />
                        </div>
                        <div className="d-flex flex-column fw-500">
                          <p className="text-theme hover-primary mb-1 fs-16" style={{ fontSize: ".9vw" }}>{meeting?.topic}</p>
                          <p className="mb-0 " style={{fontSize: ".9vw", color:"black"}}>
                            <FontAwesomeIcon icon={faClock} /> {meeting?.startTime} - {meeting?.endTime}
                          </p>
                        </div>
                      </div>
                      <a href="#" onClick={() => handleMeeting(meeting?.meetingLink)}>
                        <FontAwesomeIcon icon={faPlay} />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "10px", color: "#666" }}>No meetings available for today</div>
              )}
              <Pagination
                count={Math.ceil(todaysMeetings?.length / itemsPerPage)}
                page={currentPageToday}
                onChange={handlePageChangeToday}
                color="primary"
                style={{ display: "flex", justifyContent: "center", padding: "10px" }}
              />
            </div>
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="col-md-4">
          <div className="mb-4" style={{ borderRadius: "10px", backgroundColor: "#fafbfd" }}>
            <p className="text-center p-2" style={{ fontSize: "20px" }}>Upcoming Classes</p>
            <div>
              {paginatedUpcomingMeetings?.length > 0 ? (
                paginatedUpcomingMeetings.map((meeting, index) => (
                  <div key={index} className="list-group-item card text-gray" style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  }}>
                    <div className="box-body d-flex align-items-center justify-content-between">
                      
                      <div className="d-flex align-items-center">
                        <div className="mr-15 w-45 h-30 line-height-3 color-fff bg-theme rounded text-center" style={{ fontSize: ".9vw" }}>
                      
                         
                          
                          <FontAwesomeIcon icon={faBookOpen} />
                        </div>
                        <div className="d-flex flex-column fw-500">
                          <p className="text-theme hover-primary mb-1 fs-16" style={{ fontSize: ".9vw" }}>{meeting?.topic}</p>
                          <p className="mb-0" style={{ fontSize: ".9vw",color:"black" }}>
                            <FontAwesomeIcon icon={faClock} /> {meeting?.startTime} - {meeting?.endTime}
                          </p>
                          <p className="mb-0 " style={{ fontSize: ".9vw",color:"black" }}>
                            <FontAwesomeIcon icon={faCalendar} /> {meeting?.startDate}
                          </p>
                        </div>
                      </div>
                      <a href="#" onClick={() => handleMeeting(meeting?.meetingLink)}>
                        <FontAwesomeIcon icon={faPlay} />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "10px", color: "#666" }}>No upcoming meetings available</div>
              )}
              <Pagination
                count={Math.ceil(upcomingMeetings?.length / itemsPerPage)}
                page={currentPageUpcoming}
                onChange={handlePageChangeUpcoming}
                color="primary"
                style={{ display: "flex", justifyContent: "center", padding: "10px" }}
              />
            </div>
          </div>
        </div>

      </div>

      {/*  **********************************************************************************  second row *************************************** */}
      {/* <div className='row ml-2'> */}
      <div className="col-lg-12 pb-2 border-bottom rounded-lg d-flex justify-content-between align-items-center mt-3" >
        <p style={{ fontFamily: "Roboto", fontWeight: "60px", fontSize: "30px" }}>Batch Dashboard</p>
      </div>
      {/* </div> */}

      <div className='row mt-4 ' style={{height:"25vw"}}>
        <div className='col-md-4  mb-3' style={{height:"25vw" }}>
          <div className=' h-100' style={{ boxShadow: "rgba(82, 63, 105, 0.05) 0px 0px 30px 1px", borderRadius: "10px", backgroundColor: "#fafbfd", width: "100%"}}>
            <p className='p-2' style={{ fontSize: ".9vw" }}>Number of Students</p>
            <Batch_wise_no_of_classes />
          </div>
        </div>

        <div className='col-md-4 mb-3' style={{height:"25vw" }}>
          <div className=' h-100' style={{ boxShadow: "rgba(82, 63, 105, 0.05) 0px 0px 30px 1px", borderRadius: "10px", backgroundColor: "#fafbfd", width: "100%"}}>
            {/* <p className='p-2' style={{ fontSize: "20px" }}>Attendance %</p> */}
            <Batch_wise_attendance_percentage />
          </div>
        </div>

        <div className='col-md-4 mb-3' style={{height:"25vw" }}>
          <div className='h-100' style={{ boxShadow: "rgba(82, 63, 105, 0.05) 0px 0px 30px 1px", borderRadius: "10px", backgroundColor: "#fafbfd", width: "100%" }}>
            {/* <p className='text-center p-2' style={{ fontSize: "20px" }}>Course Completed %</p> */}
            <Batch_Wise_Course_Percent />
          </div>
        </div>
      </div>




      <div className="row g-2 mt-4 mr-4 ml-0 mb-4">
        <div style={{ boxShadow: "rgba(82, 63, 105, 0.05) 0px 0px 30px 1px", borderRadius: "10px", backgroundColor: "#fafbfd", width: "100%", height: "100%" }} className='col-md-6'>
          <div className="rounded p-3">
            <p className='p-2' style={{ fontSize: ".9vw" }}>Assignment Tracker</p>
            <Assignment_tracker />
          </div>
        </div>
        <div style={{ boxShadow: "rgba(82, 63, 105, 0.05) 0px 0px 30px 1px", borderRadius: "10px", backgroundColor: "#fafbfd", width: "100%", height: "100%" }} className='col-md-6'>
          <div className="rounded p-3">
            <p className='p-2' style={{ fontSize: ".9vw" }}>Batch Assignment Status Tracker</p>
            <Batch_Assign_Track />
          </div>
        </div>
      </div>


    </div>
  );
};

export default Mentor_Overview;
