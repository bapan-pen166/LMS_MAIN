import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
// import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

import { TimePicker } from '@patternfly/react-core';
import "@patternfly/react-core/dist/styles/base.css";
import '../../assets/css/Meeting/Meeting.css';
import { useState,useRef } from 'react';

export default function ResponsiveTimePickers({meetDateToRef,meetDateFromRef,timeFlag}) {
//   const currentTime = dayjs();

  // const calculateDefaultTime = () => {
  //   const currentTime = dayjs().format('HH:mm');
  //   let defaultTime;

    
  //   if (currentTime.minute() < 20) {
     
  //     defaultTime = currentTime.set('minute', 30);
  //   } else {
      
  //     defaultTime = currentTime.set('hour', currentTime.hour() + 1).set('minute', 0);
  //   }

  //   return defaultTime;
  // };

  const calculateDefaultTime = () => {
    const currentTime = dayjs();
    let defaultTime;
  
    if (currentTime.minute() < 20) {
      defaultTime = currentTime.set('minute', 30);
    } else {
      defaultTime = currentTime.add(1, 'hour').startOf('hour');
    }
  
    // Adjust for AM/PM status
    defaultTime = defaultTime.format('hh:mm A');
  
    setSelectedTime(defaultTime) ;
  };

  function add30Minutes(timeString) {
    // Parse the input time string
    let [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":");
  
    // Convert to numbers
    hours = parseInt(hours, 10);
    minutes = parseInt(minutes, 10);
  
    // Convert 12-hour format to 24-hour format
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }
  
    // Add 30 minutes
    minutes += 30;
  
    // Handle minute overflow
    if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }
  
    // Handle hour overflow
    if (hours >= 24) {
      hours -= 24;
    }
  
    // Convert back to 12-hour format
    const newModifier = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert hour 0 or 12 to 12
    minutes = minutes.toString().padStart(2, "0");
  
    return `${hours}:${minutes} ${newModifier}`;
  }

  // const getAmPmStatus = () => {
  //   const currentTime = dayjs();
  //   return currentTime.hour() < 12 ? 'am' : 'pm';
  // };
  // return (
  //   <LocalizationProvider dateAdapter={AdapterDayjs}>
  //     <DemoContainer
  //       components={[
  //         'TimePicker',
  //         'MobileTimePicker',
  //         'DesktopTimePicker',
  //         'StaticTimePicker',
  //       ]}
  //     >
        
  //       <DemoItem >
  //         <TimePicker views={['hours', 'minutes']} defaultValue={calculateDefaultTime()} ampm={getAmPmStatus()} inputRef={meetDateToRef}/>
  //       </DemoItem>
        
  //     </DemoContainer>
  //   </LocalizationProvider>
  // );
  const currentTime = dayjs().format('HH:mm');
  const onChange = (time, hour, minute, seconds, isValid) => {
    console.log('time', time);
    console.log('hour', hour);
    console.log('minute', minute);
    console.log('seconds', seconds);
    console.log('isValid', isValid);
    const value=hour;
    setSelectedTime(value);
  };
  

  const [selectedTime, setSelectedTime] = useState();
  const hasMounted = useRef(false);
  
  const handleTimeChange = (time) => {
    // setSelectedTime(time.target.innerHTML);
    console.log('Selected time:', time);
    // console.log(e);
  };
  
  React.useEffect(()=>{
    meetDateToRef.current=selectedTime
    // console.log('meetDateFromRef',meetDateFromRef.current)
  },[selectedTime,, meetDateToRef])
  // React.useEffect(()=>{
  //   // setSelectedTime(meetDateFromRef.current)
  //   console.log('meetDateFromRef.current',meetDateFromRef.current)
  //   setSelectedTime(add30Minutes(meetDateFromRef.current))
  // },[timeFlag])
  React.useEffect(() => {
    if (hasMounted.current) {
      // This will run only on updates, not on the initial render
      console.log('meetDateFromRef.current:', meetDateFromRef.current);
      setSelectedTime(add30Minutes(meetDateFromRef.current));
    } 
  }, [timeFlag]);
  React.useEffect(()=>{
    calculateDefaultTime()
    hasMounted.current = true;
  },[])
  return(
    <div style={{paddingTop:'10px'}}>
    <TimePicker 
  time={selectedTime}
  // value={selectedTime.toDate()}
  // onChange={(e)=>{setSelectedTime(e.target.value)}}
  onChange={onChange}
  width={'223px'}
  // style={{
  //   paddingTop: '10px', 
  //   width:'223px'// Adjust the padding as needed
  // }}
  // style={{
  //   width: '500px',
  // }}
  // inputProps={{
  //   style: {
  //     width: 'calc(100% - 30px)', 
  //   }
  // }}
  />
    </div>
  )
}
