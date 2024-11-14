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
import { faIdBadge, faClipboardCheck, faBookOpen, faPlay, faClock, faMedal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




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
    const itemsPerPage = 2;


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

    // today's class 
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
        <div className='row  mentor-overview-main' style={{ backgroundColor: "white", fontFamily: "Roboto, sans-serif", marginTop:"-20px" }} >
            <div className='mt-4 px-2' style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))", gap: "10px", width: "100%", height: "310px" }}>
                {/* Today's Classes */}
                <div style={{  borderRadius: "10px", backgroundColor: "white" }}>
                    <p className="text-center p-2" style={{ fontSize: "20px" }}>Today's Classes</p>
                    <div style={{ backgroundColor: "white" }} >
                        {paginatedTodaysMeetings?.length > 0 ? (
                            paginatedTodaysMeetings.map((meeting, index) => (
                                <div key={index} className="list-group-item mb-10 card text-gray" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    // alignItems: 'center',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                }}>
                                    <div className="box-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                    <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                </div>
                                                <div className="d-flex flex-column fw-500">
                                                    <p className="text-theme hover-primary mb-1 fs-16">{meeting?.topic}</p>
                                                    <p className="mb-0 font-12">
                                                        <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                        <span>{meeting?.startTime} - {meeting?.endTime}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <a href="#" onClick={() => handleMeeting(meeting?.meetingLink)}>
                                                <span><FontAwesomeIcon icon={faPlay} /></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                            ))
                        ) : (
                            <div style={{ padding: '10px', color: '#666' }}>No meetings available for today</div>
                        )}
                        <Pagination
                            count={Math.ceil(todaysMeetings?.length / itemsPerPage)}
                            page={currentPageToday}
                            onChange={handlePageChangeToday}
                            color="primary"
                            style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
                        />
                    </div>
                </div>

                {/* Upcoming Classes */}
                <div style={{  borderRadius: "10px", backgroundColor: "white" }}>
                    <p className="text-center p-2" style={{ fontSize: "20px" }}>Upcoming Classes</p>
                    <div style={{ backgroundColor: "white" }}>
                        {paginatedUpcomingMeetings?.length > 0 ? (
                            paginatedUpcomingMeetings.map((meeting, index) => (
                                <div key={index} className="list-group-item mb-10 card text-gray" style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '10px',
                                    marginBottom: '10px',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                }}>
                                    <div className="box-body">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div className="mr-15 w-45 h-40 line-height-3 color-fff bg-theme rounded text-center">
                                                    <span><FontAwesomeIcon icon={faBookOpen} /></span>
                                                </div>
                                                <div className="d-flex flex-column fw-500">
                                                    <p className="text-theme hover-primary mb-1 fs-16">{meeting?.topic}</p>
                                                    <p className="mb-0 font-12">
                                                        <span className="text-fade mr-1"><FontAwesomeIcon icon={faClock} /></span>
                                                        <span>{meeting?.startTime} - {meeting?.endTime}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <a href="#" onClick={() => handleMeeting(meeting?.meetingLink)}>
                                                <span><FontAwesomeIcon icon={faPlay} /></span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ padding: '10px', color: '#666' }}>No upcoming meetings available</div>
                        )}
                        <Pagination
                            count={Math.ceil(upcomingMeetings?.length / itemsPerPage)}
                            page={currentPageUpcoming}
                            onChange={handlePageChangeUpcoming}
                            color="primary"
                            style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
                        />
                    </div>

                </div>
            </div>


            <div className='mt-4 px-2' style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(370px, 1fr))", gap: "10px", width: "100%" }}>
                <div style={{ boxShadow: "0px 0px 5px 1px rgba(128, 128, 128, 0.2)", borderRadius: "10px", backgroundColor: "white" }}>
                    <p className='text-center p-2' style={{ fontSize: "20px" }}>Batch-wise Number of Students</p>
                    <hr />
                    <Batch_wise_no_of_classes />
                </div>
                <div style={{ boxShadow: "0px 0px 5px 1px rgba(128, 128, 128, 0.2)", borderRadius: "10px", backgroundColor: "white" }}>
                    <p className='text-center p-2' style={{ fontSize: "20px" }}>Batch-wise Attendance %</p>
                    <hr />
                    <Batch_wise_attendance_percentage />
                </div>
                <div style={{ boxShadow: "0px 0px 5px 1px rgba(128, 128, 128, 0.2)", borderRadius: "10px", backgroundColor: "white" }}>
                    <p className='text-center p-2' style={{ fontSize: "20px" }}>Batch-wise Course Completed %</p>
                    <hr />
                    <Batch_Wise_Course_Percent />
                </div>
            </div>



            <div className='row mt-4 ml-2 mr-2 mb-4' style={{
                display: "grid",
                gridTemplateColumns: `repeat(auto-fill, minmax(${windowWidth < 768 ? '400px' : '490px'}, 1fr))`,
                gap: "10px",
                width: "100%",
            }}>
                <div style={{
                    boxShadow: "0px 0px 5px 1px rgba(128, 128, 128, 0.2)",
                    borderRadius: "10px",
                    backgroundColor: "white"
                }}>
                    <p className='text-center p-2' style={{ fontSize: "20px" }}>Assignment Tracker</p>
                    <hr />
                    <Assignment_tracker />
                </div>
                <div style={{
                    boxShadow: "0px 0px 5px 1px rgba(128, 128, 128, 0.2)",
                    borderRadius: "10px",
                    backgroundColor: "white"
                }}>
                    <p className='text-center p-2' style={{ fontSize: "20px" }}>Batch Assignment Status Tracker</p>
                    <hr />
                    <Batch_Assign_Track />
                </div>
            </div>


            {/* </div> */}


        </div>
    );
};

export default Mentor_Overview;