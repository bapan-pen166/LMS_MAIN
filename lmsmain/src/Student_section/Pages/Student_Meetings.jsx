import React from "react";
import axios from "axios";

// selector
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect, useRef, useCallback } from "react";
import { Chip, TextField, Stack } from '@mui/material';
import { Popover, List, ListItem } from '@mui/material';
import { Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

// Time 
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import '../../assets/css/Meeting/Meeting.css'

// modal 
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// meterial ui 

// components 
import Student_Schedule_meeting from "../Components/Meeting/Student_Schedule_meeting";
import Time_picker from "../../components/Meeting/Time_picker";
import Student_Text_Input from "../Components/Meeting/Student_Text_Input";
import Student_Meeting_dropdown from "../Components/Meeting/Student_Meeting_dropdown";
import Student_ResponsiveTimePickers from "../Components/Meeting/Student_Time_Picker_new";
import Student_Time_Picker_end from '../Components/Meeting/Student_Time_Picker_end';
import Student_Individual_nm from '../Components/Meeting/Student_Individual_nm';
import Student_Reschedule_meet_selector from "../Components/Meeting/Student_Reschedule_meet_selector";
import Student_Time_picker_reschedule_from from "../Components/Meeting/Student_Time_picker_reschedule_from";
import Mentor_Time_picker_reschedule_To from "../../Mentor_section/components/Meeting/Mentor_Time_picker_reschedule_To";
import Mentor_Meeting_reschedule_dropdown from "../../Mentor_section/components/Meeting/Meeting_reschedule_dropdown";
import Mentor_ScheduleEmChip from "../../Mentor_section/components/Meeting/Mentor_ScheduleEmChip";
import Mentor_Monthlymeetschedule from "../../Mentor_section/components/Meeting/Mentor_Monthlymeetschedule";
import { api, api_meet } from "../../ApiUrl/ApiUrl";


const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function Student_Meetings() {
  const [studentName, setStudentName] = useState([]);
  const [schedule, setSchedule] = useState('');
  const [valueFrom, setValueFrom] = useState(dayjs('2022-04-17T15:30'));
  const [valueTo, setValueTo] = useState(dayjs('2022-04-17T16:30'));
  const [batchList, setBatchList] = useState([]);

  const [selectedBatch, setSelectedBatches] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudents] = useState([]);

  // Meeting modal states 
  const [showMeeting, setShowMeeting] = useState(false);
  const handleCloseMeeting = () => setShowMeeting(false);
  const handleShowMeeting = () => setShowMeeting(true);
  // Meeting reschedule modal states 
  const [showMeetReschedule, setShowMeetingReschedule] = useState(false);
  const handleCloseMeetingReschedule = () => setShowMeetingReschedule(false);
  const handleShowMeetingReschedule = () => setShowMeetingReschedule(true);
  const [selectmeeting, setSelectmeeting] = useState([]);
  // Meeting invite states
  const [individualEm, setIndividualEm] = useState([]);
  const [meetparticipate, setMeetparticipate] = useState('');
  const [meetparticipate2show, setMeetparticipate2show] = useState(false);
  const [meetparticipate2, setMeetparticipate2] = useState('');
  const [meetparticipate3show, setMeetparticipate3show] = useState(false);
  const [meetparticipate3, setMeetparticipate3] = useState('');
  const [meetparticipate4show, setMeetparticipate4show] = useState('');

  const [meetDayPattern, setMeetDayPattern] = useState([]);
  // monthly schedule meeting modal 
  const [openmonthly, setOpenmonthly] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('1');
  const [selectedFrequency, setSelectedFrequency] = useState('monthly');
  // Custom weekday meeting schedule

  const [selectedWeekDays, setSelectedWeekDays] = useState([]);
  const [WeekDaysopen, setWeekDaysOpen] = useState(false);
  const [targetdayno, setTargetDayNo] = useState([]);


  // for getting mail id and name from the local storage
  const [mailIDFromLoacalStorage,setMailIDFromLoacalStorage] = useState();
  const [firstNameFromLoacalStorage,setFirstNameFromLoacalStorage] = useState();
  const [lastNameFromLoacalStorage,setlastNameFromLoacalStorage] = useState();

  const [getStudentMailFromLocalStorage,setGetStudentMailFromLocalStorage] = useState();
  

  // Apply leave
  const [showApplyLeave, setShowApplyLeave] = useState(false);
  const handleShowApplyLeave = () => setShowApplyLeave(true);

  const handleWeekDaysOpen = () => {
    setWeekDaysOpen(true);
  };

  const handleWeekDaysClose = () => {
    setWeekDaysOpen(false);
  };

  const handleNumberChange = useCallback((event) => {
    setSelectedNumber(event.target.value);
  }, []);

  const handleFrequencyChange = useCallback((event) => {
    setSelectedFrequency(event.target.value);
  }, []);
  const handleOpenMonthly = () => {
    setOpenmonthly(true);
  };

  const handleCloseMonthly = () => {
    setOpenmonthly(false);
  };
  useEffect(() => {
    if (meetDayPattern == 'Monthly') {
      handleOpenMonthly();
    }
    if (meetDayPattern == 'CustomDay') {
      handleWeekDaysOpen();
    }
  }, [meetDayPattern])
  useEffect(() => {
    const updatedTargetDayNo = selectedWeekDays.map(data => data.DayNo);
    setTargetDayNo(updatedTargetDayNo)
   
  }, [selectedWeekDays])


  // Meeting array 
  const [meeting, setMeeting] = useState([
    {
      title: 'Meeting1',
      start: new Date(2024, 6, 18, 11, 0),
      end: new Date(2024, 6, 18, 12, 0),
      meetingLink: 'https://www.google.com',
      isHoliday: false
    },
    {
      title: 'Meeting2',
      start: new Date(2024, 6, 21, 9, 0),
      end: new Date(2024, 6, 21, 10, 0),
      meetingLink: 'https://www.google.com',
      isHoliday: false
    },
    {
      title: 'Meeting3',
      start: new Date(2024, 6, 25, 7, 0),
      end: new Date(2024, 6, 25, 8, 0),
      meetingLink: 'https://www.google.com',
      isHoliday: false
    },
    {
      title: 'Conference',
      start: new Date(2024, 6, 30, 11, 0),
      end: new Date(2024, 6, 30, 13, 0),
      meetingLink: 'https://www.google.com',
      isHoliday: false
    },

    { title: 'independence day', start: new Date(2024, 6, 1), end: new Date(2024, 6, 1), isHoliday: true }
  ]);
  const meetNmRef = useRef('');
  const meetDateRef = useRef('');
  const meetDateEndRef = useRef('');
  const meetDateFromRef = useRef('');
  const meetDateToRef = useRef('');
  const [selectedTime, setSelectedTime] = useState('');
  const meetPersonnmRef = useRef('');
  const [rescheduleTimeFrom, setRescheduleTimeFrom] = useState();
  const [rescheduleTimeTo, setRescheduleTimeTo] = useState();
  const [rescheduledateTrigger, setRescheduleDateTrigger] = useState(false);
  const [reScheduleMeeting, setReScheduleMeeting] = useState({})


  const [applyLeave,setApplyLeave] = useState({
       startDate :"",
       endDate :"",
       leaveType :"",
       reasonForLeave :"",
       mail : mailIDFromLoacalStorage,
       firstName : firstNameFromLoacalStorage,
       lastName : lastNameFromLoacalStorage
  })


  const handleMeetingdata = (start_datetime, end_datetime, timefromnew, timeTonew, meet_nm) => {
    console.log('handel meeting clicked');
    console.log('start_datetime', start_datetime);
    console.log('end_datetime', end_datetime);
    console.log('timefromnew', timefromnew);
    console.log('timeTonew', timeTonew);
    console.log('meet_nm', meet_nm);
    //    console.log(email);
    axios.post(`${api}/video-call/create-meeting`, {
      start_date: start_datetime,
      end_date: end_datetime,
      start_time: timefromnew,
      end_time: timeTonew,
      subject: meet_nm,


    })
      .then((Response) => {
        console.log(Response.data);
        const meet = Response.data;
        const meet_nm = meet.title;
        const datenew = meet.start.split('-');
        const timefromnew = convertTo24Hour(meet.start_time);
        const timeTonew = convertTo24Hour(meet.end_time);
        setMeeting([...meeting, {
          title: meet_nm,
          start: new Date(parseInt(datenew[0]), parseInt(datenew[1]) - 1, parseInt(datenew[2]), timefromnew[0], timefromnew[1]),
          end: new Date(parseInt(datenew[0]), parseInt(datenew[1]) - 1, parseInt(datenew[2]), timeTonew[0], timeTonew[1]),
          meetingLink: meet.meetingLink,
          id: meet.meeting_id,
          password: meet.meeting_password
        }])
        //  setMeeting([...meeting,Response.data.meeting_created]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const handlemeeting = () => {
    console.log(meetNmRef.current.value);
    console.log(meetDateRef.current.value);
    console.log(meetDateFromRef.current);
    // console.log('meetDateFromRef.current',meetDateFromRef.current)
    console.log(meetDateToRef.current);
    // console.log(meetDateEndRef.current.value);
    const meet_nm = meetNmRef.current.value;
    const date = meetDateRef.current.value;
    // const datenew=date.replaceAll("-",",").map(Number);
    const datenew = date.split('-');
    // const date2=meetDateEndRef.current.value;
    // const dateend=date2.split('-');
    const timeFrom = meetDateFromRef.current;
    // const timeFrom=selectedTime.target.inner.innerText;
    const timeTo = meetDateToRef.current;
    const timefromnew = convertTo24Hour(timeFrom)
    const timeTonew = convertTo24Hour(timeTo)
    console.log('datenew', datenew);
    console.log('timefromnew', timefromnew);
    console.log('timeTonew', timeTonew);
    console.log('datenew', datenew);
    console.log('new date')
    if (schedule != 1) {
      // handleMeetingdata(date,date,timeFrom,timeTo,meet_nm)
      handleMeetingdata(date, date, timeFrom, timeTo, meet_nm)
      // handleMeetingdata(new Date(parseInt(datenew[0]),parseInt(datenew[1])-1,parseInt(datenew[2]) ,timefromnew[0],timefromnew[1]),new Date(parseInt(datenew[0]),parseInt(datenew[1])-1,parseInt(datenew[2]) ,timeTonew[0],timeTonew[1]),meet_nm)
      //  setMeeting([...meeting,{title:meet_nm,start:new Date(parseInt(datenew[0]),parseInt(datenew[1])-1,parseInt(datenew[2]) ,timefromnew[0],timefromnew[1]),end:new Date(parseInt(datenew[0]),parseInt(datenew[1])-1,parseInt(datenew[2]) ,timeTonew[0],timeTonew[1])}])
    }
    else {
      const date2 = meetDateEndRef.current.value;
      // const dateend=date2.split('-');
      if (meetDayPattern == 'Regular') {
        var alldates = getDates(date, date2)
      }
      else if (meetDayPattern == 'WeekOff') {
        console.log('alldates');
        var alldates = filterDatesInWeekOff(date, date2)
      }
      else if (meetDayPattern == 'Monthly') {
        console.log('alldates');
        var alldates = generateMonthlyDates(date, date2, selectedNumber, selectedFrequency)
        setMeetDayPattern('')
      }
      else if (meetDayPattern == 'CustomDay') {
        console.log('targetdayno', targetdayno)
        var alldates = filterCustomWeekdays(date, date2, targetdayno)
        setSelectedWeekDays([])
      }


      console.log(alldates)
      //  alldates.map((date)=>{
      //  let querydate=date.split('-');
      //  console.log(querydate)
      //  setMeeting([...meeting,{title:meet_nm,start:new Date(parseInt(querydate[0]),parseInt(querydate[1])-1,parseInt(querydate[2]) ,timefromnew[0],timefromnew[1]),end:new Date(parseInt(querydate[0]),parseInt(querydate[1])-1,parseInt(querydate[2]) ,timeTonew[0],timeTonew[1])}])
      //  })
      alldates.forEach((date) => {
        let querydate = date.split('-');
        let newMeeting = {
          title: meet_nm,
          start: new Date(parseInt(querydate[0]), parseInt(querydate[1]) - 1, parseInt(querydate[2]), timefromnew[0], timefromnew[1]),
          end: new Date(parseInt(querydate[0]), parseInt(querydate[1]) - 1, parseInt(querydate[2]), timeTonew[0], timeTonew[1])
        };
        setMeeting(prevMeetings => [...prevMeetings, newMeeting]);

      });
      // setMeeting([...meeting,{title:meet_nm,start:new Date(parseInt(datenew[0]),parseInt(datenew[1])-1,parseInt(datenew[2]) ,timefromnew[0],timefromnew[1]),end:new Date(parseInt(dateend[0]),parseInt(dateend[1])-1,parseInt(dateend[2]) ,timeTonew[0],timeTonew[1])}])
    }

  }
  function convertTo24Hour(time12h) {
    // Split the time string into hours and minutes
    const [time, period] = time12h.split(' ');
    const [hours, minutes] = time.split(':');

    // Convert hours to 24-hour format
    let hours24 = parseInt(hours, 10);
    if (period === 'PM' && hours24 < 12) {
      hours24 += 12;
    } else if (period === 'AM' && hours24 === 12) {
      hours24 = 0;
    }

    // Format hours and minutes to add leading zeros if necessary
    const hours24Str = String(hours24).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');

    // Return the time in 24-hour format
    // return `${hours24Str},${minutesStr}`;
    return [hours24Str, minutesStr]
  }
  function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    const finalDate = new Date(endDate);
    while (currentDate <= finalDate) {
      // dates.push(new Date(currentDate));
      // currentDate.setDate(currentDate.getDate() + 1);
      dates.push(formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  function filterDatesInWeekOff(startDate, endDate) {
    // Initialize an array to store valid dates
    const validDates = [];
    let currentDate = new Date(startDate);
    const finalDate = new Date(endDate);
    // Iterate through the range of dates
    for (let date = new Date(currentDate); date <= finalDate; date.setDate(date.getDate() + 1)) {
      // Check if the current date is not a weekend (Saturday or Sunday)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        // If it's not a weekend, add it to the validDates array
        // validDates.push(new Date(date));
        const dateString = date.toISOString().split('T')[0];
        validDates.push(dateString);
      }
    }

    return validDates;
  }

  const generateMonthlyDates = (startDate, endDate, selectedNumber, selectedFrequency) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const generated = [];

    let current = new Date(start);

    // Loop through each month or week within the date range
    while (current <= end) {
      const date = new Date(current);

      // Adjust the date to the selected day within the month or week
      if (selectedFrequency === 'monthly') {
        date.setDate(selectedNumber);
      } else {
        const dayOfWeek = selectedNumber % 7;
        const diff = dayOfWeek - date.getDay();
        date.setDate(date.getDate() + (diff >= 0 ? diff : 7 + diff));
      }

      // Check if the adjusted date is within the range
      if (date >= start && date <= end) {
        generated.push(date.toISOString().slice(0, 10));
      }

      // Move to the next month or week
      if (selectedFrequency === 'monthly') {
        current.setMonth(current.getMonth() + 1);
      } else {
        current.setDate(current.getDate() + 7);
      }
    }

    return generated;
  };

  

  function filterCustomWeekdays(start, end, targetWeekdays) {
    // Initialize an array to store valid weekdays
    const validWeekdays = [];
    console.log(start, end)
    // Iterate through the range of dates
    const startDate = new Date(start);
    const endDate = new Date(end);

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      // Check if the current date's weekday is one of the target weekdays
      const weekday = date.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
      if (targetWeekdays.includes(weekday)) {
        // If it's one of the target weekdays, add it to the validWeekdays array
        validWeekdays.push(date.toISOString().slice(0, 10)); // Format as 'YYYY-MM-DD'
      }
    }
    console.log(validWeekdays)
    return validWeekdays;
  }


  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStudentName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  async function handleBatchlist() {

    try {
      const batch_all = await axios.get(
        `${api}/reg/getBatchList`
      );
      console.log(batch_all.data);
      setBatchList(batch_all.data.batchList);
    } catch (error) {
      console.log(error);
    }
  }

  const handleStudentList = (e) => {
    console.log('submit click');

    // e.preventDefault();

    axios.post(`${api}/student/getStudentList`, { course: [], status: [] })
      .then((Response) => {
        console.log(Response.data);
        setStudentList(Response.data.result);



      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    if (meetparticipate == 'Batch') {
      handleBatchlist();
    }
    else if (meetparticipate == 'Student') {
      handleStudentList();
    }
  }, [meetparticipate])

  useEffect(() => {
    if (meetparticipate2 == 'Batch') {
      handleBatchlist();
    }
    else if (meetparticipate2 == 'Student') {
      handleStudentList();
    }
  }, [meetparticipate2])

  const handleBatchChange = (event) => {
    setSelectedBatches(event.target.value);
  }
  const handleStudentselect = (event) => {
    setSelectedStudents(event.target.value);
  }

  const handlemeetingReschedule = () => {
    const meet_nm = selectmeeting.title;
    const date = meetDateRef.current.value;
    // const datenew=date.replaceAll("-",",").map(Number);
    const datenew = date.split('-');
    // const date2=meetDateEndRef.current.value;
    // const dateend=date2.split('-');
    const timeFrom = meetDateFromRef.current;
    // const timeFrom=selectedTime.target.inner.innerText;
    const timeTo = meetDateToRef.current;
    const timefromnew = convertTo24Hour(timeFrom)
    const timeTonew = convertTo24Hour(timeTo)
    console.log('datenew', datenew);
    console.log('timefromnew', timefromnew);
    console.log('timeTonew', timeTonew);
    console.log('datenew', datenew);
    console.log('new date')
    if (schedule != 1) {
      setReScheduleMeeting({ title: meet_nm, start: new Date(parseInt(datenew[0]), parseInt(datenew[1]) - 1, parseInt(datenew[2]), timefromnew[0], timefromnew[1]), end: new Date(parseInt(datenew[0]), parseInt(datenew[1]) - 1, parseInt(datenew[2]), timeTonew[0], timeTonew[1]) })
    }
    else {
      const date2 = meetDateEndRef.current.value;
      const dateend = date2.split('-');
      const alldates = getDates(date, date2)
      console.log(alldates)

      alldates.forEach((date) => {
        let querydate = date.split('-');
        let newMeeting = {
          title: meet_nm,
          start: new Date(parseInt(querydate[0]), parseInt(querydate[1]) - 1, parseInt(querydate[2]), timefromnew[0], timefromnew[1]),
          end: new Date(parseInt(querydate[0]), parseInt(querydate[1]) - 1, parseInt(querydate[2]), timeTonew[0], timeTonew[1])
        };
        setReScheduleMeeting({ newMeeting });
      });
    }

  }
  useEffect(() => {
    if (reScheduleMeeting) {
      replaceItem(reScheduleMeeting.title, reScheduleMeeting)
    }
  }, [reScheduleMeeting])

  const replaceItem = (title, newItem) => {
    // Find the index of the object with the specified id
    console.log(title)
    console.log(newItem)
    const index = meeting.findIndex(item => item.title == title);

    if (index !== -1) {
      // Create a new array with the object replaced
      const newItems = [...meeting];
      newItems[index] = newItem;

      // Set the state with the new array
      setMeeting(newItems);
    } else {
      console.log(`Item with id ${title} not found`);
    }
  };


  useEffect(() => {
    if (selectmeeting && meetDateRef.current) {
      const FromDateTime = formatDateAndTime(selectmeeting.start);
      console.log(FromDateTime.date)
      meetDateRef.current.value = DateTimeToString(FromDateTime.date);
      console.log(FromDateTime.time)
      setRescheduleTimeFrom(FromDateTime.time);
      const ToDateTime = formatDateAndTime(selectmeeting.end);
      console.log(ToDateTime.date);
      console.log(ToDateTime.time);
      meetDateEndRef.current.value = DateTimeToString(ToDateTime.date)
      setRescheduleTimeTo(ToDateTime.time);
      
    }
  }, [selectmeeting])

  function DateTimeToString(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const formattedDate = dateTime.toISOString().split('T')[0];
    return formattedDate;
  }

  function formatDateAndTime(dateString) {
    const dateObj = new Date(dateString);

    // Format Date: yyyy-mm-dd
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Format Time: hh:mm AM/PM
    const hours = String(dateObj.getHours() % 12 || 12).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const amOrPm = dateObj.getHours() < 12 ? 'AM' : 'PM';
    const formattedTime = `${hours}:${minutes} ${amOrPm}`;

    return { date: formattedDate, time: formattedTime };
  }

  // Holyday schedule

  const [showHolyday, setShowHolyday] = useState(false);
  const handleCloseHolyday = () => setShowHolyday(false);
  const handleShowHolyday = () => setShowHolyday(true);
  // const [holiday,setholiday]=useState([]);
  const [holidayStr, setholidayStr] = useState([]);
  const [newHolidayObj, setnewHolidayObj] = useState([]);
  const holidayRef = useRef();
  const holidaynm = useRef();

  const [holidaylist, setHolidaylist] = useState([
    { title: 'independence day', start: new Date(2024, 6, 1), end: new Date(2024, 6, 1), isHoliday: true }, // January 1, 2024
    { title: 'durga puja', start: new Date(2024, 6, 26), end: new Date(2024, 6, 26), isHoliday: true }// June 26, 2024
  ]);
  // const [selectedDates, setSelectedDates] = useState([]);

  const handleHolidayChange = () => {
    const newHoliday = holidayRef.current.value;
  
    setholidayStr([...holidayStr, newHoliday]) //1st chng
    setholidayStr([...holidayStr, { title: holidaynm.current.value, Date: newHoliday }])
    holidaynm.current.value = '';
    holidayRef.current.value = '';
  };

  const handleHolidayDelete = (chipToDelete) => () => {
    setholidayStr((holidayStr) => holidayStr.filter((chip) => chip.title !== chipToDelete)); //2nd
  };

  //  const [holidaynm,setHolidaynm]=useState('');
  const handleHoliday = () => {
    const newHolidayList = holidayStr.map(val => {
      console.log(val);
      let holiday = val.Date.split('-');
      return { title: val.title, start: new Date(holiday[0], parseInt(holiday[1]) - 1, holiday[2]), end: new Date(holiday[0], parseInt(holiday[1]) - 1, holiday[2]), isHoliday: true }
      // return new Date(holiday[0], parseInt(holiday[1]) - 1, holiday[2]);
    });

    // Update holidaylist with the new array of dates
    // setHolidaylist([...holidaylist, ...newHolidayList]);
    setMeeting([...meeting, ...newHolidayList])

  };
  useEffect(() => {
    console.log(meeting)
  }, [meeting])


  useEffect(() => {
    // setHolidaylist(...holidaylist,new Date())
    // handleHolidayChange()
    console.log(holidaylist)
    console.log(holidayStr)
  }, [holidaylist, holidayStr])


  // meeting popup

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'three-dots-menu' : undefined;

  const handleApplyLeave = (e)=>{
       const {value,name} = e.target;

       setApplyLeave((prev)=>({
           ...prev,
           [name] : value
       }))

  }

  const handlApplyLeave = ()=>{
    console.log(applyLeave)
    // axios.post('')
    // .then((response)=>{
           
    // })
    // .catch((rej)=>{
    //   console.log(rej);
    // })
  }


  useEffect(()=>{
    const mail = localStorage.getItem('studentEmail');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');


    setMailIDFromLoacalStorage(mail);
    setFirstNameFromLoacalStorage(firstName);
    setlastNameFromLoacalStorage(lastName);

    //
    setApplyLeave(prevState => ({
        ...prevState,
        mail: mail || "",  
        firstName: firstName || "",
        lastName: lastName || ""
    }));
  },[])



  ////////////////////////////////////////////////
  function handleMeetingListView(){
    axios.post(`${api}/video-call/get_meetings_for_stud`,{email:mailIDFromLoacalStorage})
    .then((Response) => {
        console.log(" data for students: ",Response.data.data);
        const meet=Response.data.data;
       
        const transformedMeetings = meet.map(meet => {
          // Assuming date strings are in the format "MM-DD-YY"
          const startDateParts = meet.startDate.split('-'); // ['10', '4', '24']
          const endDateParts = meet.endDate.split('-');     // ['5', '6', '24']
          const timefromnew= convertTo24Hour(meet.startTime);
          const timeTonew= convertTo24Hour(meet.endTime);

          const newStartDate=new Date(parseInt(startDateParts[0]),parseInt(startDateParts[1])-1,parseInt(startDateParts[2]) ,timefromnew[0],timefromnew[1])
          const newEndDate =new Date(parseInt(endDateParts[0]),parseInt(endDateParts[1])-1,parseInt(endDateParts[2]) ,timeTonew[0],timeTonew[1])
          
        
          return {
            title: meet.topic,
            start: newStartDate,
            end: newEndDate,
            meetingLink: meet.meetingLink,
            id: meet.meetingID,
            password: meet.password
          };
        });
        console.log(transformedMeetings)
        setMeeting(transformedMeetings)
    })
    .catch((error) => {
        console.error('Error:', error);
    });
   }

   useEffect(()=>{
    handleMeetingListView()
   },[mailIDFromLoacalStorage])



  return (
    <>
      <div className="row content-body container-fluid main-meeting">
        <div className="row ">
          <div className="container-fluid">
            <div className="row">
              <div className=" col-md-12 col-lg-12 col-sm-12 headLineBox">
                <h4>Classes</h4>
              </div>
              {/* <div className="col-md-4 col-lg-4 col-sm-4 d-flex justify-content-end headLineBox">
                <button onClick={handleClick} style={{ border: 'none', background: 'transparent' }}
                ><i class="fa fa-ellipsis-v" style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}></i></button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="container-fluid " style={{ minHeight: "100vh" }}>
          <div className="row pt-3">

            <div className="col-md-12 p-2 bg-white m-2">
              <Student_Schedule_meeting meeting={meeting} setMeeting={setMeeting} holidaylist={holidaylist} />
            </div>
          </div>

        </div>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List>
          <ListItem button onClick={handleClose}>
            <ListItemText primary="Create Classes" onClick={() => {
              handleShowMeeting()
              setSchedule('')
            }} />

          </ListItem>
          <ListItem button onClick={handleClose}>
            <ListItemText primary="Re-schedule Classes" onClick={() => { handleShowMeetingReschedule() }} />

          </ListItem>
          {/* <ListItem button onClick={handleClose}>
                    <ListItemText primary="Holiday" onClick={()=>{
                          handleShowHolyday()
                          // setSchedule('')
                        } }/>
                    
                  </ListItem> */}
          <ListItem button onClick={handleClose}>
            <ListItemText primary="Apply leave" onClick={() => { handleShowApplyLeave() }} />
          </ListItem>

        </List>
      </Popover>



      {/* meeting modal  */}

      <Modal
        show={showMeeting}
        onHide={handleCloseMeeting}
        backdrop="static"
        keyboard={false}
        size='lg'
      >

        <Modal.Body closeButton style={{ padding: '0px 10px 0px 10px' }}>
          {/* I will not close if you click outside me. Do not even try to press
          escape key. */}
          <div className="container" style={{ paddingRight: '0px', paddingLeft: '0px' }}>
            <div className="row pt-3">

              <div className="offset-md-2 col-md-5 align-self-center p-2 " >
                {/* Meeting Name */}
                <Student_Text_Input meetNmRef={meetNmRef} />
              </div>
              <div className="col-md-5 align-self-center p-2 ">

                <Student_Meeting_dropdown setSchedule={setSchedule} schedule={schedule} />
              </div>

              <div className="col-md-2 align-self-center p-2" style={{ textAlign: 'left', fontSize: '14px !important', paddingLeft: '10px' }}>
                <span style={{ fontSize: '14px' }}>Invite Attendees</span>
              </div>
              <div className=" col-md-5 p-2" style={{ marginTop: '11px' }}>
                <FormControl style={{ width: '300px' }}>
                  <InputLabel id="demo-simple-select-label">Group</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={meetparticipate}
                    label="Group"
                    onChange={(e) => { setMeetparticipate(e.target.value) }}
                  >
                    <MenuItem value={'Batch'}>Batch</MenuItem>
                    <MenuItem value={'Student'}>Student</MenuItem>
                    <MenuItem value={'Teacher'}>Teacher</MenuItem>
                    <MenuItem value={'Individual'}>Individual</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className=" col-md-4 p-2">

                {meetparticipate == 'Batch' && <FormControl style={{ width: '230px', paddingLeft: '5px' }}>
                  <InputLabel id="demo-multiple-checkbox-label">List</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedBatch}
                    onChange={handleBatchChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    sx={{ height: '40px', marginTop: '11px' }}
                  >
                    {batchList.map((option, index) => (
                      <MenuItem key={index} value={option.batchName}>
                        <Checkbox checked={selectedBatch.indexOf(option.batchName) > -1} />
                        <ListItemText primary={option.batchName} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>}
                {meetparticipate == 'Student' && <FormControl style={{ width: '230px', paddingLeft: '5px' }}>
                  <InputLabel id="demo-multiple-checkbox-label">List</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedStudent}
                    onChange={handleStudentselect}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    sx={{ height: '40px', marginTop: '11px' }}
                  >
                    {studentList.map((option, index) => (
                      <MenuItem key={index} value={option.Name}>
                        <Checkbox checked={selectedStudent.indexOf(option.Name) > -1} />
                        <ListItemText primary={option.Name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>}
                {
                  meetparticipate == 'Individual' && <Student_Individual_nm meetPersonnmRef={meetPersonnmRef} />
                }

              </div>
              <div className="col-md-1 d-flex  align-items-center justify-content-start">
                {meetparticipate && <i class="fa fa-plus" onClick={() => { setMeetparticipate2show(true) }} ></i>}
              </div>

              {/* dropdown2  */}

              {meetparticipate2show && <div className="offset-md-2 col-md-5 p-2" style={{ marginTop: '11px' }}>
                <FormControl style={{ width: '300px' }}>
                  <InputLabel id="demo-simple-select-label">Group</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={meetparticipate2}
                    label="Group"
                    onChange={(e) => { setMeetparticipate2(e.target.value) }}
                  >
                    <MenuItem value={'Batch'}>Batch</MenuItem>
                    <MenuItem value={'Student'}>Student</MenuItem>
                    <MenuItem value={'Teacher'}>Teacher</MenuItem>
                    <MenuItem value={'Individual'}>Individual</MenuItem>
                  </Select>
                </FormControl>
              </div>}

              {(() => {
                if (meetparticipate2show) {
                  return (
                    <div className=" col-md-4 p-2">
                      {meetparticipate2 == 'Batch' &&

                        <FormControl style={{ width: '230px', paddingLeft: '5px' }}>
                          <InputLabel id="demo-multiple-checkbox-label">List</InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedBatch}
                            onChange={handleBatchChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            sx={{ height: '40px', marginTop: '11px' }}
                          >
                            {batchList.map((option, index) => (
                              <MenuItem key={index} value={option.batchName}>
                                <Checkbox checked={selectedBatch.indexOf(option.batchName) > -1} />
                                <ListItemText primary={option.batchName} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                      }
                      {meetparticipate2 == 'Student' &&

                        <FormControl style={{ width: '230px', paddingLeft: '5px' }}>
                          <InputLabel id="demo-multiple-checkbox-label">List</InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedStudent}
                            onChange={handleStudentselect}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            sx={{ height: '40px', marginTop: '11px' }}
                          >
                            {studentList.map((option, index) => (
                              <MenuItem key={index} value={option.Name}>
                                <Checkbox checked={selectedStudent.indexOf(option.Name) > -1} />
                                <ListItemText primary={option.Name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                      }
                      {meetparticipate2 == 'Teacher' &&

                        <FormControl style={{ width: '230px', paddingLeft: '5px' }}>
                          <InputLabel id="demo-multiple-checkbox-label">List</InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedBatch}
                            onChange={handleBatchChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            sx={{ height: '40px', marginTop: '11px' }}
                          >
                            {batchList.map((option, index) => (
                              <MenuItem key={index} value={option.batchName}>
                                <Checkbox checked={selectedBatch.indexOf(option.batchName) > -1} />
                                <ListItemText primary={option.batchName} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                      }
                      {
                        meetparticipate2 == 'Individual' &&
                        <Student_Individual_nm meetPersonnmRef={meetPersonnmRef} />

                      }

                    </div>

                  )
                }
              })()}


              {meetparticipate2 &&
                <div className="col-md-1 d-flex  align-items-center justify-content-start">
                  <i class="fa fa-plus" onClick={() => { setMeetparticipate3show(true) }}></i>
                </div>
              }


              {/* dropdown 3 */}
              {meetparticipate3show && <div className="offset-md-2 col-md-5 p-2" style={{ marginTop: '11px' }}>
                {/* <FormControl fullWidth> */}
                <FormControl style={{ width: '300px' }}>
                  <InputLabel id="demo-simple-select-label">Group</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={meetparticipate3}
                    label="Group"
                    onChange={(e) => { setMeetparticipate3(e.target.value) }}
                  >
                    <MenuItem value={'Batch'}>Batch</MenuItem>
                    <MenuItem value={'Student'}>Student</MenuItem>
                    <MenuItem value={'Teacher'}>Teacher</MenuItem>
                    <MenuItem value={'Individual'}>Individual</MenuItem>
                  </Select>
                </FormControl>
              </div>}
              {(() => {
                if (meetparticipate3show) {
                  return (
                    <div className=" col-md-4 p-2">
                      {meetparticipate3 == 'Batch' &&

                        <FormControl style={{ width: '230px', paddingLeft: '5px' }}>
                          <InputLabel id="demo-multiple-checkbox-label">List</InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedBatch}
                            onChange={handleBatchChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            sx={{ height: '40px', marginTop: '11px' }}
                          >
                            {batchList.map((option, index) => (
                              <MenuItem key={index} value={option.batchName}>
                                <Checkbox checked={selectedBatch.indexOf(option.batchName) > -1} />
                                <ListItemText primary={option.batchName} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                      }
                      {meetparticipate3 == 'Student' &&

                        <FormControl style={{ width: '230px', paddingLeft: '5px' }}>
                          <InputLabel id="demo-multiple-checkbox-label">List</InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedStudent}
                            onChange={handleStudentselect}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            sx={{ height: '40px', marginTop: '11px' }}
                          >
                            {studentList.map((option, index) => (
                              <MenuItem key={index} value={option.Name}>
                                <Checkbox checked={selectedStudent.indexOf(option.Name) > -1} />
                                <ListItemText primary={option.Name} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                      }
                      {meetparticipate3 == 'Teacher' &&

                        <FormControl style={{ width: '230px', paddingLeft: '5px' }}>
                          <InputLabel id="demo-multiple-checkbox-label">List</InputLabel>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedBatch}
                            onChange={handleBatchChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            sx={{ height: '40px', marginTop: '11px' }}
                          >
                            {batchList.map((option, index) => (
                              <MenuItem key={index} value={option.batchName}>
                                <Checkbox checked={selectedBatch.indexOf(option.batchName) > -1} />
                                <ListItemText primary={option.batchName} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                      }
                      {
                        meetparticipate3 == 'Individual' &&
                        //  <Individual_nm meetPersonnmRef={meetPersonnmRef}/>
                        <Mentor_ScheduleEmChip individualEm={individualEm} setIndividualEm={setIndividualEm} />

                      }

                    </div>

                  )
                }
              })()}


              {meetparticipate3 &&
                <div className="col-md-1 d-flex  align-items-center justify-content-start">
                  {/* <i class="fa fa-plus"></i> */}
                </div>
              }

              <div className="offset-md-2 col-md-5 align-self-center " style={{ paddingLeft: '8px' }}>
                <div class="input-group ">
                  <input type="date" id="dob"


                    className="form-control" selected={selectedTime} ref={meetDateRef} selectedTime={selectedTime} setSelectedTime={setSelectedTime} />

                </div>
                {(() => {
                  if (schedule == 1) {
                    return (
                      <div class="input-group" style={{ paddingTop: '10px' }}>
                        <input type="date" id="dob"
                          className="form-control" ref={meetDateEndRef} />
                      </div>
                    )
                  }
                })()}




              </div>
              <div className="col-md-5" >

                <Student_ResponsiveTimePickers meetDateFromRef={meetDateFromRef} />
                <Student_Time_Picker_end meetDateToRef={meetDateToRef} />
              </div>
              <div className="offset-md-7 col-md-5 pt-2 ps-2">
                <FormControl style={{ width: '223px' }}>
                  <InputLabel id="demo-simple-select-label">Day</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={meetDayPattern}
                    label="Group"
                    onChange={(e) => { setMeetDayPattern(e.target.value) }}
                  >
                    <MenuItem value={'Regular'}>Daily</MenuItem>
                    <MenuItem value={'WeekOff'}>Weekly</MenuItem>
                    <MenuItem value={'Monthly'}>Monthly</MenuItem>
                    <MenuItem value={'CustomDay'}>Custom Day</MenuItem>

                  </Select>
                </FormControl>
              </div>

              <div className="col-md-2 p-2">
                <span style={{ fontSize: '14px' }}>Attach Class Schedule</span>
              </div>
              <div className="col-md-10 p-2">
                <div class="form-group">
                  <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                </div>
              </div>
              <div className="col-md-2 p-2">
                <span style={{ fontSize: '14px' }}>Description</span>
              </div>
              <div className="col-md-10 p-2">
                <div className="form-group">
                  {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
                  <textarea className="for-description form-control" id="exampleFormControlTextarea1" rows="2" columns='10'></textarea>
                </div>
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMeeting}>
            Close
          </Button>
          <button className="btn btn-success" onClick={
            () => {
              handlemeeting()
              handleCloseMeeting()

            }} >Create</button>

        </Modal.Footer>
      </Modal>




      {/* Meeting Reschedule modal  */}

      <Modal
        show={showMeetReschedule}
        onHide={handleCloseMeetingReschedule}
        backdrop="static"
        keyboard={false}
        size='md'
      >

        <Modal.Body closeButton>

          <div className="container">
            <div className="row pt-3">
              <div className="col-md-2 col-sm-2 ">
                Select Meeting
              </div>
              <div className="col-md-3 col-sm-3">
                <Student_Reschedule_meet_selector meeting={meeting} setMeeting={setMeeting} selectmeeting={selectmeeting} setSelectmeeting={setSelectmeeting} />
              </div>
              <div className="col-md-7 col-sm-5 d-flex justify-content-end small">
                <Mentor_Meeting_reschedule_dropdown setSchedule={setSchedule} schedule={schedule} />
              </div>
              <div className="col-md-6 p-2">
                <input type="date" id="dob"
                  className="form-control " ref={meetDateRef} />
              </div>


              <div className="col-md-6 p-2">
                <input type="date" id="dob"
                  className="form-control" ref={meetDateEndRef} />

              </div>
              <div className="col-md-6 p-2">
                <Student_Time_picker_reschedule_from meetDateFromRef={meetDateFromRef} rescheduleTimeFrom={rescheduleTimeFrom} />
              </div>
              <div className="col-md-6 p-2">
                <Mentor_Time_picker_reschedule_To meetDateToRef={meetDateToRef} rescheduleTimeTo={rescheduleTimeTo} />
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMeetingReschedule}>
            Close
          </Button>
          <button className="btn btn-success" onClick={
            () => {
              handlemeetingReschedule()
              handleCloseMeetingReschedule()

            }} >Create</button>

        </Modal.Footer>
      </Modal>

      {/* Modal for the Apply leave */}
      <Modal
        show={showApplyLeave}
        onHide={handleCloseMeetingReschedule}
        backdrop="static"
        keyboard={false}
        size='md'
      >

        <Modal.Body closeButton>

          <div className="container">
            <div className="row pt-3">
              {/* <div className="col-md-2 col-sm-2 ">
                Apply leave
              </div> */}

              <div className="col-md-6 p-2">
                <label htmlFor="">Start Date</label>
                <input type="date" id="dob"
                  className="form-control " name="startDate" value={applyLeave.startDate} onChange={handleApplyLeave}/>
              </div>


              <div className="col-md-6 p-2">
                <label htmlFor="">End Date</label>
                <input type="date" id="dob"
                  className="form-control" name="endDate" value={applyLeave.endDate} onChange={handleApplyLeave}/>
              </div>

              <div className='col-md-10'>
                <Form.Group controlId="formUniversityName" className="mb-4 form-group">
                  <Form.Label>Leave Type</Form.Label>
                  <Form.Control
                    className="form-control-custom"
                    as="select"
                    name="leaveType"
                    value={applyLeave.leaveType}
                    onChange={handleApplyLeave}

                  >
                    <option value="">Select leave type</option>
                    <option value="Casual_leave">Casual </option>
                    <option value="Sick_leave">Sick </option>
                    <option value="planned_leave">Planned</option>
                    <option value="others">Others</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <label htmlFor="reasonForLeave">Reason for leave</label>
                <textarea id="reasonForLeave" className="form-control" name="reasonForLeave" value={applyLeave.reasonForLeave} onChange={handleApplyLeave}></textarea>
              </div>


            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowApplyLeave(false)}>
            Close
          </Button>
          <button className="btn btn-success" onClick={handlApplyLeave} >Apply Leave</button>

        </Modal.Footer>
      </Modal>





      
      {/* monthly day schedule modal */}
      <Mentor_Monthlymeetschedule openmonthly={openmonthly} handleCloseMonthly={handleCloseMonthly} selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} selectedFrequency={selectedFrequency} setSelectedFrequency={setSelectedFrequency} handleNumberChange={handleNumberChange} handleFrequencyChange={handleFrequencyChange} />
      {/* weekly custom day modal  */}
      {/* <Mentor_Custom_weekDay handleWeekDaysOpen={handleWeekDaysOpen} handleWeekDaysClose={handleWeekDaysClose} selectedWeekDays={selectedWeekDays} setSelectedWeekDays={setSelectedWeekDays} WeekDaysopen={WeekDaysopen} /> */}
    </>
  );
}

export default Student_Meetings;
