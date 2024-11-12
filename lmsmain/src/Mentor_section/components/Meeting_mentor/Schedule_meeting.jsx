import React, { useCallback, useEffect } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import 'moment-timezone';
import { Calendar } from 'react-big-calendar';
import '../../assets/css/Meeting/Schedule.css';
import dayjs from 'dayjs';
import { useState } from 'react';
import Custom_Dlt_Menu from '../Meeting/Custom_Dlt_Menu';
import Join_meeting from './Join_meeting';
import { cleanDigitSectionValue } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';

const localizer = momentLocalizer(moment);

function Schedule_meeting({ meeting, setMeeting, holidaylist }) {
    const [showJoinMeet, setShowJoinMeet] = useState(false);
    const handleCloseJoinMeet = () => setShowJoinMeet(false);
    const handleShowJoinMeet = () => setShowJoinMeet(true);
    const [firstName,setFirstName] = useState();
    const [lastName,setlastName] = useState();
    const[userID,setUserID] = useState();

    // for getting from localstorage
    useEffect(()=>{
        setFirstName(localStorage.getItem('firstName'))
        setlastName(localStorage.getItem('lastName'))
        setUserID(localStorage.getItem('id'))
    },[])


    const holidays = [
        new Date(2024, 0, 1), // January 1, 2024
        new Date(2024, 5, 26), // July 4, 2024
    ];

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
            // console.log('password', password);
            handleShowJoinMeet()
        }

        // Check if the event has ended
        const isPastMeeting = eventEndTime.isBefore(currentTime);

        // Check if the event is running late
        const isRunningLate = currentTime.isAfter(eventEndTime);

        if (!event.isHoliday) {
            return (
                <>
                    <div className='event-container'>
                        {/* <div>{moment(event.start).format('MMMM Do YYYY')}</div> */}
                        <strong>{event.title}</strong>
                        <button type='button' className='btn btn-success' onClick={() => {
                            handleJoin(event.meetingLink, event.meeting_id,firstName,lastName,userID)
                            console.log('event.meeting_id', event)
                            console.log('event.meeting_password', event.meeting_password);
                            setmeetinfo({ meetlink: event.meetingLink, id: event.id, firstName: firstName,lastName: lastName,userID:userID})
                        }}>Join</button>
                        <Join_meeting showJoinMeet={showJoinMeet} handleCloseJoinMeet={handleCloseJoinMeet} meetinfo={meetinfo} />
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
                    : 'rgb(125, 11, 148)' // Regular event color in month view
                : ''; // Default color for other views

        return {
            style: {
                backgroundColor,
            },
        };
    };

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

    return (
        <>
            {console.log('re-render events', events)}
            {console.log('re-render meetings', meeting)}
            <div>
                <Calendar
                    localizer={localizer}
                    events={filteredEvents(events, view)} // Pass current view to filter events
                    eventPropGetter={eventStyleGetter}
                    onView={handleViewChange}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '80vw' }}
                    step={10}
                    timeslots={6}
                    components={customComponents}
                    // dayPropGetter={holidayGetter}
                    onSelectEvent={(event, e) => {
                        console.log(e)
                        if (e.target.tagName.toLowerCase() === 'button') {
                            console.log(e)
                            return; // Prevent further handling if it's a link click
                        } else {
                            handleContextMenu(event, e)
                        }
                    }}
                />

                <Custom_Dlt_Menu
                    contextMenuPosition={contextMenuPosition}
                    handleDelete={handleDelete}
                    handleCloseMenu={handleCloseMenu}
                />

            </div>
        </>
    );
}

export default Schedule_meeting;
