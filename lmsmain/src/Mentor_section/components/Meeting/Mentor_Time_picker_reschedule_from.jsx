import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
// import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
// import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';


import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../assets/css/Meeting/Meeting.css';


import { TimePicker } from '@patternfly/react-core';
import "@patternfly/react-core/dist/styles/base.css";
// import '../../assets/css/Meeting/Meeting.css';

export default function Mentor_Time_picker_reschedule_from({meetDateFromRef,rescheduleTimeFrom}) {
  const currentTime = dayjs().format('hh:mm A');
  

  const onChange = (time, hour, minute, seconds, isValid) => {
    console.log('time', time);
    console.log('hour', hour);
    console.log('minute', minute);
    console.log('seconds', seconds);
    console.log('isValid', isValid);
    const value=hour;
    setSelectedTime(value);
  };

  const [selectedTime, setSelectedTime] = useState(rescheduleTimeFrom);
  
  const handleTimeChange = (time) => {
    setSelectedTime(time.target.innerHTML);
    console.log('Selected time:', time);
    // console.log(e);
  };
  React.useEffect(()=>{console.log('rescheduleTimeFrom',rescheduleTimeFrom)
meetDateFromRef.current=selectedTime
console.log(meetDateFromRef.current)
  },[selectedTime, meetDateFromRef])
  return(
    <div>
    <TimePicker 
  time={rescheduleTimeFrom}
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
