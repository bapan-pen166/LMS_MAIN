
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
import '../../../assets/css/Meeting/Meeting.css';
import { useState } from 'react';

export default function Mentor_Time_picker_reschedule_To({meetDateToRef,rescheduleTimeTo}) {
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

  // const calculateDefaultTime = () => {
  //   const currentTime = dayjs();
  //   let defaultTime;
  
  //   if (currentTime.minute() < 20) {
  //     defaultTime = currentTime.set('minute', 30);
  //   } else {
  //     defaultTime = currentTime.add(1, 'hour').startOf('hour');
  //   }
  
  //   // Adjust for AM/PM status
  //   defaultTime = defaultTime.format('hh:mm A');
  
  //   return defaultTime;
  // };

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
  

  const [selectedTime, setSelectedTime] = useState(rescheduleTimeTo);
  
  const handleTimeChange = (time) => {
    setSelectedTime(time.target.innerHTML);
    console.log('Selected time:', time);
    // console.log(e);
  };
  React.useEffect(()=>{console.log('selectedTime',selectedTime)
    meetDateToRef.current=selectedTime
  },[selectedTime, meetDateToRef])
  return(
    <div>
    <TimePicker 
  time={rescheduleTimeTo}
  // value={selectedTime.toDate()}
  // onChange={(e)=>{setSelectedTime(e.target.value)}}
  onChange={onChange}
  width={'205px'}
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
