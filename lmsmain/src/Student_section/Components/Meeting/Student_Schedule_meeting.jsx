import React, { useCallback, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import 'moment-timezone';
import { Calendar } from 'react-big-calendar';
import '../../../assets/css/Meeting/Schedule.css';
import dayjs from 'dayjs';
import { useState } from 'react';
// import Custom_Dlt_Menu from '../../../Mentor_section/components/Meeting/Mentor_Custom_Dlt_Menu';
import Student_Custom_Dlt_Menu from './Student_Custom_Dlt_Menu';
import Student_Join_meeting from './Student_Join_meeting';
import { cleanDigitSectionValue } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
const localizer = momentLocalizer(moment);

function Student_Schedule_meeting({ meeting, setMeeting, holidaylist,setRecallGetcall,handleMeetingListView,userEmail  }) {
    const [showJoinMeet, setShowJoinMeet] = useState(false);
    const handleCloseJoinMeet = () => setShowJoinMeet(false);
    const handleShowJoinMeet = () => setShowJoinMeet(true);
    const [firstName,setFirstName] = useState();
    const [lastName,setlastName] = useState();
    const[userID,setUserID] = useState();

    const holidays = [
        new Date(2024, 0, 1), // January 1, 2024
        new Date(2024, 5, 26), // July 4, 2024
    ];

    useEffect(()=>{
        setFirstName(localStorage.getItem('firstName'))
        setlastName(localStorage.getItem('lastName'))
        setUserID(localStorage.getItem('id'))
    },[])

    const holidayGetter = useCallback(
        (date) => {
            const isInHoliday = holidaylist.find(holiday =>
                moment(date).isSame(holiday.start, 'day')
            );

            const props = {
                ...(isInHoliday && {
                    style: {
                        backgroundColor: 'gray',
                        color: 'white',
                        cursor: 'pointer',
                    },
                    disabled: true,
                    className: isInHoliday ? 'holiday-cell' : '',
                    children: <div>{isInHoliday?.name}</div>,
                }),
            };

            return props;
        },
        [holidaylist]
    );

    const handleEventSelection = (e) => {
        console.log(e, "Event data");
    };

    const events = meeting;

    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedEvent, setSelectedEvent] = useState(null);

    const cancelMeeting = (title) => {
        const updatedEvents = events.filter((event) => event.title !== title);
        setMeeting(updatedEvents);
    };

    const handleContextMenu = (event, e) => {
        e.preventDefault();
        console.log(event);
        setSelectedEvent(event);
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
    };

    const handleDelete = () => {
        if (selectedEvent) {
            cancelMeeting(selectedEvent.title);
            setSelectedEvent(null);
            setContextMenuPosition({ x: 0, y: 0 });
        }
    };

    const handleCloseMenu = () => {
        setContextMenuPosition({ x: 0, y: 0 });
    };

    function AgendaEvent({ event }) {
        console.log(event)
        const currentTime = dayjs();
        const eventStartTime = dayjs(event.start);
        const eventEndTime = dayjs(event.end);

        const [showJoinMeet, setShowJoinMeet] = useState(false);

        const handleCloseJoinMeet = () => setShowJoinMeet(false);
        const handleShowJoinMeet = () => setShowJoinMeet(true);

        const [meetinfo, setmeetinfo] = useState({  meetlink: '', id: '', firstName: '',lastName: '',userID:''});
        const handleJoin = (meetlink, id, password) => {
            console.log(meetlink);
            console.log('id', id);
            console.log('password', password);
            handleShowJoinMeet()
        }

        // Check if the event has ended
        const isPastMeeting = eventEndTime.isBefore(currentTime);

        // Check if the event is running late
        const isRunningLate = currentTime.isAfter(eventEndTime);
        setSelectedEvent(event)
        if (!event.isHoliday) {
            return (
                <>
                    <div className='event-container'>
                        {/* <div>{moment(event.start).format('MMMM Do YYYY')}</div> */}
                        <strong>{event.title}</strong>
                        <button type='button' className='btn btn-success' onClick={() => {
                            handleJoin(event.meetingLink, event.meeting_id, event.meeting_password,firstName,lastName)
                            console.log('event.meeting_id', event)
                            console.log('event.meeting_password', event.meeting_password);
                            setmeetinfo({ meetlink: event.meetingLink, id: event.id, firstName: firstName,lastName: lastName,userID:userID})
                        }}>Join</button>
                        <Student_Join_meeting showJoinMeet={showJoinMeet} handleCloseJoinMeet={handleCloseJoinMeet} meetinfo={meetinfo} />
                    </div>
                </>
            )
        } else {
            return null;
        }
    }

    const CustomAgendaDate = ({ event, label }) => {
        console.log(event)
        console.log(label)
        return <span>{label}</span>
    };

    const CustomAgendaTime = ({ event }) => {
        console.log(event)
        if (event && !event.isHoliday) {
            return <span>{moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}</span>;
        }
    };

    const customComponents = {
        agenda: {
            event: AgendaEvent,
            date: (props) => <CustomAgendaDate event={props.event} label={props.label} />,
            time: (props) => <CustomAgendaTime event={props.event} />,
        },
    };

    const [view, setView] = useState('month');

    const eventStyleGetter = (event) => {
        const backgroundColor =
            view === 'month'
                ? event.isHoliday
                    ? 'lightcoral' // Holiday color in month view
                    :  getColorCode(event.start, event.end) // Regular event color in month view 'rgb(125, 11, 148)'
                : ''; // Default color for other views

        return {
            style: {
                backgroundColor,
            },
        };
    };

    function getColorCode(startDateTime, endDateTime) {
        // Convert the input strings to Date objects
        const start = new Date(startDateTime);
        const end = new Date(endDateTime);
        const now = new Date(); // Current date and time
      
        // Check if the current time is before the start time, within the range, or after the end time
        if (now < start) {
          return 'blue'; // Upcoming
        } else if (now >= start && now <= end) {
          return 'green'; // Running
        } else {
          return 'gray'; // Over
        }
      }

    // Updated filteredEvents to exclude holidays in agenda view
    const filteredEvents = (events, view) => {
        if (view === 'month') {
            return events; // Show all events in month view
        }
        // Filter out holiday events in other views, including agenda
        return events.filter(event => !event.isHoliday);
    };

    const handleViewChange = (newView) => {
        setView(newView); // Update the current view
    };

    const [meetingsForDay, setMeetingsForDay] = useState([]);

    const [selectedDate, setSelectedDate] = useState(null);



    const handleDayClick = (date) => {

        // Normalize to start of the day (00:00:00) and end of the day (23:59:59.999)

        const selectedDayStart = new Date(date);

        selectedDayStart.setHours(0, 0, 0, 0); // Set to start of the day



        const selectedDayEnd = new Date(date);

        selectedDayEnd.setHours(23, 59, 59, 999); // Set to end of the day



        // Filter events to only include those that fall within the clicked date's range

        const filteredMeetings = events.filter(event => {

            const eventStart = new Date(event.start).getTime();

            return eventStart >= selectedDayStart.getTime() && eventStart <= selectedDayEnd.getTime();

        });



        // Update state with filtered meetings for that day

        setMeetingsForDay(filteredMeetings);

        console.log("meetingsForDay", filteredMeetings);



        setSelectedDate(date); // Store the clicked date for display

        console.log("selectedDate", selectedDate);

        

    };



    // Custom click handler for the rbc-day-bg div

    const dayCellClick = (e) => {

        const date = new Date(e.target.dataset.date);

        handleDayClick(date);

    };



    useEffect(() => {

        // Attach click event listener to each rbc-day-bg cell after render

        const dayCells = document.querySelectorAll('.rbc-day-bg');

        dayCells.forEach((cell) => {

            cell.addEventListener('click', dayCellClick);

        });



        // Cleanup event listeners when the component is unmounted

        return () => {

            dayCells.forEach((cell) => {

                cell.removeEventListener('click', dayCellClick);

            });

        };

    }, [events]);



    const formatDate = (date) => {

        return new Date(date).toLocaleDateString('en-US', {

            weekday: 'short',  // 'Fri'

            year: 'numeric',   // '2024'

            month: 'short',     // 'Nov'

            day: '2-digit'      // '01'

        });

    };



    const formatTime = (date) => {

        return new Date(date).toLocaleTimeString('en-US', {

            hour: '2-digit',   // '10'

            minute: '2-digit', // '00'

            hour12: true        // 'AM/PM'

        });

    };



    const getTimeSpan = (start, end) => {

        const startDate = new Date(start);

        const endDate = new Date(end);



        const hours = endDate.getHours() - startDate.getHours();

        const minutes = endDate.getMinutes() - startDate.getMinutes();

        

        return `${hours} hr ${minutes} min`;

    };


    return (
        <>
            {console.log('re-render events', events)}
            {console.log('re-render meetings', meeting)}
            <div className='col-lg-9 col-md-12 col-sm-12 bg-white'>
                <Calendar
                    localizer={localizer}
                    events={filteredEvents(events, view)} // Pass current view to filter events
                    eventPropGetter={eventStyleGetter}
                    onView={handleViewChange}
                    startAccessor="start"
                    endAccessor="end"
                    // style={{ height: '80vw' }}
                    step={10}
                    timeslots={6}
                    components={customComponents}
                    // dayPropGetter={holidayGetter}
                    onSelectSlot={(slotInfo) => handleDayClick(slotInfo.start)}
                    onSelectEvent={(event, e) => {
                        console.log(e)
                        if (e.target.tagName.toLowerCase() === 'button') {
                            console.log(e)
                            return; // Prevent further handling if it's a link click
                        } else {
                            handleContextMenu(event, e)
                        }
                    }}
                    views={['month', 'week', 'day']}

                    selectable
                />

                <Student_Custom_Dlt_Menu
                    contextMenuPosition={contextMenuPosition}
                    // handleDelete={handleDelete}
                    handleCloseMenu={handleCloseMenu}
                    selectedEvent={selectedEvent}
                    firstName={firstName} 
                    lastName={lastName}
                    userID={userID}
                />

            </div>
            <div className="col-lg-3 bordered pr-0  d-xs-none">

                <div className="height-555 overflow-auto">

                    <h6 className='mt-1'>{selectedDate ? formatDate(selectedDate) : '' }</h6>

                    {meetingsForDay.length === 0 ? (

                        <>

                            <div className='d-flex align-center justify-content-center'>

                                <span className='font-40'><FontAwesomeIcon icon={faCalendarDays} /></span>

                                <span className='ml-2'>No Meeting Scheduled</span>

                            </div>

                        </>

                    ) : 

                    meetingsForDay.map((meeting, index) => (

                        <div class="card left-double-border mt-1">

                            <div class="row py-2">

                                <div className="col-lg-4 pr-0 d-flex flex-column font-11 justify-content-center align-center">

                                    <span className="py-2 pl-1 text-center">

                                            {formatTime(meeting.start)} 

                                        </span>

                                    <span className="py-1 text-center">{getTimeSpan(meeting.start, meeting.end)}</span>

                                </div>

                                <div className="col-lg-8 pr-0 py-2 font-13">

                                    <p>{meeting.title}</p>

                                </div>

                            </div>

                        </div>

                        ))

                    }

                </div>

            </div>
        </>
    );
}

export default Student_Schedule_meeting;
