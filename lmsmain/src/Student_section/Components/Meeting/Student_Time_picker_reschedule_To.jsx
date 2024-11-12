
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

export default function Student_Time_picker_reschedule_To({meetDateToRef,rescheduleTimeTo}) {

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
  onChange={onChange}
  width={'205px'}

  />
    </div>
  )
}
